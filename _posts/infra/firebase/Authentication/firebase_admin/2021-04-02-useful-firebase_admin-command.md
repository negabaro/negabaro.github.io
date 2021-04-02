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

## UID로 유저 가져오기


```python
email = "user@example.com"
user = auth.get_user_by_email(email)
print('Successfully fetched user data: {0}'.format(user.uid))
```

result: `Successfully fetched user data: some-uid`



[사용자 관리 공식문서]를 참고했다.

---

[사용자 관리 공식문서]: https://firebase.google.com/docs/auth/admin/manage-users