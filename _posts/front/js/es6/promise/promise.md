Promise のメソッド内では、正常終了のレスポンスを resolve、異常終了のレスポンスを reject で返すことができ、
それを次の then メソッドで受け取れます。
また、then メソッドの return による返り値は、次の then メソッドで受け取れます。
Promise 内のエラーは、catch で受け取れますし、その後に then メソッドを繋ぐことも出来ます。

それぞれ繋ぎとして変数や関数の返り値として返すことも当然出来、チェーンメソッドとして連結できます。

```
const a = new Promise((resolve, reject) => {
  resolve({res:true});
}).then(({res}) => {
  // thenの中でPromiseを作って、返すことで、結果を繋ぐことが可能
  return new Promise((resolve, reject) => {
    reject('error');
  });
});

return a.then(res => {
  console.log(res);
}).catch(e => {
  console.error(e);
});
```
