---
layout: post
title:  "S3 Presigned URL을 이용해 클라이언트에서 직접 컨텐츠 업로드 구현방법(feat. ruby && aws-s3-sdk)"
author: negabaro kim
tags:	rails
---

통상적으로 컨텐츠의 업로드는 인증로직과 관계되어 서버에서 처리되는 경우가 많다.

한편 동영상을 업로드하는 경우, 여러 확장자 파일과 수GB파일의 영상파일을 업로드하게 되는데 이때 서버를 경유해서 처리시 아래와 같은 문제가 있다.

1. 비효율적인 리소스 활용 (영상을 서버에 넘겨주는 처리와 서버에서 영상을 스토리지에 업로드하는 작업) 
2. 서버의 스토리지 용량관리
3. 각종 대응(타임아웃, 동기화/비동기화 고려)

이러한 문제를 해결하기 위해 컨텐츠(영상)을 서버에 보내서 업로드하지 않고 클라이언트에서 직접 스토리지(이 포스트에서 소개하는 스토리지는 S3)에 업로드 하는 방법이 나왔다.

S3에서는 `pre-signed URL`을 이용해 구현이 가능하다.

아래 플로우를 보면 차이가 쉽게 이해가 가능하다.

![image](https://user-images.githubusercontent.com/4640346/116769426-049a8e00-aa77-11eb-9b20-d4cee71cb2fa.png)


S3의 Presigned URL에 대해서는 다른 포스트에서 설명할 예정

## 대략적인 구현방법

### 1.

서버에서 어떤 디렉토리에 컨텐츠를 업로드 할것이라는 정보를 관리한다. 해당 정보를 A라는 변수에 담았다고 해보자.

```ruby
A = "#{dir}/#{file_name}"
```

### 2.

A라는 변수에 담은 path에 해당하는 `presigned_url(:put)`을 발행해준다.

ruby코드로는 아래와 같다.

```ruby
bucket = Aws::S3::Resource.new.bucket(ENV['BUCKET_NAME'])
obj = bucket.object("#{dir}/#{file_name}")
obj.presigned_url(:put)
```


### 3.

`presigned_url(:put)`을 실행해주면 크게 두가지 액션이 실행된다.


#### 실제 해당 path에 0byte의 파일이 생성됨

bucket명 xxx에 `images/xx.mp4` 라는 path였다면 실제 s3에 0byte의 파일이 만들어진다.

#### presigned_url발행

아래와 같은 presigned url이 발행된다. 해당 URL은 디폴트 유효기간이 15분이고(최대 7일까지 가능) 그 시간이 지나면 사용이 불가능하다.

```
https://xxx.s3.amazonaws.com/images/xx.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVZH4SBSY4EO3QIWS%2F20210428%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210428T112140Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=20e494910e73bde0404aa4ccaf6b10a8690a3ceff16489e2e72a82b879a4d39f
```


### 4.

서버는 3에서 생성한 presigned_url을 클라이언트에 넘겨준다.


### 5.

클라이언트는 4에서 전달받은 presigned_url을 이용해 직접 파일업로드가 가능하다.

클라이언트에서 작업할때 알고 있으면 좋을 포인트로는 아래와 같은것이 있다.

- presigned_url을 이용하면 업로드할 s3 bucket policy를 무시한다.(s3:PutObject Deny라고 해도 가능?)
- presigned_url을 디폴트 유효기간인 15분내에 업로드가 가능(시간이 지나면 불가능하므로 15분내에 처리해야함)
- 특정 object의 acl권한도 안보는듯?(FULL_CONTROL망 있고 public-write 아니어도 가능했음, FULL_CONTROL이 필수인지는 미검증)


## 메모

예전 기사를 보면 s3 put처리는 용량제한이 있는듯??

컨텐츠의 용량에 따라 lambda등을 경유해서 처리할 필요가 있을지도



---

[Browser-based uploads using POST (AWS signature version 2)]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingHTTPPOST.html
[クライアントから S3 に直接アップロードする方法]: https://qiita.com/ytanaka3/items/ad150811df54aa7434fb