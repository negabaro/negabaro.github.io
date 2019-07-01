プロトタイプの終端
先程、普通のオブジェクトは Object.prototype を持つと述べました。

var ordinaryObj = {};

console.log(Object.getPrototypeOf(ordinaryObj) === Object.prototype); // true
もちろん、Object.prototype それ自体も、いくつかのプロパティを持っていることから分かるようにやはりオブジェクトです。では、Object.prototype のプロトタイプは何でしょうか。

console.log(Object.getPrototypeOf(Object.prototype)); // null
これをやってみると、null になります。つまり、Object.prototype はプロトタイプを持たない例外的なオブジェクトなのです。

プロトタイプを持たないオブジェクトに対してプロパティを探してもなお存在しなかった場合、undefined が返ります。JavaScript の挙動として有名である「オブジェクトの存在しないプロパティにアクセスすると undefined が返る」というのは、実は「オブジェクト自身のプロパティを探す → 無いので Object.prototype のプロパティを探す」→「それでも無いので undefined を返す」という段階を踏んでいることが分かりますね。

このようなプロトタイプを持たないオブジェクトは Object.create を使って自分で作ることもできます。そのためには Object.create(null)とします。

var noPrototypeObj = Object.create(null);

noPrototypeObj.foo = 3;

console.log(noPrototypeObj.foo); // 3
console.log(noPrototypeObj.hasOwnProperty); // undefined
このオブジェクトは先ほど説明したとおり、自身が持っているプロパティ以外には全て undefined を返します。普通のオブジェクトは hasOwnProperty などの Object.prototype が持っているプロパティ全てを間接的に持っていましたが、プロトタイプが無いオブジェクトはそのようなプロパティすら持っていません。

このようなオブジェクトは、オブジェクトを本当に連想配列として使いたい場合に適しているという説もあります。

https://qiita.com/uhyo/items/ab8e273e1eb71d02e29a
