isPrototypeOf와 반대로

Object.prototype.isPrototypeOf`は、渡されたオブジェクトが自身をプロトタイプとしているかどうかを調べることができます。

```
var myAnimal = new Animal("ポチ");
console.log(Animal.prototype.isPrototypeOf(myAnimal)); // true
```
