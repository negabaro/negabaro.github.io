

## WidgetsBinding.instance.addPostFrameCallback


WidgetsBinding.instance.addPostFrameCallback((_) => ここに関数とか処理置けば良い);
Flutterの1.8.4から実装された機能らしいです。
逆に何でそれまでは無かったんですかね、ってぐらい有り難い。

引用元：
https://stackoverflow.com/questions/49466556/flutter-run-method-on-widget-build-complete

何でこれが必要になったかの事例メモ
http.post() 通信で受け取ったJSONデータで
UIに表示する内容を変えるタイプの画面を作成する形のアプリを作っている。
普通に表示するだけならまぁ、FutureBuilderで全部作っちゃえば良い。
ところが、追加仕様が発生した。

仕様1. 有効期限付きのセッショントークンを通信ごとにサーバーから発行
仕様2. トークンが有効期限切れだったら、どの画面の通信でもかならずログイン画面に戻す
この段階でFutureBuilderは使えないことが確定した。
FutureBuilderの builder 内で Navigator の関数を使うとエラーになるのである。
仕様2.に対応するには、異常系の時に必ず Navigator.pushAndRemoveUntil を実行する必要がある。

というわけで、こういう実装にした。
今の所ちゃんと動いたので、これでいいと思う。多分。

通信時に、ローディング表示用Widgetを追加表示
↑のWidgetにて、WidgetsBinding.instance.addPostFrameCallback で future を実行
future 完了結果を取得
正常系、異常系それぞれで Navigator を使って別画面に遷移する

---

https://zenn.dev/muttsu_623/articles/17deec8d3e3005365aa0

https://qiita.com/Rwf-9DH3/items/b681c68b06e70b02ae8d

https://api.flutter.dev/flutter/scheduler/SchedulerBinding/addPostFrameCallback.html