
```ruby
class MyAPI < Grape::API
  # rescue_fromは書いた順番にマッチングされる

  # Grapeの例外の場合は400を返す
  rescue_from Grape::Exceptions::Base do |e|
    error!(e.message, 400)
  end

   # 例外ハンドル 404
  rescue_from ActiveRecord::RecordNotFound do |e|
    rack_response({ message: e.message, status: 404 }.to_json, 404)
  end

  # 例外ハンドル 400
  rescue_from Grape::Exceptions::ValidationErrors do |e|
    rack_response e.to_json, 400
  end


  # それ以外は500
  rescue_from :all do |e|
    error!({error: e.message, backtrace: e.backtrace[0]}, 500)
  end
end
```

## error!

エラーはerror!メソッドによって発生させることができる。error!は例外を使っているようなので呼んだ時点で処理が中断するため、エラー発生後の処理のことは考えなくていい。

```ruby
class API < Grape::API
  resource :users do
    get '/' do
      error!("Unauthorized! Invalid token.", 401)
    end
  end
end
```

このAPIからはステータスコード401で次のようなJSONが戻ってくる。

{
  "error" : "Unauthorized! Invalid token."
}


## error_response

error_response라는것도 예전에 있었는데 코드 보면 `deprecated`상태임으로 `error!`를 사용하도록 하자.

```ruby
grape-0.16.2/lib/grape/middleware/error.rb
      # TODO: This method is deprecated. Refactor out.
      def error_response(error = {})
```

---

[★★Grapeを使ったAPIで独自のエラーコードも一緒に返す工夫]: https://blog.piyo.tech/posts/2014-10-29-153203/
[Rails+Grapeでエラーハンドリング]: https://qiita.com/aosho235/items/0f217fb0a8c941af8a4e