foreman を導入する
Gemfile に以下を追記後、bundle install。

# Gemfile

# foreman
gem 'foreman'
$ bundle install
Procfile.dev を作成して、以下を追記。

# Procfile.dev
app: bin/rails s -b 0.0.0.0
frontend: bin/webpack-dev-server
bin/dev-server を作成して、以下を追記。パーミッションを 755 に。

# bin/dev-server
bundle exec foreman start -f Procfile.dev
$ chmod 755 bin/dev-server
これで bin/dev-server を実行すると、foreman 経由で Rails サーバが立ち上がり、http://localhost:5000/ でアクセスできるようになる。

$ bin/dev-server

https://notes.tmtr.jp/2019/09/30/vue-ts-rails/