trailing_slash

Railsのルーティングで、末尾にスラッシュを付けたい時の話です（Rails4.x系はデフォルトではつかない）。

全部につけていい場合は、下記の様にしておしまいです。

application.rb
config.action_controller.default_url_options = { :trailing_slash => true }
全部ではなく、パスによって付けたり付けなかったりしたい場合は下記のようにします。

routes.rb
get '/item'  => 'item#index',   trailing_slash: true # スラッシュ付き
get '/item/hoge'  => 'item#hoge'  # スラッシュなし
これで、/itemはlink_toなどで出力されるリンクに/item/のようにスラッシュが付きます。
/item/hogeの方はスラッシュが付きません。

最後に、ダイレクトに/itemにリクエストがあった時に/item/へリダイレクトする処理もやっておきたいです（今のままだと/itemもそのまま普通に表示されてしまいます）。Rack層でやるのが良いような記事も見かけましたが、できればRails内で処理したい…。

ちょっと見通しが悪くなるのですが、コントローラー内に書いてあげると実現できました。

複数コントローラーで同じことをしたいこともあると思うので、まずは下記。

application_controller.rb
# trailing_slashがついてない場合、slash付きのパスにリダイレクトする
def force_trailing_slash
  redirect_to "#{request.original_url}/" unless request.original_url.match(/\/$/)
end
そして、夫々のコントローラーのリダイレクトしたいアクションにこのフィルタをかまします。

item_controller.rb
before_filter :force_trailing_slash, only: 'index'
これで、/itemが/item/にリダイレクトされるようになります。

https://qiita.com/naokazuterada/items/5f4bbf82f1c99222dc53