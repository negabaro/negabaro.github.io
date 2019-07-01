Vue.js からはじめる JS フレームワーク
この資料は 2017/04/24 開催の勉強会「Vue.js からはじめる JS フレームワーク」用の資料です。

イベント詳細
【勉強会】Vue.js からはじめる JS フレームワーク（ハンズオン形式） - サポーターズ CoLab

進め方
handson.html というファイルがあるので、このファイルをダウンロードし下記お題に沿って追記していってください。

ハンズオン
Hello World

<script> タグ内で Vue インスタンスを生成します。

慣習として変数名に vm （ViewModel の略） を使います。

<script type="text/javascript">
var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello World'
    }
});
</script>

HTML 側で {{ }} を用いることで変数を展開できます。

<div id="app" class="container">
    {{ message }}
</div>
ブラウザで handson.html を開き、 'Hello World' と表示されている事を確認してください。

なお、コンソールから Vue インスタンスのプロパティを書き換えると、表示内容も更新されます。

vm.message = 'Hello Vue'
配列の要素の描画
v-for ディレクティブを使うことで配列の要素を描画することができます。

<script type="text/javascript">
var vm = new Vue({
    el: '#app',
    data: {
        users: [
            {name: 'Alice'},
            {name: 'Bob'},
            {name: 'Carol'}
        ]
    }
});
</script>
<div id="app" class="container">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td>{{ user.name }}</td>
            </tr>
        <tbody>
    </table>
</div>
画面上で要素の追加入力
配列の内容を変更すると連動して表の内容も再描画されます。

上記の状態でブラウザのコンソールから配列に要素を追加してみましょう。

vm.users.push({name: 'Dave'});
これを利用して入力フォームから要素を追加入力できるようにします。

v-model ディレクティブ
Vue インスタンスのプロパティと <input> 要素の入力内容を結びつけるには v-model ディレクティブを使用します。

まず、data プロパティに下記を追加します。

<script type="text/javascript">
var vm = new Vue({
    el: '#app',
    data: {
        users: [
            // 略
        ],
        // 下記を追加
        newUserName: ''
    }
});
</script>

そして、HTML 側に <input> 要素を追加します。

<div id="app" class="container">
    <table class="table table-striped">
        <!-- 略 -->
    </table>
    <!-- 下記を追加 -->
    <input v-model="newUserName">
</div>
この状態で、試しに何か入力した状態でコンソールから newUserName プロパティの値を確認してみてください。

vm.newUserName
また、newUserName プロパティを別の値で上書きすると <input> 要素の内容も連動することを確認してみてください。

vm.newUserName = 'Dave'

https://github.com/okashoi/vue-js-handson
