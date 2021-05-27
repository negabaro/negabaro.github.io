

```ruby
class API < Grape::API

  # APIアクセスに接頭語を不可
  # ex) http://localhost:3000/api
  prefix "api"

  # APIアクセスにバージョン情報を付加
  # ex) http://localhost:3000/api/vl/
  version 'v1', :using => :path

  # 未指定の場合にJSONで返すように変更（URLで指定可能）
  format :json

  # 例外ハンドル 404
  rescue_from ActiveRecord::RecordNotFound do |e|
    rack_response({ message: e.message, status: 404 }.to_json, 404)
  end

  # 例外ハンドル 400
  rescue_from Grape::Exceptions::ValidationErrors do |e|
    rack_response e.to_json, 400
  end

  # 例外ハンドル 500
 rescue_from :all do |e|
   if Rails.env.development?
     raise e
   else
     error_response(message: "Internal server error", status: 500)
   end
 end

  mount Prefectures_API
end
```

---
https://qiita.com/takusemba/items/a86796aa3c207155c579