---
layout: post
title:  AWS S3 Presigned URL이란?
tags: infra/aws/s3
---

## S3 Presigned URL이란

S3의 Bucket Policy나 acl과 같은 권한설정과 관계없이 특정 유효기간에 S3에 put,get이 가능하게 하는 URL이다.


## 용도

특정 단말(채널)에 특정시간에만 볼 수 있는 컨텐츠를 발행할때 사용한다.

예를들면 아래와 같다.

### 1.  세큐리티의 목적이 대부분인 예

사내 내부에서만 보여주게 하고 싶은 컨텐츠

결제가 되어야만 볼 수 있는 컨텐츠(영상)의 경우

해당 url을 가지고도 다른 채널에서 접근시 막고싶은 경우 사용이 가능할것이다.

### 2. 퍼포먼스 목적이 대부분인 예

보통 파일 업로드는 권한설정 때문에 서버를 경유해야하는 경우가 있는데 영상파일 같이 컨텐츠의 용량이 높은 경우

서버에 넘겨준 후 서버에서 스토리지에 저장하는 이중 작업은 비효율적일 때가 있다.

이때 서버에서는 Presgined URL만 발행해서 클라이언트에 던져주고 해당 url을 이용해 클라이언트단에서 직접 파일 업로드를 함으로 

서버단의 리소스를 사용하지 않고 업로드가 가능하다.

## S3 Presigned URL의 파라메터

`S3 Presigned URL`를 발행하면 아래와 긑은 URL이 발행된다. (가독성을 높이기 위해 개행문자를 추가)

```
https://examplebucket.s3.amazonaws.com /test.txt?
X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Credential=<YOUR_ACCESS_KEY_ID>/20160115/ap-northeast-2/s3/aws4_request&
&X-Amz-Date=20160115T000000Z
&X-Amz-Expires=86400
&X-Amz-SignedHeaders=host
&X-Amz-Signature=<SIGNATURE_VALUE>
```

각 파라메터의 의미는 아래와 같다.

### X-Amz-Algorithm

서명 버전과 알고리즘을 식별하고, 서명을 계산하는데 사용. 서명 버전 4를 위해서 “AWS4-HMAC-SHA256” 로 설정

### X-Amz-Credential

액세스 키 ID와 범위 정보(요청 날짜, 사용하는 리전, 서비스 명). 리전 명은 리전 및 엔드포인트에서 확인 가능

### X-Amz-Date

날짜는 ISO 8601형식. 예: 20160115T000000Z

### X-Amz-Expires

미리 선언된 URL이 유효한 시간 주기. 초단위. 정수 값. 최소 1에서 최대 604800 (7일) 예: 86400 (24시간)

### X-Amz-SignedHeaders

서명을 계산하기 위해 사용되어지는 헤더 목록. HTTP host 헤더가 요구됨

### X-Amz-Signature

요청을 인증하기 위한 서명


## X-Amz-Expires 보충설명

AWS Identity and Access Management (IAM) 인스턴스 프로파일 : 최대 6시간 유효
AWS Security Token Service (STS): 최대 36시간 유효
IAM User: 최대 7일 유효(AWS v4 증명을 사용할경우)


---

## 메모


### 주의사항

이번 프로젝트에서 헤맨 부분을 적어본다.

백엔드단에서 Presigned URL을 발행해 해당 url을 어플단(flutter)에 넘겨줬다.

flutter에서는 `CachedNetworkImage` 라는 이미지를 캐쉬하는 라이브러리를 사용했는데 image url을 베이스로 캐쉬를 했다.

그런데 백엔드에서는 리퀘스트 마다 `Presigned URL`를 재발행하다 보니 같은 파일인데도 리퀘스트 마다 캐쉬가 리로드되 이미지 파일을 렌더링하는데 리소스 낭비가 있었다.

이때는 flutter단에서 image url자체를 캐쉬키로 사용하는게 아닌 파일명을 key로 캐쉬할 필요가 있다.(파일이 갱신되면 파일명이 바뀌는 아키텍처 전제)

최신 버전의 `CachedNetworkImage`에는 key값을 지정이 가능함으로 최신버전 사용시 문제가 없다.


### X-Amz-Expires의 공식 도큐멘트 설명

> Provides the time period, in seconds, for which the generated presigned URL is valid. For example, 86400 (24 hours). This value is > an integer. The minimum value you can set is 1, and the maximum is 604800 (seven days).
> 
> A presigned URL can be valid for a maximum of seven days because the signing key you use in signature calculation is valid for up to seven days.




### AccessDenied

Presigned URL의 유효기간이 지난 S3에 억세스 하면 아래와 같이 에러가 발생한다.


```
<Error>
<Code>AccessDenied</Code>
<Message>Request has expired</Message>
<X-Amz-Expires>900</X-Amz-Expires>
<Expires>2021-04-28T09:23:39Z</Expires>
<ServerTime>2021-04-28T11:19:34Z</ServerTime>
<RequestId>HK7ATQN73Q494569</RequestId>
<HostId>Tj/dvDghBCGDO1bu4VUrzuO66jIarM9qqWG4VvT6tALjBdInzom8h2yiUEVtW8UW+mk3NgfHB7I=</HostId>
</Error>
```


### s3 Presgined URL의 유효기간을 무한대로 하는 방법은?

처음 든 의문으로 유효기간을 없앨 수 있을까였는데?? 다시 생각해보니 유효기간이 없다는건 public이랑 똑같은 거였다.ㅎ

v4로 최대7일이다.(이렇게 길게 유효기간을 둔 유스케이스를 생각하기 어려울 정도)


### how to create presignd URL with cli

aws cli로 presignd URL을 발행하는 방법은 아래와 같다.

```
aws s3 presign --expires-in 60 s3://investigate-iot-jobs/example.json
```

---

[Authenticating Requests by Using Query Parameters (AWS Signature Version 4)]: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html


[クライアントから S3 に直接アップロードする方法]: https://qiita.com/ytanaka3/items/ad150811df54aa7434fb

[1]: https://aws.amazon.com/ko/blogs/korea/aws-api-call-2-s3-pre-signed-url/
[2]: https://techblog.timers-inc.com/entry/2019/11/26/120351
[3]: https://qiita.com/tmiki/items/87697d3d3d5330c6fc08