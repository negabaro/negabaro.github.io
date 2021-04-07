## firebase custom token

既存の認証システムや標準プロバイダがない場合に利用できるのがcustom tokenによる認証。
要は何か識別IDとなる文字列を渡してやればそれに対応したtokenが帰ってくる。その後はそのtokenを利用してログインすればよい。

유저 식별에 uid값을 가지고 custom token을 발행


Firebase는 보안 JSON 웹 토큰(JWT)으로 사용자나 기기 인증이 가능해 인증 전 과정을 철저히 관리할 수 있습니다. 토큰을 서버에서 생성한 뒤 클라이언트 기기에 다시 전달하면 signInWithCustomToken() 메서드로 인증됩니다.

이를 위해서는 먼저 사용자 이름과 비밀번호 등 로그인 사용자 인증 정보를 수신하는 서버 엔드포인트를 만들어야 합니다. 서버 엔드포인트는 사용자 인증 정보가 올바르면 커스텀 JWT를 반환합니다. 클라이언트 기기는 서버에서 반환된 커스텀 JWT를 사용하여 Firebase(iOS, Android, 웹)에 인증할 수 있습니다. 인증된 ID는 Firebase 실시간 데이터베이스, Cloud Storage 등의 다른 Firebase 서비스에 액세스하는 데 사용됩니다. 실시간 데이터베이스 규칙의 auth 객체 및 Cloud Storage 보안 규칙의 request.auth 객체에서 JWT의 내용을 확인할 수 있습니다.

Firebase Admin SDK로 커스텀 토큰을 만들거나, Firebase가 기본적으로 지원하는 않는 언어로 서버가 작성된 경우에는 타사 JWT 라이브러리를 사용할 수도 있습니다.


IDトークン
ユーザーの情報が含まれたJWT。
有効期限が1時間しかない。

更新トークン
IDトークンを取得するために使用するトークン。

[Firebase Authentication Custom Tokenの取得と利用]: https://qiita.com/zaburo/items/92920fa955bdb890c52e
[Firebase AuthenticationとIDトークンと更新トークンとセキュリティの話]: https://qiita.com/yaegaki/items/60618ee0dfe94bfddb79
[커스텀 토큰 만들기]: https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=ko