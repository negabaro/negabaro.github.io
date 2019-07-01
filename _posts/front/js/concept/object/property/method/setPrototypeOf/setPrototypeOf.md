ES2015 で追加された prototype 関係メソッドとして Object.setPrototypeOf があります。これはたいへんやばいメソッドであり、名前から分かる通り、オブジェクトのプロトタイプを後から書き換えることができるというものです。

```
var myCat = new Cat("たま");

myCat.speak(); // たま「にゃーん」

// myCatのプロトタイプをAnimal.prototypeに書き換える
Object.setPrototypeOf(myCat, Animal.prototype);

myCat.speak(); // たま「鳴き声」
```

まあ何かの使い道があるから用意されたのでしょうが、これを使うのはとてもやばいので、本当に必要ない限りは避けたほうがよいでしょう。オブジェクトを作るときにプロトタイプが決まっているなら Object.create でいいですしね。

ちなみに、これを使ってプロトタイプが無限ループするオブジェクトを作成しようとするとエラーになります。偉いですね。

```
var loopObj = {};
// loopObjのプロトタイプをloopObj自身にセットしようとするとエラー
Object.setPrototypeOf(loopObj, loopObj);
```

https://qiita.com/uhyo/items/ab8e273e1eb71d02e29a
