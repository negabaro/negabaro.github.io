# Q

ここまで Promise の話をしてきましたが、実際にコードに適用するのであれば、Q を使うのがベストかなと思います。
https://github.com/kriskowal/q

```
const Q = require('q')`
```

で扱えるシンプルな品で、Promise よりも使いやすいと評判です。
やはり非同期処理は細かなニーズが必要なので、こういうライブラリはありがたいですね。
delay のように時間を止めるメソッドもあります。
あと、`Promiseより40倍速いとかいう噂も・・・（保証はない）`

http://qiita.com/Awa_Dama/items/3f73ec4f5bf94bac2094

https://qiita.com/peutes/items/bd6500ef082efa8a08ff
