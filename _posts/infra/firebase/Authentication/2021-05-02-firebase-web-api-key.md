---
layout: post
title: "Firebase Web API Key란?"
author: negabaro kim
tags: infra/firebase/authentication
---

## Firebase Web API Key란

Firebase project를 작성하면 `projectId`,`apiKey`,`databaseURL`가 만들어지는데
이것들을 이용해 특정 FireBase를 식별해 해당 기능에 접근할 수 있다.

`apiKey`는 `WebApi key`로도 불린다.

Web API key는  Firebase관리화면 -> 프로젝트 설정 -> Web API Key 에서 확인할 수 있다.

## 용도


예를들어 firebase id token을 가져올때 아래와 같은 커맨드를 실행하는데 `${WEB_API_KEY}` 부분이 식별해야할 FireBase의 `Web API Key`를 넣어줘야한다.

```
curl 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${WEB_API_KEY}' \
-H 'Content-Type: application/json' \
--data-binary  '{"token":"${CUSTOM_TOKEN}","returnSecureToken":true}'
```

## 세큐리티

Web API Key라는 이름처럼 이 Key값은 Firebase project를 식별하기 위해 쓰이는 키이므로 세큐리티면으로 크게 신경쓸 필요는 없다.

> The apiKey in this configuration snippet just identifies your Firebase project on the Google servers. It is not a security risk for someone to know it. In fact, it is necessary for them to know it, in order for them to interact with your Firebase project. This same configuration data is also included in every iOS and Android app that uses Firebase as its backend.

자세한 내용은 [Is it safe to expose Firebase apiKey to the public?]를 참고

---

[Is it safe to expose Firebase apiKey to the public?]: https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public

[Firebase apiKey ってさらしていいの? ほんとに?]: https://qiita.com/hoshymo/items/e9c14ed157200b36eaa5

[firebaseのAPI keyを公開して良い理由]: https://teratail.com/questions/247093
