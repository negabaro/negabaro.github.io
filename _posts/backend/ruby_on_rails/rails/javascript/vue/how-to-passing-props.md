
環境
Rails 6.0、Webpacker 4.0、Vue.js 2.6

1. URLのクエリーから取る
URLに/entries?foo=barのようなクエリー部があれば、JavaScriptだけで取り出せます。ここでは、qsライブラリを使います。/entries?entry[title]=bar のようなクエリーも処理できます。

$ yarn add qs
import qs from 'qs';
// 中略
let params = qs.parse(location.search.slice(1));
console.log(params.foo); // bar
この方法では、/users/123/entriesからuser_idを取り出す、といった場合が面倒になります。パスのパターンをいちいちJavaScript側に書かないといけません。

2. data属性とpropsを使う
追記：いろいろ勘違いしていたことがあったので、2.は修正しました（2019/11/10）。

ここからヒントを得ました：Passing Props to Vue in a Rails View - Devan Flaherty - Medium 。こちらも参照してください： new Vue(App) と new Vue({ render: h => h(App) }) の違い。

Railsのビューではdata属性で渡したいデータを指定します。

app/views/entries/index.html.erb
<%= content_tag :div, '', id: "entry-list", data: { user_id: @user.try(:id) } %>
Vueインスタンスを作る際には、renderを使い、propsにdata属性の情報を渡します（jQueryを使っています）。

app/javascript/packs/application.js
import EntryList from '../entry_list.vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#entry-list',
    render: h => h(EntryList, { props: $('#entry-list').data() })
  });
VueアプリのObjectにpropsを加えておけば、propsの名前を使って取り出せます。

app/javascript/entry_list.vue
<script>
export default {
  props: ['userId'],
  // 中略
  created() {
    let userId = this.userId;
  }
)
</script>
Vueアプリの独立性を気にしないなら、createdかbeforeMountで直接data属性の値を取ることもできます（mounted以降のサイクルではできません）。

app/javascript/entry_list.vue
<script>
export default {
  // 中略
  created() {
    let userId = $('#entry-list').data('userId');
  }
}
</script>
3. グローバル変数を使う
グローバル変数を使ったっていいじゃないか。

Railsでこうやって

app/controllers/application_controller.rb
  def shared_data
    @shared_data ||= {}
  end
  helper_method :shared_data
こうやって

app/views/shared/_shared_data.html.erb
<script>
var sharedData = <%= shared_data.to_json.html_safe %>;
</script>
こうやっておいてから （追記：Turbolinksだと実行されないことがあるので、headではなくbody内に入れる）

app/views/layouts/application.html.erb
<%= render 'shared/shared_data' %>
こうやって

app/controllers/entries_controller.rb
  def index
    @user = User.active.find(params[:user_id]) if params[:user_id].present?
    shared_data[:user_id] = @user.try(:id)
  end
Vueでこうします。

app/javascript/entry_list.vue
<script>
export default {
  // 中略
  created() {
    let userId = sharedData.user_id;
  }
}
</script>
Vueアプリケーションの独立性が落ちるのが気になるなら、グローバル変数を先ほどのpropsに渡す、という手もあります。

とここまで書いてから、グローバル変数をpropsに渡すのがベストな気がしてきました。






https://qiita.com/kazutosato/items/66bb6604bd680421101d
https://medium.com/@devanflaherty/passing-props-to-vue-in-a-rails-view-56e287be9c2d