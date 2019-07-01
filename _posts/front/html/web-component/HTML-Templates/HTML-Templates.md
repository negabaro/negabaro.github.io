html テンプレートを定義する為の HTMLElement（タグ）の事です。 JavaScript から、テンプレート HTML をコピーしてページ要素を生成したい場合、 従来のやり方ですと、

<div stype='display:none;'>
//テンプレートを記述
</div>
であったり

<script type="text/template">
//テンプレートを記述
</script
というように実装していたところを、templateタグを利用して

<template id="sample-template">
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</template>
と記述する事が出来るようになります。 templateタグ内の要素は自律動作できないものとして扱われ、
スクリプトは実行されず、画像のロード等も行われる事はありません。

ドキュメントにも存在しないものとして扱われ、`タグ内の要素を複製する事で初めて有効`になります。

```js
var template = document.querySelector("#sample-template");
t.content.querySelector("img").src = "image.png";
var clone = document.importNode(t.content, true);
document.body.appendChild(clone);
```
