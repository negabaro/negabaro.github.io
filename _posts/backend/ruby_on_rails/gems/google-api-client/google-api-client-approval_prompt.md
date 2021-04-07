## approval_prompt과 access_type조합에 따라 refresh_token발행이 안될수도 있다고

refresh_tokenに관한 정보

```
approval_prompt: Determines whether the user is always re-prompted for consent. It’s set to force by default so a user sees a consent page even if he has previously allowed access a given set of scopes. Set this value to auto so that the user only sees the consent page the first time he authorizes a given set of scopes.

access_type: Defaults to offline, so a refresh token is sent to be used when the user is not present at the browser. Can be set to online.
```


上記のapproval_promptとaccess_typeなんですが、組み合わせ次第でrefresh_tokenが発行されないようです。

approvalprompt: auto + accesstype: offline = no refresh_token
approval_prompt、つまり「アカウント連携するぜ、いいよな？」という画面を出すかどうかという設定項目です。 これをauto、つまり、一回認証したらあとはわざわざ何度も「OK」を押さなくても良い、という設定にする。

次にaccess_type、つまり「実際ブラウザでアプリケーションを開いていない状態でもGoogleアカウントにアクセスできるかどうか」という設定項目です。 これをofflineにするとユーザがアクセスせずとも「裏側」でGoogleへアクセスすることができます。

さて、このapproval_prompt: auto + access_type: offlineという組み合わせを使うとrefresh_tokenが発行されないようです。 まあ確かに「一度認証されたのだから無期限にユーザのあずかり知らぬ所でアクセス可能としろ」というわけなので、そこまでの乱暴ぶりは許さないということでしょうか。

#valid_omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, 'your_cliant_id', 'your_client_secret',
    {
      scope: 'userinfo.email,userinfo.profile,https://www.googleapis.com/auth/analytics.readonly'
    }
end
追記
もしかしたら、二段階認証を設定しているユーザも同様にrefresh_tokenをもらえないです、いまのところ。



```ruby
refresh_token = access_token.credentials.refresh_token
    user.google_refresh_token = refresh_token if refresh_token.present?
```

[omniauth-google-oauth2でハマったメモ]을 참고했다.

[omniauth-google-oauth2でハマったメモ]:http://blog.takuyan.com/posts/2013/06/14/insufficientpermissions-error-in-omniauth-google-oauth2/