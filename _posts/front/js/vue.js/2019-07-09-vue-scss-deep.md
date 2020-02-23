vue scss deep	https://vue-loader-v14.vuejs.org/ja/features/scoped-css.html


ただ、 <style lang="scss" scoped> した時にうまくあたらなかったのでメモ。

そんな時は /deep/ コンビネータを使う
SASS のようなプリプロセッサは >>> をうまく解析できないため、エイリアスになっている /deep/ を代わりに使います。

https://qiita.com/tscp/items/50b91ec583ae80aebac0

Vuejsでコンポネント内のCSSを親コンポネントから変更したい場合はdeep selectorを使おう


https://qiita.com/kotamat/items/0899ca5936601390e123


https://qiita.com/tscp/items/50b91ec583ae80aebac0