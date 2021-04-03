---
layout: post
title: "Token used too early, 1617364257 < 1617364284 에러"
author: negabaro kim
tags: infra/firebase/authentication
---

## 에러

> ValueError: Token used too early, 1617364257 < 1617364284

아래 커맨드로 id token의 유효성을 검사할때 발생했다.


```python
decoded_token = auth.verify_id_token(id_token)
uid = decoded_token['uid']

print(decoded_token)
```

## 해결방법

필자의 경우 실행환경인 MAC의 시간설정이 조금 지난게 원인이었다.

30초 뒤에 다시 실행하자 에러는 발생하지 않았다.


---

[Token used too early, 1425303610 < 1425303636]: https://github.com/googleapis/google-api-php-client/issues/499
