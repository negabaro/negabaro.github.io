https://teratail.com/questions/175077?modal=q-comp

https://qiita.com/K_Yagi/items/edc46fd976526279312b
https://qiita.com/K_Yagi/items/edc46fd976526279312b

https://teratail.com/questions/175077?whotofollow=

1.違います
文脈から eager_load は Model の eager_load メソッドのことをいってるんだと思いますが、
Model の eager_load は DB からデータを検索する際に、指定した association を一緒に取得しておいて
キャッシュしてくれるメソッドです。
それに対して eager_load_paths は DB ではなくクラスの読み込み関連の設定のため Model の eager_load とは関係ありません。

2.ちょっと違います。
両方共、クラスの読み込みに関連する設定ですが、
例えば lib/下に Book というクラスを定義したスクリプトがある場合、
autoload_paths に指定した場合は Book がどこかのプログラム中で最初に呼び出されたタイミングでそのクラスの定義されているスクリプトを autoload_paths に指定されているディレクトリから探し出してクラスをロードします。
それに対して eager_load_paths に指定した場合は、Rails が起動したタイミングで指定されているディレクトリ下にあるスクリプトを読み込んでクラスを予めロードしておきます。
なので、autoload_paths と eager_load_paths のではクラスをロードするタイミングが変わります。

Rails5 からは autoload は非推奨になってるので autoload_paths は使うことは殆どないと思います。
