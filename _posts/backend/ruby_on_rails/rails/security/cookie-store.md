---
layout: post
title:  "rails6 cookie_store란"
description: "브라우저 종료시 해당 cookie는 사라진다."
tags: rails/security
---

この場合のsession cookieは、Railsのsession object (Hash object) をMarshal.dumpしてそれに署名を付けたtokenです。 rails 4では署名付ける代わりに暗号化してるけど、ここで述べる問題に関してはsignedなのかencryptedなのかは関係ないのでその点は無視していいです。

「current user identifierを含むSigned JSONをcookieに入れてるのと同じなので、OpenID ConnectのID Tokenがcookieに入ってるようなもんだと思えばいい」と言えば、#idcon に来たり定期的にOAuth.jp読んだりしてる人には通じるだろうと期待します。


すると一気に絞り込まれ、Cookie名から「_test_slip202_session」が求めるクッキーだと予想できる


の中から、以下の記述を確認する。

```ruby
class CGI::Session::CookieStore
...（中略）...
  private
    # Marshal a session hash into safe cookie data. Include an integrity hash.
    def marshal(session)
      data = Base64.encode64(Marshal.dump(session)).chop
      CGI.escape "#{data}--#{generate_digest(data)}"
    end

    # Unmarshal cookie data to a hash and verify its integrity.
    def unmarshal(cookie)
      if cookie
        data, digest = CGI.unescape(cookie).split('--')
        unless digest == generate_digest(data)
          delete
          raise TamperedWithCookie
        end
        Marshal.load(Base64.decode64(data))
      end
    end
...（中略）...
```

つまり、エンコード・デコードの方法は以下のようにするべきと勝手に解釈した。

エンコードは、sessionオブジェクト >> Marshal.dump >> Base64.encode64 >> CGI.escape

デコードは、CGI.unescape >> Base64.decode64 >> Marshal.load >> sessionオブジェクト


fp26NqXuROya6YpO3ixJgRuNtTRg4qiFqndfWTI%2FvSgCrhkErGpEFiLgYm18w3sc0NWZzgsFFyF4Ce3LWPXtoT8IlcqivgMVrOFKakSAnQqAEWagi534CWt2VxYrWiqjEU8GNQLI1Nrr3ozFlccW8WAnVj8IWd7R7eN4cyutpgbvu%2B6uwFn%2BhK8txM1GWJDwR0ltM154dahmezCyGazqI%2FwZNEnEJ4fM%2F7AcAwQa%2FstKRH3t%2Fjw93zBRmi5DHYCU8eGPknN8g%2FwXqWRVsIQaiAXjCoRQWkHrQcBCoGy3I3i3Yhux4SG0WPOx70ClwcwT2PCdu66FPHl%2BQI9nkGUo5D7OeMilnqWEaMcR14XkyQ%3D%3D--v%2BgcAKynBzZe2Ba4--y2lrBaaSpVicmBHx6MddKQ%3D%3D