# static クラス化

```
class Car {
  static run() {
    console.log('run');
  }
}
Car.run();
```

クラス変数を使用しないクラスは、メソッドを全部 static 化することで、Static クラスとして利用できます。（当然 new 不要）

# ss

class 構文には static メソッドを作成する機能もあります。Animal クラスに static な makeChild メソッドを作ってみましょう。

```
class Animal {
  // コンストラクタの定義
  constructor(name) {
    this.name = name;
  }
  // speakメソッドの定義
  speak() {
    console.log(this.name + "「鳴き声」");
  }
  // sleepメソッドの定義
  sleep() {
    console.log(this.name + "「zzz」");
  }

  static makeChild(parent) {
    return new this(`${parent.name}ジュニア`);
  }
}

var parent = new Animal("ポチ");
parent.sleep(); // ポチ「zzz」

var child = Animal.makeChild(parent);
child.sleep(); // ポチジュニア「zzz」
```

このように、クラスに対して定義された static メソッドはそのクラスオブジェクト自身のメソッドとなります。この例では Animal.makeChild としてこれを呼び出しています。static メソッドとして定義されているメソッドは組み込みオブジェクトにも結構あります（Array.from とか）ので、使う機会があることでしょう。
