慣例的に<link rel="import" href="x-element.html">な感じでロードされているけど、前提として、 HTMLImports である必要はない 。何故ならば、Web Components を構成する 4 つの仕様はそれぞれ独立しているからである。だから、インポートを使わなくても document.registerElement()でカスタム要素の定義は出来るし、HTML のひな形を使いたい場合に<template>タグを使っても良い。

https://qiita.com/1000ch/items/6665c2623ef8dcc8e5d5

```js
document.registerElement("monthly-report", {
  prototype: MonthlyReport
});
```
