dule_function と密接に関連するモジュール関数について改めて確認してみました。

モジュール内で定義されたメソッド（以下モジュールメソッドと呼びます）は、そのモジュール自身の内部や、モジュールを include した場所（クラスなど）で呼び出すことができます。

しかしモジュールメソッドは、そのままではモジュールの外部に公開されていない（デフォルトで private）ので、モジュール名.メソッド名の形で外部から呼び出すことはできません。

モジュールメソッドを外部に公開するには module_function が必要です。公開したいモジュールメソッドはシンボルで与えます。

### Reference Link:

```
https://qiita.com/mtsmfm/items/81823d40cf1f520cdeb5
https://www.ruby-forum.com/t/class-self-vs-extend-self/220944/2
https://qiita.com/ionis_h/items/5f26248ea4e154cce424
```

edu.goorm.io
