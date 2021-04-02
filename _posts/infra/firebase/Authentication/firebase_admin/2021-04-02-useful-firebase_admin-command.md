---
layout: post
title: "firebase_admin유용한 명령어 모음"
author: negabaro kim
tags: infra/firebase/authentication
---

## SDK초기화(공통)

Firebase 관리화면에서 비밀키를 작성하고 해당 파일을 `./cert.json`에 배치시켜주자.

```python
import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("./cert.json")
app = firebase_admin.initialize_app(cred)
```

## 유저 작성

```python
user = auth.create_user(
    email='user@example.com',
    email_verified=False,
    phone_number='+15555550100',
    password='secretPassword',
    display_name='John Doe',
    photo_url='http://www.example.com/12345678/photo.png',
    disabled=False)
print('Sucessfully created new user: {0}'.format(user.uid))
```

```python
user = auth.create_user(
    uid='some-uid', email='user@example.com', phone_number='+15555550100')
print('Sucessfully created new user: {0}'.format(user.uid))
```

## email로 유저 가져오기


```python
email = "user@example.com"
user = auth.get_user_by_email(email)
print('Successfully fetched user data: {0}'.format(user.uid))
```

result: `Successfully fetched user data: some-uid`


## UID로 유저 가져오기

```python
uid = 'some-uid'
auth.get_user(uid, app)
```

## custom token가져오기

```python
uid = 'some-uid'
auth.get_user(uid, app)

custom_token = auth.create_custom_token(uid, app=app)
print(custom_token.decode('utf-8'))
```

## firebase id token취득 방법

아래 curl커맨드로 firebase id token을 가져올 수 있다.

```
curl 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[web api key]' \
-H 'Content-Type: application/json' \
--data-binary  '{"token":"[custom token]","returnSecureToken":true}'
```

### web api key

[web api key]에는  Firebase관리화면 -> 프로젝트 설정 -> WebApi key의 값을 넣어주자.

### custom token

[custom token]에는 위에서 설명한 `custom token가져오기`로 취득한 값을 넣어주자.


[사용자 관리 공식문서]를 참고했다.

---

[사용자 관리 공식문서]: https://firebase.google.com/docs/auth/admin/manage-users