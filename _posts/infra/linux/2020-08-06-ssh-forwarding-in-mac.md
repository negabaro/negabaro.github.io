---
layout: post
title:  mac에서 SSH Forwarding하는 방법
description: ssh -L [local에서LISTENING할PORT명]:[접속할HOST명]:[접속할PORT명 경유할서버의USER명]@[경유할서버의HOST명] 
tags: mac linux
---


중계서버(혹은 특정서버)에서만 접속이 가능한 서버를 로컬에서 바로 접속하고 싶을때 ssh forwarding은 매우 유용한 방법이다.
이번 포스트에서는 mac에서 ssh Forwardning하는 방법에 대해 알아보자.

# mac에서 SSH Forwarding하는 방법


## 문법 

```
ssh -L [local에서LISTENING할PORT명]:[접속할HOST명]:[접속할PORT명 경유할서버의USER명]@[경유할서버의HOST명] 
```


## 예제


```
ssh -L 33066:xx.yy.ap-northeast-1.rds.amazonaws.com:3306 ec2-user@xx -i ~/.ssh/uu.pem 
```


정상적으로 Forwarding이 되었다면 33066 PORT를 리스닝하고 있을것이다.

아래 커맨드로 체크해보자.

```
netstat -an |grep 33066
```


## SSH Forwarding으로 접속

정상적으로 LISTENING하고 있다면 아래 커맨드로 중계서버를 경유해서 aws RDS에 접속이 가능하다.

```
mysql -u xx -h localhost:33066 -p
```