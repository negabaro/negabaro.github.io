모든 모듈에서 사용할 수 있게 해당 모듈을 변수로 변환

```js
new webpack.ProvidePlugin({
  $: "jquery"
});
```
