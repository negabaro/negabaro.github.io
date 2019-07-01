# 例外 catch の罠

なお、残念なことに、Promise を使っても、非同期処理で throw された例外は catch 出来ません。
例えば、Promise 内で、setTimeout をして遅延させた例外 throw を送っても、catch する事が出来ません。
原因は try catch では非同期処理を catch 出来ないためです。JS の未来に期待しましょう orz

```
const a = new Promise((resolve, reject) => {
  setTimeout(() => {throw('err')}, 100);
}).catch(e => {
  console.error(e); // ここではキャッチされない
});
```
