やや余談ですが、ES5 ではプロトタイプ関連の便利な機能がいくつか追加されています。

例えば、Object.getPrototypeOf は、あるオブジェクトのプロトタイプとなっているオブジェクトを返すメソッドです。これを使うと、Animal インスタンスのプロトタイプが本当に Animal.prototype であることを確かめることができます。

```
var myAnimal = new Animal("ポチ");
console.log(Object.getPrototypeOf(myAnimal) === Animal.prototype); // true
逆にObject.prototype.isPrototypeOf`は、渡されたオブジェクトが自身をプロトタイプとしているかどうかを調べることができます。

var myAnimal = new Animal("ポチ");
console.log(Animal.prototype.isPrototypeOf(myAnimal)); // true
```
