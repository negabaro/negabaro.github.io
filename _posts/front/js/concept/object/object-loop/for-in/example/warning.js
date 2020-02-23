//for-inの注意点
//for-in文はオブジェクトに含まれる列挙可能なプロパティを全て取り出します。なので、予期せぬプロパティの参照などが起こる場合があります。

//例えば、以下のように配列オブジェクトにtypeというプロパティを追加すると、配列の要素だけでなく、追加されたプロパティまで取り出してしまいます。
var array = [1, 5, 9];
array.type = "number";
for (var name in array) {
  console.log(name); // => 0, 1, 2, type
}

//このようなプロパティの追加には注意するべきでしょう。
//http://www.ituore.com/entry/javascript-for#for-in%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9

//オブジェクトにおける列挙可能(enumerable: true)な「直属のプロパティ名」「プロトタイプ上のプロパティ名」を繰り返し取得します。
//このプロトタイプ上のプロパティを取得する挙動が問題になるケースが多々あります

Object.prototype.c = 3;
var object = { a: 1, b: 2 };

for (var key in object) {
  console.log(key); // "a" -> "b" -> "c"
}

//https://qiita.com/think49/items/0c5ea1c9e2545fa2eed2
