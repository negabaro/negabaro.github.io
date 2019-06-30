https://qiita.com/muramurasan/items/305bd3d78d67b646bc06
https://stackoverflow.com/questions/27833647/whats-the-impact-of-eager-load-true
https://stackoverrun.com/ja/q/7640557

1.違います
文脈から eager_load は Model の eager_load メソッドのことをいってるんだと思いますが、
Model の eager_load は DB からデータを検索する際に、指定した association を一緒に取得しておいて
キャッシュしてくれるメソッドです。
それに対して eager_load_paths は DB ではなくクラスの読み込み関連の設定のため Model の eager_load とは関係ありません。
