アセットパイプラインは sprockets-rails gem によって実装され、デフォルトで有効になっています。アプリケーションの新規作成中にアセットパイプラインを無効にするには、--skip-sprockets オプションを渡します。

```ruby
rails new appname --skip-sprockets
```

Rails では sass-rails、coffee-rails、uglifier gem が自動的に Gemfile に追加されます。Sprockets はアセット圧縮の際にこれらの gem を使用します。

```ruby
gem 'sass-rails'
gem 'uglifier'
gem 'coffee-rails'
```

xx

```ruby
# require "sprockets/railtie"
```

# Sprockets を webpack で代替するために以下を実施していきます。

digest 付きの assets を生成する
production では JS を圧縮して生成する
webpack で CSS も生成する
Rails から webpack の作成した JS / CSS を読み込む

https://railsguides.jp/asset_pipeline.html
