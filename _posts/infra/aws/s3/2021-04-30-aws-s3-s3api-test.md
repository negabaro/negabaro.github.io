---
layout: post
title:  s3api를 이용해서 여러가지 실험
tags: infra/aws/s3
---


## Bucket Policy

`bucketeer-xxxx`의 버킷폴리시는 아래와 같다.

```
aws s3api get-bucket-policy --bucket bucketeer-xxxx
{
    "Policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"AddPerm\",\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::bucketeer-xxxx/public/*\"}]}"
}
```

public디렉리 이하는 `S3:GetObject`가 가능하게 설정해줬다.

반대로 public이 아닌 디렉토리에는 접근 불가능하다.

## Object의 acl

한편, `bucketeer-xxxx`버킷 밑에 `images/b.jpg`라는 파일의 acl은 아래와 같다.

```
aws s3api get-object-acl --bucket bucketeer-xxxx --key images/b.jpg
{
    "Owner": {
        "DisplayName": "christopher.continanza+bucketeer2", 
        "ID": "e276876bc3dc9413e737b16852c6e6226ab693a26e95db1387d30c6e4aeff081"
    }, 
    "Grants": [
        {
            "Grantee": {
                "Type": "CanonicalUser", 
                "DisplayName": "christopher.continanza+bucketeer2", 
                "ID": "e276876bc3dc9413e737b16852c6e6226ab693a26e95db1387d30c6e4aeff081"
            }, 
            "Permission": "FULL_CONTROL"
        }
    ]
}
```

위와 같은 acl설정이 적용된 `images/b.jpg`에 억세스하면 XML형식으로 `AccessDenied`가 표시된다.


`https://bucketeer-xxxx.s3.amazonaws.com/images/b.jpg`


결과:

```
<Error>
<Code>AccessDenied</Code>
<Message>Access Denied</Message>
<RequestId>1TEW1ATMWG4YV80S</RequestId>
<HostId>SOHQU1RgWxneKPxMdjTb2QC79c+cZ05jmfT+r8BjqSAWceelPxSthO/tET/kRQawmMVbhLYqKgc=</HostId>
</Error>
```


## Object acl에 public-read를 추가

`images/b.jpg`에 public-read acl을 부여하면 아래와 같이 READ Grants가 추가된다.


### put-object-acl로 public-read부여

```
aws s3api put-object-acl --bucket bucketeer-xxxx --key images/b.jpg --acl 'public-read'
```


### get-object-acl로 확인

```
aws s3api get-object-acl --bucket bucketeer-xxxx --key images/b.jpg
{
    "Owner": {
        "DisplayName": "christopher.continanza+bucketeer2", 
        "ID": "e276876bc3dc9413e737b16852c6e6226ab693a26e95db1387d30c6e4aeff081"
    }, 
    "Grants": [
        {
            "Grantee": {
                "Type": "CanonicalUser", 
                "DisplayName": "christopher.continanza+bucketeer2", 
                "ID": "e276876bc3dc9413e737b16852c6e6226ab693a26e95db1387d30c6e4aeff081"
            }, 
            "Permission": "FULL_CONTROL"
        }, 
        {
            "Grantee": {
                "Type": "Group", 
                "URI": "http://acs.amazonaws.com/groups/global/AllUsers"
            }, 
            "Permission": "READ"
        }
    ]
}
```


`https://bucketeer-xxxx.s3.amazonaws.com/images/b.jpg`에 

다시 억세스 해보면 접근이 가능해진것을 확인할 수 있었다.



## 이 작업으로 배운것

1. s3api커맨드 `put-object-acl`으로 특정 오브젝트에 acl설정을 부여하는 방법에 대해 이해했다.
2. s3api커맨드 `get-object-acl`으로 특정 오브젝트에 acl설정을 확인할 수 있었다.
3. BucketPolicy와 관계없이 각 오브젝트의 acl설정에 의해 접근권한을 컨트롤 할 수 있었다.
4. `public-read`를 부여함으로 어디서든 이미지에 접근할 수  있게되었다.
