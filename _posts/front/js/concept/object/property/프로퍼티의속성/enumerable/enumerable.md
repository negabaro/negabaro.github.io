これまでのようなメソッド定義方法（Animal.prototype.speak = ...）は少し問題がありました。それは、そのように定義したメソッドは for-in 文や Object.keys で列挙されてしまうという問題です。

for-in 文は、オブジェクトに存在するキー全てに対してループできる文です。

```
var obj = {foo: 3, bar: "😇"};

for (var key in obj) {
  console.log(key + " : " + obj[key]);
}
/*
 * foo : 3
 * bar : 😇
 */
```

これは、オブジェクトに直接存在するキーだけでなく、そのプロトタイプ（やそのまたプロトタイプ）に存在するキーも列挙してくれます。

```
var base = {hoge: "ほげ"};
var obj = Object.create(base);
obj.foo = 3;
obj.bar = "😇";

for (var key in obj) {
  console.log(key + " : " + obj[key]);
}
/*
 * foo : 3
 * bar : 😇
 * hoge : ほげ
 */
```

しかし、そうなるとおかしいですね。実は普通のオブジェクトは Object のインスタンスです。すなわち、Object.prototype をプロトタイプに持ちます。そして、Object.prototype にはいくつかメソッドが存在します（先程出てきた hasOwnProperty など）。それにも関わらずそれらは列挙されませんでした。

これは、それらのメソッドの enumerable 属性が false であるからです。オブジェクトのプロパティはいくつかの属性を持ち、それによりプロパティの挙動が制御されています。enumerable 属性は、それが for-in 文などで列挙されるかどうかを制御する属性です。基本的に組み込みオブジェクトのメソッドは for-in 文の邪魔にならないように、enumerable 属性が false になっています。

一方で、我々が普通に（Animal.prototype.speak = ...のように代入して）作成したプロパティは enumrable 属性が true です。ということは、Animal のインスタンスに対して for-in 文を使うと speak メソッドなどが列挙されてしまうということです。実際、下の例で確かめると name, speak, sleep の 3 つが列挙されてます。

```
var myAnimal = new Animal("ポチ");
for (var key in myAnimal) {
  console.log(key); // "name", "speak", "sleep"が表示される
}
```

name はまあいいですね（Animal コンストラクタ内で this.name = ...として代入しているので）。しかし、プロトタイプチェーンに存在するメソッドが出てくるのは邪魔なので望ましくありません（本当に邪魔かどうかは意見が分かれるかもしれませんが、少なくとも組み込みのオブジェクトの挙動とは違います）。

実は、ES3 では我々が作るプロパティのこうした属性を制御できなかったのです。ES5 ではそれを制御する方法が追加されました。例えば enumrable 属性が false のプロパティ（やメソッド）を作るには Object.defineProperty を使います。

```
Object.defineProperty(Animal.prototype, {
  configurable: true,
  enumrable: false,
  writable: false,
  value: function() {
    console.log(this.name + "「鳴き声」");
  },
});
```

この例では configurable 属性と writable 属性も明示的に指定しています。これらの意味はここではやりませんので気になる方は自分で調べてみてください。
