---
layout: post
title: "firebase_admin._auth_utils.ConfigurationNotFoundError: No auth provider found for the given identifier (CONFIGURATION_NOT_FOUND)에러 해결방법"
author: negabaro kim
tags: infra/firebase/authentication
---



firebase에서 비밀키를 발급받고 cert.json에 지정후 테스트로 유저를 만들기위해 아래 python 커맨드를 실행하면 에러가 발생핬다.

```python
import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("./cert.json")
app = firebase_admin.initialize_app(cred)

print(app)

user = auth.create_user(
    uid='some-uid', email='user@example.com', phone_number='+15555550100')
print('Sucessfully created new user: {0}'.format(user.uid))
```

에러 내용은 아래와 같다.

> requests.exceptions.HTTPError: 400 Client Error: Bad Request for url: https://identitytoolkit.googleapis.com/v1/projects/xxx/accounts:lookup

>  firebase_admin._auth_utils.ConfigurationNotFoundError: No auth provider found for the given identifier (CONFIGURATION_NOT_FOUND).

#### 에러 전체 메시지

```python
Traceback (most recent call last):
  File "/Users/sehwakim/.pyenv/versions/3.7.1/lib/python3.7/site-packages/firebase_admin/_user_mgt.py", line 837, in _make_request
    return self.http_client.body_and_response(method, url, **kwargs)
  File "/Users/sehwakim/.pyenv/versions/3.7.1/lib/python3.7/site-packages/firebase_admin/_http_client.py", line 127, in body_and_response
    resp = self.request(method, url, **kwargs)
  File "/Users/sehwakim/.pyenv/versions/3.7.1/lib/python3.7/site-packages/firebase_admin/_http_client.py", line 119, in request
    resp.raise_for_status()
  File "/Users/sehwakim/.pyenv/versions/3.7.1/lib/python3.7/site-packages/requests/models.py", line 943, in raise_for_status
    raise HTTPError(http_error_msg, response=self)
requests.exceptions.HTTPError: 400 Client Error: Bad Request for url: https://identitytoolkit.googleapis.com/v1/projects/xxx/accounts:lookup

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "get_custom_token.py", line 13, in <module>
    auth.get_user(uid, app)
  File "/Users/sehwakim/.pyenv/versions/3.7.1/lib/python3.7/site-packages/firebase_admin/auth.py", line 309, in get_user
    return client.get_user(uid=uid)
  File "/Users/sehwakim/.pyenv/versions/3.7.1/lib/python3.7/site-packages/firebase_admin/_auth_client.py", line 150, in get_user
    response = self._user_manager.get_user(uid=uid)
  File "/Users/sehwakim/.pyenv/versions/3.7.1/lib/python3.7/site-packages/firebase_admin/_user_mgt.py", line 596, in get_user
    body, http_resp = self._make_request('post', '/accounts:lookup', json=payload)
  File "/Users/sehwakim/.pyenv/versions/3.7.1/lib/python3.7/site-packages/firebase_admin/_user_mgt.py", line 839, in _make_request
    raise _auth_utils.handle_auth_backend_error(error)
firebase_admin._auth_utils.ConfigurationNotFoundError: No auth provider found for the given identifier (CONFIGURATION_NOT_FOUND).
```


## 원인

FireBase -> Authentication에서 어떤것도 유효화 시키지 않았을때 발생했다.

Email인증을 유효화 시킨후 다시 실행하니까 정상동작했다.

---

