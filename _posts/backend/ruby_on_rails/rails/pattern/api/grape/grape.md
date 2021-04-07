## grape


## Grape Entity

1対多のデータ構造を書くときに使う

上の例にも出てきているが present @idol, with: V1::Entities::IdolEntity の IdolEntity がそれである。 このファイルは以下のように記されている。


```ruby
module V1
  module Entities
    class IdolEntity < Grape::Entity
      expose :id
      expose :name
      expose :group, using: V1::Entities::GroupEntity
    end
  end
end
```

expose に指定したフィールドをオブジェクトに問い合わせてその値を返してくれる。 この場合以下のような JSON オブジェクトが返ってくる。

```
{
  id: 1,
  name: "test",
  group: {
    id: 1,
   name: "test"
  }
}
```


## gem 'grape_logging'

[grape_logging]

```ruby
require 'grape_logging'
use GrapeLogging::Middleware::RequestLogger,
    logger: Rails.logger,
    include: [GrapeLogging::Loggers::FilterParameters.new,
              GrapeLogging::Loggers::ClientEnv.new]
```

#### FilterParameters
The FilterParameters logger will filter out sensitive parameters from your logs. If mounted inside rails, will use the Rails.application.config.filter_parameters by default. Otherwise, you must specify a list of keys to filter out.

#### ClientEnv
The ClientEnv logger will add ip and user agent ua in your log.

#### RequestHeaders
The RequestHeaders logger will add request headers in your log.

# Configure sensitive parameters which will be filtered from the log file.
Rails.application.config.filter_parameters += [:password]



## gem 'grape-swagger'
Grapeで定義したAPIをSwagger形式でドキュメント化するために使う

descで記載している部分が、APIの説明としてSwaggerで表示されます。

## gem 'grape-swagger-entity'
レスポンスモデルをSwaggerで見られる形式にするときに使う

レスポンススキーマの実装
そして、サンプルレスポンスを自動生成するために、app/presenter/api_entity以下にレスポンススキーマを定義します。

module ApiEntity
  class Estimate < Grape::Entity
    class Item < Grape::Entity
      expose :name, documentation: { desc: '品目' }
      expose :unit_price, documentation: { desc: '単価', type: 'number' }
      expose :quantity, documentation: { desc: '数量', type: 'number' }
      expose :unit_name, documentation: { desc: '単位' }
      expose :tax_exempted, documentation: { desc: '消費税対象外フラグ', type: 'boolean' }
    end

最後に、API本体をapp/controllers/api/v3/root.rb内でマウントし、Swagger形式のドキュメントを作成します。


# swaggerドキュメントを生成する
      add_swagger_documentation(
        ...
      )

```
    if Rails.env.development? || ENV['HEROKU_ENV'] == 'development'
      add_swagger_documentation(
        security_definitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        }
      )
    end
```

ここで生成されたjson形式のドキュメントは http://localhost:3000/api/v3/swagger_doc で確認することができます。
root.rbをapp/controllers直下に配置した場合は、 http://localhost:3000/swagger_doc を確認してください。
このアドレスをSwaggerUI右上のテキストボックスに入力することで、ドキュメントがSwaggerUIで表示されます。

苦労した点
GrapeはApplicationControllerを継承していないため、そこで定義していた変数が一部使えなくなりました。 具体的には、現在ログインしているユーザを表すcurrent_userなどです。 これらは認証を行うために必要なので、別途、実装しました。
認証情報を取得する
認証を行うために、grape helperを使ってGrapeの拡張を行います。いまのところv3でしか使わないので、app/controllers/api/v3以下にauthenticate.rbを作成し、その中でcurrent_userなどを定義します。

## gem 'grape-swagger-rails'

Swagger UI as Rails Engine for grape-swagger gem.

---

[grape_logging]: https://github.com/aserafin/grape_logging
[Grape + Grape Entity で作る API]: https://h-piiice16.hatenablog.com/entry/2019/11/29/105434
[]: https://github.com/ruby-grape/grape
[Grapeを使ってRESTfulAPIを簡単作成 その1 Grape]: https://qiita.com/Esfahan/items/90feb3ae39dde51f95fa

[Grape+SwaggerでAPIのドキュメント作成を自動化した]: https://tech.misoca.jp/entry/2016/12/22/110000