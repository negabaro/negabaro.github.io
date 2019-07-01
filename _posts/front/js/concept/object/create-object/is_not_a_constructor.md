String や Array ように、 new を使って構築可能な多くのグローバルオブジェクトがあります。 ただし、一部のグローバルオブジェクトは存在せず、そのプロパティとメソッドは静的です。 以下の JavaScript 標準組み込みオブジェクトは、 Math 、 JSON 、 Symbol 、 Reflect 、 Intl 、 SIMD 、 Atomics コンストラクタではありません。

生成関数はコンストラクタとしても使用できません。

```
var Car = 1;
new Car();
// TypeError: Car is not a constructor

new Math();
// TypeError: Math is not a constructor

new Symbol();
// TypeError: Symbol is not a constructor

function* f() {};
var obj = new f;
// TypeError: f is not a constructor
```

ex6
new 演算子でインスタンスが作れるか試してみる。

```
var o = { prop : "私はプロパティです。" };
var obj = new o();
console.log(o.prop);

// 結果：
// o is not a constructor
```

o はコンストラクタではないというエラー。

オブジェクト = クラスではない。JavaScript のクラスは関数オブジェクトで表現できる。クラス = 関数オブジェクト。上の定義通り言うと、クラス = インスタンス化できる関数オブジェクト。

http://taiju.hatenablog.com/entry/20090612/1244765780

An additional cause of this can be ES2015 arrow functions. They cannot be used as constructors.

```
const f = () => {};
new f(); // This throws "f is not a constructor"
```

https://stackoverflow.com/questions/10107198/javascript-not-a-constructor-exception-while-creating-objects

or my project, the problem turned out to be a circular reference created by the require() calls:

```
y.js:
var x = require("./x.js");
var y = function() { console.log("result is " + x(); }
module.exports = y;

x.js:
var y = require("./y.js");
var my_y = new y(); // <- TypeError: y is not a constructor
var x = function() { console.log("result is " + my_y; }
module.exports = x;
```

The reason is that when it is attempting to initialize y, it creates a temporary "y" object (not class, object!) in the dependency system that is somehow not yet a constructor. Then, when x.js is finished being defined, it can continue making y a constructor. Only, x.js has an error in it where it tries to use the non-constructor y.

To add to @wprl's answer, the ES6 object method shorthand, like the arrow functions, cannot be used as a constructor either. 😅

```
const o = {
  a: () => {},
  b() {},
  c: function () {}
};

const { a, b, c } = o;

new a(); // throws "a is not a constructor"
new b(); // throws "b is not a constructor"
new c(); // works
```
