# class안에 constructor

constructor という定義でコンストラクタ（new 時に呼び出される関数）を定義します。なお、constructor の定義は省略可能であり、その場合はコンストラクタは何もしない関数になります。

https://qiita.com/uhyo/items/ab8e273e1eb71d02e29a

# class도 사실은 function이다

console.log(typeof Animal === "function"); // true
ES2015 の class 構文で定義されたクラスも、やはりその実は関数オブジェクトです。

# function이지만 new를 사용하지 않으면 호출이 안됨

ただし、class で作られた関数オブジェクトは new を使わないと呼び出せないという特徴があります。

というのも、function 宣言で作られる従来方式のクラスは結局ただの関数なので、それが関数なのかクラスなのかはプログラマの意図次第です。ですから、普通の関数としても呼び出せるし、new を用いてクラス（コンストラクタ）としても呼び出せます。

一方、class で作られたクラスは、関数オブジェクトであるといえどもクラスとして用いることが意図されているのは明白です。ですから、Animal()のようにただの関数として呼び出すことはできません。これは、class が完全な糖衣構文ではない点のひとつです（他の機能ではこのような関数オブジェクトを作ることは（少なくとも現時点では）できません。）6

さて、Animal が class 構文を用いて作られた場合であっても、その裏の挙動というのは変わっていません。ソースコードには明示的に現れませんが、裏ではちゃんと Animal.prototype が用意されています。

```
// Animal.prototypeにspeakメソッドが存在するか確かめる
console.log(Animal.prototype.hasOwnProperty("speak")); // true
```

当然ながら、Animal のインスタンスは従来どおり Animal.prototype をプロトタイプに持ちます。

```
var myAnimal = new Animal("ポチ");
console.log(Object.getPrototypeOf(myAnimal) === Animal.prototype); // true
```

継承の仕組みが従来どおりであることも確かめられます。

```
console.log(Object.getPrototypeOf(Cat.prototype) === Animal.prototype); // true
```

ちなみに、class 構文で作られたメソッドはちゃんと enumrable 属性が false に設定されています。さすがですね。

https://qiita.com/uhyo/items/ab8e273e1eb71d02e29a
