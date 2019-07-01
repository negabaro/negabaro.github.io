# Map と Set

今まで配列と連想配列しか無かった世界にもついに Map と Set が来ました！
ただし、ほとんどのブラウザがまだサポートしてないので、polyfill をしてあげないといけません。

Map は連想配列よりデータのループが扱いやすいです。

```
const a = new Map([['a', 10], ['b', 20]]);
a.set('c', 30);

console.log(a.get('b'));// 20
a.delete('c');
console.log(a.has('a'), a.has('c')); // true, false
a.forEach((key, value) => {
  console.log(key, value);
})
```

https://qiita.com/peutes/items/bd6500ef082efa8a08ff
