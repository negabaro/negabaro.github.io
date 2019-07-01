# getElementsByClassName で取得した要素のループ

さて、ES6 は JavaScript なので、当然 HTML 要素を使用することも多いでしょう。
配列が[...] で展開できるのを利用すると綺麗に書けます。

[...document.getElementsByClassName('class-name')].forEach(elm => {
elm.addEventListener('click', () => {
console.log('click');
});
})
（なお、余談ですが、カスタムイベントは EventEmitter が便利です。）

https://qiita.com/peutes/items/bd6500ef082efa8a08ff
