
flashメッセージのロケール
（2017/2/23追加)
createやupdateなどした時に出るflashメッセージを一つ一つ設定するのは面倒ですが、respondersというgemの機能を使うと簡単にさくっと整理されていい感じです。
https://github.com/plataformatec/responders

こんな風に書けば基本のflashメッセージが設定されます。

ja:
  flash:
    actions:
      create:
        notice: "%{resource_name}が保存されました"
      update:
        notice: "%{resource_name}が更新されました"
      destroy:
        notice: "%{resource_name}が削除されました"
        alert: "%{resource_name}が削除できませんでした"
デフォルトと違うメッセージを設定したいところはコントローラーごとに以下のように書きます。

flash:
    posts:
      create:
        notice: 投稿できました！
なんとなくふわっと使ってたのですが、いつの間にか使えなくなっていたので改めて使い方を調べました。
respondersはrails4.1以前で標準だったrespond_toをgemとして切り出してものですね。gemはいつの間にか入っていましたが、railsのバージョンを上げたことでrails g responders:installをしていないと使えなくなっていました。
この方法でメッセージ管理すればコントローラー内で記載しなくて済むのでコントローラーがすっきりしますね！


```ruby
Running via Spring preloader in process 68274
      create  lib/application_responder.rb
      insert  config/application.rb
     prepend  app/controllers/application_controller.rb
      insert  app/controllers/application_controller.rb
      create  config/locales/responders.en.yml

```

[github](https://github.com/heartcombo/responders)
