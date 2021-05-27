## grape_logging

Gemfileに追記：

gem 'grape_logging'
config/initializers/instrumentation.rbを新規作成：

config/initializers/instrumentation.rb
# Subscribe to grape request and log with Rails.logger
ActiveSupport::Notifications.subscribe('grape_key') do |name, starts, ends, notification_id, payload|
  Rails.logger.info payload
end
自分のAPIクラスに記述：

require 'grape_logging'

class MyAPI < Grape::API
  # https://github.com/aserafin/grape_logging#logging-via-rails-instrumentation
  use GrapeLogging::Middleware::RequestLogger,
      instrumentation_key: 'grape_key',
      include: [ GrapeLogging::Loggers::Response.new,
                GrapeLogging::Loggers::FilterParameters.new ]

  format :json
  content_type :json, "application/json; charset=utf-8"

  # テスト用API
  params do
    requires :a, type: Integer
  end
  post 'moge' do
    20 + params[:a]
  end
end
出力項目をカスタマイズする
レスポンスを全部ロギングするのはさすがに過剰なので出力しないようにしたい。そんな場合は自分のAPIクラスに書いたinclude:の部分からGrapeLogging::Loggers::Response.newを消せば良い。

他にもClientEnv、RequestHeadersといった出力項目がある。

    include: [ GrapeLogging::Loggers::Response.new,
               GrapeLogging::Loggers::FilterParameters.new,
               GrapeLogging::Loggers::ClientEnv.new,
               GrapeLogging::Loggers::RequestHeaders.new ]



---

https://github.com/aserafin/grape_logging#logging-via-rails-instrumentation
https://qiita.com/aosho235/items/ef06ff73abc1a9d31272