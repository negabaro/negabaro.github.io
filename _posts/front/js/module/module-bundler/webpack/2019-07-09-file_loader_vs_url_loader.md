ue-cli에서 vue-cli build하면

assets밑에 있는 xx.png이미지가 dist디렉토리에 생기지 않는데

｀｀｀background: url("~@/assets/xx.png")｀｀｀ 
이런식으로 참조하면 data url형식으로 참조가 가능합니다.

이건 원래이런건가요?

Euiseok Ryu  [17分前]
저도 그렇더라고요. 아마 webpack이 빌드하면서 ~2KB 이하 이미지들은 인라인으로 집어 넣는것 같아요

留意すること
スコープ付きスタイルでは class は必要です。 ブラウザが様々な CSS セレクタを描画するため、p { color: red } はスコープされているとき何倍も遅くなります（すなわち属性セレクタと組み合わせた場合）。もし .example { color: red } のように class か id を使用するなら、パフォーマンスヒットは事実上なくなります。この例で違いをテストすることが出来ます。
再帰されたコンポーネントの子孫セレクタには気をつけてください！ セレクタ .a .b を持つ CSS ルールの場合、.a にマッチする要素に再帰的な子コンポーネントが含まれている場合、その子コンポーネントのすべての .b はルールにマッチします。
https://vue-loader-v14.vuejs.org/ja/features/scoped-css.html
利点の全ては次の通りです:

file-loader はアセットファイルのコピー先や配置先を制定したり、バージョンハッシュを利用してキャッシングを改善する方法を指定する事が出来ます。さらに、これは、単にあなたの * .vue ファイルの隣にイメージを置くことができ、配備するURLを心配するのではなくフォルダ構造に基づいて相対パスを使用することを意味します。
url-loader は、指定されたしきい値よりも小さい場合、条件付きでファイルを base-64 データ URL としてインライン化することができます。これにより、単純なファイルに対する HTTP リクエストの量を減らすことができます。 ファイルがしきい値より大きい場合、自動的に file-loader にフォールバックします。
https://vue-loader-v14.vuejs.org/ja/configurations/asset-url.html


file-loader vs url-loader나루호도

url-loader면 바로 인라인!!

http://jeonghwan-kim.github.io/js/2017/05/22/webpack-file-loader.html

