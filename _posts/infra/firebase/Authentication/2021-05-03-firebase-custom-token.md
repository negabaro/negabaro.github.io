---
layout: post
title: "Firebase Custom Token이란?"
author: negabaro kim
tags: infra/firebase/authentication
---

## Firebase Custom Token이란?

유저 식별가능한 ID(UID)를 문자열로 넘겨주면 거기에 해당하는 token이 발행해주는데 그것을 Custom Token이라 부른다.

## Custom Token이 필요없는 경우

IOS,Android,Web(front단)에서는 따로 인증을 하는 방법이 존재하므로 이 포스트에서 설명하는 `Custom Token`을 발행할 필요가 없다.

## Custom Token이 필요한 경우

주로 백엔드단 언어(Java,Python,Node.js)등을 사용할때  사용하는것 같다.

## Custom Token은 어디에서 사용함?

id token을 발행할때 필요하다.


## Custom Token발행을 위해 필요한것은?

`firebase-admin-sdk.json`파일과 유저 식별을 위한 `UID`가 필요하다.


### firebase-admin-sdk.json 다운로드 방법


Firebase관리화면 -> 프로젝트 설정 -> Service Account -> Firebase Admin SDK에서 새로운 키 작성 버튼을 누르면 다운로드 받을 수 있다.

### UID 확인방법

Firebase관리화면 -> Authentication -> ID(email)에 해당하는 UID로 확인이가능



## Python코드를 이용해 custom token발행하는 방법

위에서 언급한대로 `firebase-adminsdk.json`을 다운받아두고
uid를 수정할 필요가 있다.


```python
import json
import os
import subprocess
import firebase_admin
from firebase_admin import auth
file_path = f"{os.getcwd()}/firebase-adminsdk.json"
cred = firebase_admin.credentials.Certificate(file_path)
app = firebase_admin.initialize_app(cred, name='auth')

uid = 'xx'
auth.get_user(uid, app)
custom_token = auth.create_custom_token(uid, app=app)
print(custom_token.decode('utf-8'))
```

## 메모

읽어는 봤는데 뭔소린지 잘 이해가 안되는 내용들


> Firebase는 보안 JSON 웹 토큰(JWT)으로 사용자나 기기 인증이 가능해 인증 전 과정을 철저히 관리할 수 있습니다. 토큰을 서버에서 생성한 뒤 클라이언트 기기에 다시 전달하면 signInWithCustomToken() 메서드로 인증됩니다.

> 이를 위해서는 먼저 사용자 이름과 비밀번호 등 로그인 사용자 인증 정보를 수신하는 서버 엔드포인트를 만들어야 합니다. 서버 엔드포인트는 사용자 인증 정보가 올바르면 커스텀 JWT를 반환합니다. 클라이언트 기기는 서버에서 반환된 커스텀 JWT를 사용하여 Firebase(iOS, Android, 웹)에 인증할 수 있습니다. 인증된 ID는 Firebase 실시간 데이터베이스, Cloud Storage 등의 다른 Firebase 서비스에 액세스하는 데 사용됩니다. 실시간 데이터베이스 규칙의 auth 객체 및 Cloud Storage 보안 규칙의 request.auth 객체에서 JWT의 내용을 확인할 수 있습니다.

> Firebase Admin SDK로 커스텀 토큰을 만들거나, Firebase가 기본적으로 지원하는 않는 언어로 서버가 작성된 경우에는 타사 JWT 라이브러리를 사용할 수도 있습니다.


---

[Firebase Authentication Custom Tokenの取得と利用]: https://qiita.com/zaburo/items/92920fa955bdb890c52e
[Firebase AuthenticationとIDトークンと更新トークンとセキュリティの話]: https://qiita.com/yaegaki/items/60618ee0dfe94bfddb79
[커스텀 토큰 만들기]: https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=ko