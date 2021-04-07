
# vue-loader의 역할

これを調べるのに vue-loader のソースを結構読んだ。

vue-loader は Vue.js の SFC 単一ファイルコンポーネント をコンパイルするために他のコンパイラ（xx-loader）へ橋渡しする役目を担ってるのかなとわかった。

SFC では HTML を書く template と JSで実装する script 、CSS を書く style と3つの領域それぞれで他の言語を使うことができる。

たとえば、template で pug を使ったり、
script で TypeScript を使ったり、
style で SCSS や SASS を使うことができる。

<template lang="pug">
</template>
<script lang="ts">
</script>
<style lang="scss">
</style>
それぞれコンパイラが違うのでそれを vue-loader さんは

"template は pug-loader!!"
"script は ts-loader!!"
"style は scss-loader!!"
と振り分けてくれている。

実は vue-loader のドキュメント Vue Component の仕様 を熟読するとそういうことが書いてある

---

vue-loader はファイルを解析し、それぞれの言語ブロックを必要に応じて他の loader を通し、最終的に module.exports が Vue.js のコンポーネントオプションオブジェクトの CommonJS モジュールに変換します。

と記載されていて、 vue-loader を介して ts-loader がコンパイルしてくれるらしいことが分かります。