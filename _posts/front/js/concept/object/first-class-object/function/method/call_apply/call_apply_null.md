# 첫번째 인자에 있는 null뭐임??

第一引数は明示的に window を指定していましたが、undefined や null を指定すると、暗黙的にグローバルオブジェクトに変換されます。

もし呼び出したメソッドが non-strict mode 内の関数であれば、ここで渡した値が null もしくは undefined であった場合はグローバル・オブジェクトに置き換えられ、プリミティブ型の変数はボックス化されます。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

hoge.call(null, 'fuga');
