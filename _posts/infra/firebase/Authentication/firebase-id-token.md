## firebase id token

Firebase 클라이언트 앱이 커스텀 백엔드 서버와 통신하는 경우 서버에 현재 로그인한 사용자를 식별해야 할 수 있습니다. 사용자를 안전하게 식별하려면 로그인이 정상적으로 이루어진 후에 HTTPS를 사용하여 사용자의 ID 토큰을 서버로 전송합니다. 그런 다음 서버에서 ID 토큰의 무결성과 진위를 검증하고 ID 토큰에서 uid를 가져옵니다. 이 방법으로 전송된 uid를 사용하면 현재 서버에 로그인한 사용자를 안전하게 식별할 수 있습니다.


[Firebase AuthenticationとIDトークンと更新トークンとセキュリティの話]: https://qiita.com/yaegaki/items/60618ee0dfe94bfddb79
[ID 토큰 확인]: https://firebase.google.com/docs/auth/admin/verify-id-tokens
[firebase_id_token]: https://github.com/fschuindt/firebase_id_token 