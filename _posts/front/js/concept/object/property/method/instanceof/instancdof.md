# instanceof

ここで instanceof 演算子に触れておきます。これは ES3 時代からある演算子で、あるオブジェクトがあるクラス（コンストラクタ）のインスタンスであるかどうか判定する演算子です。次のように使います。

var myAnimal = new Animal("ポチ");

console.log(myAnimal instanceof Animal); // true. myAnimal は Animal のインスタンスなので
console.log(myAnimal instanceof Cat); // false

var myCat = new Cat("ねこ");
console.log(myCat instanceof Animal); // true. myCat は Animal を継承している Cat のインスタンスなので
この演算子も、内部的にはオブジェクトのプロトタイプがどれかという情報を使っています。先ほど紹介した isPrototypeOf との違いは、継承関係を考慮してくれる（ループを回すことによってプロトタイプのプロトタイプに自身があるような場合も発見してくれる）点です 5。

https://qiita.com/uhyo/items/ab8e273e1eb71d02e29a

---

あと、実は instanceof の挙動は Symbol.hasInstance で制御できるという違いもあります。
