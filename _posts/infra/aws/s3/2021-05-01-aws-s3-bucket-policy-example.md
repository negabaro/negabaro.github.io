---
layout: post
title:  AWS S3 Bucket Policy 예제
tags: infra/aws/s3
---

이 포스트에서는 S3 Bucket Policy의 예제를 몇가지 정리해봤다.

## 1.

NotIpAddress의 Ip Range를 제외하고 IpAddress에 포함된 Ip Range만을 허가하는 예제

```
{
    "Version": "2012-10-17",
    "Id": "S3PolicyId1",
    "Statement": [
        {
            "Sid": "IPAllow",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::naata-aws/*",
            "Condition": {
                "NotIpAddress": {
                    "aws:SourceIp": "202.232.30.222/32"
                },
                "IpAddress": {
                    "aws:SourceIp": "202.232.30.201/24"
                }
            }
        }
    ]
}
```

## 2.

mydocs 하위 디렉토리에만 put,get 가능하게 설정한 예제

```
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "VisualEditor0",
        "Effect": "Allow",
        "Action": [
            "s3:PutObject",
            "s3:GetObject"
        ],
        "Resource": "arn:aws:s3:::mydocs/*"
      }
    ]
}
```

## 3.

stringLike조건을 활용해 Referer에 특정 host에서 오는 억세스만을 허락하는 예제

없어도 되지만 조건강화를 위해 그와 반대되는 설정을 Deny에도 추가

```
{
    "Version": "2012-10-17",
    "Id": "http referer policy",
    "Statement": [
        {
            "Sid": "Allow get requests referred by www.naata.tk and naata.tk.",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::naata-aws/*",
            "Condition": {
                "StringLike": {
                    "aws:Referer": [
                        "http://www.naata.tk/*",
                        "http://naata.tk/*"
                    ]
                }
            }
        },
        {
            "Sid": "Explicit deny to ensure requests are allowed only from specific referer.",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::naata-aws/*",
            "Condition": {
                "StringNotLike": {
                    "aws:Referer": [
                        "http://www.naata.tk/*",
                        "http://naata.tk/*"
                    ]
                }
            }
        }
    ]
}
```


## 4.

MFA인증 경유하지 않는 억세스를 거부


```
{
    "Version": "2012-10-17",
    "Id": "MultiFactorAuthAge",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::naata-aws/*",
            "Condition": {
                "Null": {
                    "aws:MultiFactorAuthAge": true
                }
            }
        }
    ]
}
```

## 5.

x-amz-server-side-encryption헤더 리퀘스트가 포함되어 있지 않으면 업로드 허가를 거부하는 예제

```
{
    "Version": "2012-10-17",
    "Id": "x-amz-server-side-encryption",
    "Statement": [
        {
            "Sid": "DenyIncorrectEncryptionHeader",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::naata-aws/*",
            "Condition": {
                "StringNotEquals": {
                    "s3:x-amz-server-side-encryption": "AES256"
                }
            }
        },
        {
            "Sid": "DenyUnEncryptedObjectUploads",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::naata-aws/*",
            "Condition": {
                "Null": {
                    "s3:x-amz-server-side-encryption": "true"
                }
            }
        }
    ]
}
```


## 6.

Bool조건으로 `aws:MultiFactorAuthPresent`로 MFA인증한 경우만 `put/delete` 가능하게 한 예제

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "accountid"
                ]
            },
            "Action": [
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::naata-aws/*"
            ],
            "Condition": {
                "Bool": {
                    "aws:MultiFactorAuthPresent": "true"
                }
            }
        }
    ]
}
```

---

[S3 バケットポリシーいろいろ]: https://qiita.com/leomaro7/items/3d77328c04322efe608e
[Link1]: https://stackoverflow.com/questions/39688422/correct-s3-policy-for-pre-signed-urls
[Link2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-policies-s3.html