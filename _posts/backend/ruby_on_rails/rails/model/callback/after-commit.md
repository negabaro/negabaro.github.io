トリガーを追加する
どちらのコールバックもレコードが保存または削除（destroy）されるたびに追加されると申し上げましたが、その気になれば after_commit コールバックに他のトリガーを加えることもできます。更新時/作成時/削除時に特定のメソッドをトリガーしたい場合は次のようにします。

after_commit :log_user_activity, on: :create
after_commit :log_user_activity, on: :update
after_commit :log_user_activity, on: :destroy
上の呼び出しでは次のようにエイリアスを使うこともできます。

after_create_commit :log_user_activity
after_update_commit :log_user_activity
after_destroy_commit :log_user_activity

https://techracho.bpsinc.jp/hachi8833/2018_03_26/53528
https://blog.bigbinary.com/2016/05/11/rails-5-adds-after_create-aliases.html
