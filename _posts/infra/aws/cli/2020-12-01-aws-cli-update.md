---
layout: post
title: "mac에서 aws-cli커맨드 버전확인 & 버전 업그레이드 방법"
author: negabaro kim
tags: aws
---

# 버전확인 방법

```
aws --version
aws-cli/1.16.69 Python/2.7.16 Darwin/19.6.0 botocore/1.12.59
```

# 버전 업그레이드 방법

```
pip install --upgrade awscli --user
```

# 동작확인 

```
aws --version
aws-cli/1.18.186 Python/2.7.16 Darwin/19.6.0 botocore/1.19.26
```

버전이 변경되었다.!!

# 메모

## 특정 커맨드설치 불가시 무시하는 예제

six커맨드 관련 에러시 무시하는 방법

```
pip install --upgrade awscli --ignore-installed six
```


## aws ecr get-login 커맨드가 deprecated됨


aws ecr로그인시 사용한 `aws ecr get-login`커맨드가 deprecated이 되었고

대신 `aws ecr get-login-password` 커맨드를 사용하라고 함.


```
Note: This command is deprecated. Use get-login-password instead.
```

`aws-cli/1.16.69`버전 에는 `get-login-password`커맨드가 없으므로 `aws-cli/1.18.186`로 업데이트 해줬다.


## AWS CLI Version 2부터는 get-login커맨드는 아에 삭제되어 있음

1.17.10대는 하위호환을 위해 이용가능

```
The older aws ecr get-login command is still available in the AWS CLI version 1 for backward compatibility
```