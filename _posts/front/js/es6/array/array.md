[]でくくります。詳しくは下のページを見れば十分なので割愛します。
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array

が、map と forEach だけは説明します。この 2 つがあるため、ES6 では for 文はほとんど使いません。
共にループをしますが、map は値を返す、forEach は値を返さないという違いがあります。

```
const a = [1,2,3,4,5];
let b=0;
a.forEach(i => {b += i})
const c = a.map(i => i*2)
console.log({b, c});
console出力

Object {
  "b": 15,
  "c": Array [2, 4, 6, 8, 10]
}
```

また、ES6 の配列は...で展開できます。

```
console.log([...[1,2,3], ...[4,5,6]]); // [1,2,3,4,5,6]
```

https://qiita.com/peutes/items/bd6500ef082efa8a08ff
