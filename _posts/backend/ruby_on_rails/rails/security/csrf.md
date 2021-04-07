

railsは、get以外の動詞のリンクに
authenticity_tokenというパラメータを自動的に付け加えます。

get以外の動詞の各アクションでparams[:authenticity_token]とsession[:csrf_id]を比較して、同値であればOKとしているようです。同値でなければActionController::InvalidAuthenticityTokenという例外がでます。



# rails6부터는 선언하지 않아도 디폴트로 적용되어있음

https://github.com/rails/rails/commit/ec4a836919c021c0a5cf9ebeebb4db5e02104a55

https://stackoverflow.com/questions/55860171/protect-from-forgery-in-rails-6


# InvalidAuthenticityToken 에러

Can't verify CSRF token authenticity.
Completed 422 Unprocessable Entity in 0ms (ActiveRecord: 0.0ms | Allocations: 475)


  
ActionController::InvalidAuthenticityToken (ActionController::InvalidAuthenticityToken):


잠깐 방치해서 세션이 바뀌었다

어떤 조작을 했을때 어떤 메시지를 보내야할까?

너 csrf정책에 위반되는 액션이 발생했으므로 진행할 수 없어

보다는 그냥 로그인페이지로 다시 넘기는게 괜찮을거 같애서
null: session옵션을 지정




로그인이 필수인 서비스
로그인이 필수가 아닌 서비스



<input type="hidden" name="authenticity_token" value="KV6flzDAWOFnBTPA1SzQw4rrf2Pzp/hnto9nCLGDctbwATjP9nXIJvvmq6fpjZN5EqkcBkqh7OtYlie4Fb3lvQ==">

post후에 binding.pry에서 session[:_csrf_token] 를 확인해보면


session[:_csrf_token] 
=> "2V+nWMa1kMec45hnPKFDuphCY2W5BhSM7hlAsKQ+l2s="





----

<input type="hidden" name="authenticity_token" value="pSAZ7eekZhxCiQFMQ5bdmUZDCG6Tdm4N38vEHKIV1Bx8f761IRH2295qmSt/N54j3gFrCypweoEx0oSsBitDdw==">


 session[:_csrf_token] 
=> "2V+nWMa1kMec45hnPKFDuphCY2W5BhSM7hlAsKQ+l2s="

invalid authenticity token error

-------------

# 

# 그냥 다른데??

`params[:authenticity_token]`과`session[:csrf_id]`를 비교해서 동일하지 않으면 
`ActionController::InvalidAuthenticityToken`에러를 발생시킨다는데 음 다른데도 에러가 안나는데??ㅋ

```ruby
[1] pry(#<Account::Registers::Common::VerifiesController>)> session[:_csrf_token] 
=> "2V+nWMa1kMec45hnPKFDuphCY2W5BhSM7hlAsKQ+l2s="
[2] pry(#<Account::Registers::Common::VerifiesController>)> params[:authenticity_token]
=> "pSAZ7eekZhxCiQFMQ5bdmUZDCG6Tdm4N38vEHKIV1Bx8f761IRH2295qmSt/N54j3gFrCypweoEx0oSsBitDdw=="

```

아 이게아니고 

<meta name="csrf-token" content="A2JtUW3fGzZfu9/g5xLHKtphhr1h9GjoCsVevod/H6naPcoJq2qL8cNYR4fbs4SQQiPl2NjyfGTk3B4OI0GIwg==">

<input type="hidden" name="authenticity_token" value="A2JtUW3fGzZfu9/g5xLHKtphhr1h9GjoCsVevod/H6naPcoJq2qL8cNYR4fbs4SQQiPl2NjyfGTk3B4OI0GIwg==">

아 값이 동일하네
이건가

params[:authenticity_token]
=> "A2JtUW3fGzZfu9/g5xLHKtphhr1h9GjoCsVevod/H6naPcoJq2qL8cNYR4fbs4SQQiPl2NjyfGTk3B4OI0GIwg=="
[4] pry(#<Account::Registers::Common::VerifiesController>)> session[:_csrf_token] 
=> "2V+nWMa1kMec45hnPKFDuphCY2W5BhSM7hlAsKQ+l2s="



# protect_from_forgery vs protect_from_forgery :null_session

API에서는 stateful한 session을 쓰지 않을테니

本来 :exception と書いてある場所を、 :null_session に変えることで、protect_form_forgery で使用される CSRF Token がリクエスト元と一致しなかった場合に例外を投げるんじゃなくてセッションを空にするという動作になる。

すると、セッション処理なんて必要ない API 機能が問題なく使える。



特定のメソッドだけCSRFの対策をしたくない場合は、そのメソッドのあるコントローラでこんな風に定義します。

  protect_from_forgery :except => ["create"]
:onlyも使えます。こうすると、createアクションの時のみprotect_from_forgeryが有効になります。

  protect_from_forgery :only => ["create"]


authenticityは、「信憑性」という意味らしい。ということは、Railsはこのトークンを使って何かしらの信憑性を判断しているようだ。

Railsはprotect_from_forgeryって書くだけでCSRF対策が有効になってマジ便利なわけだけど、セッションで認証するんじゃなくてiOSから呼ぶAPIとかでトークン使って認証する場合はCSRFの対策いらないので無効にしたい。

その場合は

protect_from_forgery with: :null_session
ってすればいいらしい。これはCSRF Tokenが一致しなかった場合に例外を投げるんじゃなくてセッションを空にするという動作になる。

ちなみにprotect_from_forgeryのデフォルトは:null_sessionなので

protect_from_forgery
でもよさそう（Rails 4.0.0現在）

ただし最初は以下のようになってるので明示的に変更する必要はある。

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
end

# skip_forgery_protection

特定のコントローラで検証を無効化する
skip_forgery_protection を使います。
これは skip_before_action :verify_authenticity_token のラッパーなので only: :create 等のオプションを指定できます。

app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  skip_forgery_protection
end
大本のコントローラで指定して継承先のコントローラで重複して使用はできないので、その場合は protect_from_forgery with: :exception 等を明示的に指定します。




検証を完全に無効化する
検証そのものを行わないようにします。

config/application.rb
config.action_controller.allow_forgery_protection = false
警告だけを消す
検証は行って WARN のログは出さないようにします。

config/application.rb
config.action_controller.log_warning_on_csrf_failure = false
Rails 5.2 や 6 以降で null_session
rails 5.2 以降はデフォルトで protect_from_forgery with: :exception となるような変更（https://github.com/rails/rails/commit/ec4a836919c021c0a5cf9ebeebb4db5e02104a55）が入り、ApplicationController からは protect_from_forgery の記述が消されました。

ApplicationController に protect_from_forgery null: :session としても反映されないので以前のように with: :null_session を使いたい場合は以下のようにします。

config/application.rb
config.action_controller.default_protect_from_forgery = false
app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  # protect_from_forgery に with オプションを渡さない場合は with: :null_session と同等
  protect_from_forgery
end

# protect_from_forgery with: :null_session

ってすればいいらしい。これはCSRF Tokenが一致しなかった場合に例外を投げるんじゃなくてセッションを空にするという動作になる。


https://github.com/rails/rails/commit/ec4a836919c021c0a5cf9ebeebb4db5e02104a55

<input type="hidden" name="authenticity_token" value="JDdG354VfbCX2Xf9R2wKQqiCC0AuIKWefF64tM7nzbj9aOGHWKDtdws675p7zUn4MMBoJZcmsRKSR/gEatla0w==">


# CSRF保護の利用法
Rails開発者はCSRF保護を無料で利用できます。最初に、application_controller.rbファイルでCSRF保護をオンにする以下の1行を有効にします。

protect_from_forgery with: :exception
次に、application.html.erbに次の1行を追加します。

<%= csrf_meta_tags %>
これでおしまいです。この機能は長年Railsに搭載されているので、開発者はこれを利用するかどうか決めるだけでよいのです。しかしこの機能はどのように実装されているのでしょうか？



---

解決方法
方法1. application_controller.rbを修正
controllers/application_controller.rbを見ると以下のようなコメントがあります。

Prevent CSRF attacks by raising an exception.
For APIs, you may want to use :null_session instead.

コメントに従い、以下のように変更すれば問題は解決します。

- protect_from_forgery with: :exception
+ protect_from_forgery with: :null_session
この変更により、CSRF対策が『例外の発生』から『セッションのクリア』になります。
『セッションのクリア」の場合、処理は継続されるためAPIのエンドポイントを叩いたら結果が返ってくるようになります。

方法2. APIで利用するcontrollerを修正
APIで利用するcontrollerに対して以下のメソッドを追加します。

skip_before_action :verify_authenticity_token
こちらのほうが、application_controller.rbを修正するのに比べて影響範囲が限定的になります。

さいごに



### reference:

```
https://blog.freedom-man.com/rails-csrf-codereading
https://qiita.com/ksilverwall/items/1dfdc2f7a45cea591dd4
http://tsurugeek.hatenablog.jp/entry/20100529/1275124622
http://konkea.hatenablog.com/entry/2019/06/21/025620
https://qiita.com/_ayk_study/items/88269643c675fd4ca975
https://blog.willnet.in/entry/20080509/1210338845
```