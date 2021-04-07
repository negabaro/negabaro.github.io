Digest認証

BCrypt


Digest認証
ProgateやRailsTutorialなどをやった方はPassword_digestカラムみたいなのを作成してパスワードを暗号化したのを覚えてると思うのですが、そのDigestと同じです。
Basic認証と同様にユーザー名とパスワードが必要なんですが、パスワードをハッシュ関数MD5を用いて解析されにくい状態で送信する仕組みです。
Basic認証がパスワードをそのまま平文で暗号処理していたのに対してDigest認証はパスワードにランダム文字列を組み合わせたものを暗号化して送信します。

クライアントから認証ページにアクセス（クライアントは認証ページだと知らない）
認証ページを表示するサーバーはクライアントに401（認証エラー）のリクエストを返す
この時にリクエストごとに生成されるランダム文字列（nonce）も一緒に返されます
curl -I リクエスト名とかやるとHTTP Headerを確認できてnonceがリクエストのたびに変わってるのが確認できます。
クライアントからユーザー名は平文で、パスワードはnonceと入力値をコネコネしてMD5でハッシュ化してから送信されます。
リクエストの内容が合致するかどうかを調べる。
posts_controller.rb
require 'digest/md5'
class PostsController < ApplicationController
 REALM = "SuperSecret"
 USERS = {"dhh" => "secret", #plain text password
          "dap" => Digest::MD5.hexdigest(["dap", REALM, "secret"].join(":"))}

 before_action :authenticate, except: [:index]

 def index
  render plain: "誰でも閲覧可能"
 end

 def edit
  render plain: "認証した人だけ閲覧可能"
 end

 private
  def authenticate
   authenticate_or_request_with_http_digest(REALM) do |username|
    USERS[username]
   end
  end
end
authenticateメソッドの中のusernameはダイアログで入力してもらった「ユーザー名」のことで、
このメソッドでの返り値はパスワードになる必要があります。
その返り値のパスワードとダイアログで入力してもらったパスワードが同一であれば認証が通ります。


https://qiita.com/jiggaman0412/items/74dd0c28b0d7512823d0