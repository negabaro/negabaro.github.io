MutationObserverの使い方
Ajaxでデータを読み込んで表示させる場合、あらかじめHTMLに要素を追加するための「入れ物」を用意しておきます。

```html
<div id="target"></div>
```
MutationOberverを使って、要素が追加された後にJavaScriptの処理を実行するようにします。#targetへの子要素の追加を検知してJavaScriptを実行したい場合には、以下のように記述します。

```js
var target = document.getElementById('target');
function example() {

// 要素が追加された時に実行する処理

}
var mo = new MutationObserver(example);
mo.observe(target, {childList: true});
```
2〜6行目：DOMの変更時に実行する関数
7行目：MutationObserverのインスタンスを生成
8行目：observeメソッドでDOMの監視を開始

https://satoyan419.com/mutation-observer/
https://yoiyoy.wordpress.com/2016/11/22/mutationobserver/

MutationObserverでのDOMのスタイルの監視

https://qiita.com/sygw/items/921d2ffe240baf1dcc27


https://qiita.com/munieru_jp/items/a6f1433652124a2165e4