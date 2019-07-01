HotModuleReplacementPlugin

HMR (Hot Module Replacement)

웹팩이 널리 알려지는 데 기여한 특성중 하나로 HMR(Hot Module Replacement)가 있다. 말 그대로 HMR은 컴포넌트를 실시간으로 저정하고 확인할 수 있게 해주는 기능으로서, 개발자가 CSS 또는 JS를 수정하면 브라우저에서 페이지를 새로 고치지 않아도 변경 사항이 즉시 반영된다.

HMR(Hot Module Replacement)を有効にすると、ブラウザをリロードせずに自動的にモジュールが更新される。

출처: https://jusungpark.tistory.com/54 [정리정리정리]

출처: https://jusungpark.tistory.com/54 [정리정리정리]

# HMR에러

ポイント：HMR がうまく動かないときは
HMR の指定方法については先ほど示した通りですが、--hot と hot: true、それから HotModuleReplacementPlugin の指定をごっちゃにしてしまうと正しく動きません。

“Uncaught RangeError: Maximum call stack size exceeded” が表示される
HMR 自体は機能しているが、毎回上記のエラーがコンソールに表示される場合。
--hot と HotModuleReplacementPlugin を両方指定しているのが原因です。
--hot だけで十分なので plugins の指定は削除しましょう。

参考：

“Uncaught Error: [HMR] Hot Module Replacement is disabled.” が表示される
上記エラーが表示され、ブラウザに何も表示されない場合。
この場合は hot: true を指定しているのに HotModuleReplacementPlugin が無いのが原因です。
--hot を使うか、plugins に HotModuleReplacementPlugin を追加しましょう。

### Reference Link:

```

```

https://dackdive.hateblo.jp/entry/2016/05/07/183335
