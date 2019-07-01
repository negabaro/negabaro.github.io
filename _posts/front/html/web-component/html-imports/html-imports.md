link タグを用いて、JavaScript や CSS 等のリソースを html としてまとめて記載し、インポートすることが出来るようになります。

<link rel="import" href="component.html">
<title>Import Example</title>
<script src="script3.js"></script>
<script src="js/script1.js"></script>     
<script src="js/script2.js"></script>    
と記述すると、<link rel="import" href="component.html">の行でcomponent.htmlが展開され、index.htmlではscript1.js,script2.js,script3.jsがロードされます。 この時、component.html内の要素はDocumentTree内に展開される為、

document.querySelector('script')
等の記述で選択する事が出来ます。
https://tech.speee.jp/entry/2016/08/05/154253
ウェブ上で様々なリソースを読み込みたいとします。JavaScript であれば <script src>、CSS なら <link rel="stylesheet">、画像なら <img>、動画なら <video>、音声なら <audio> を使いますよね。ウェブ上のコンテンツのほとんどは、ロードするのに、シンプルで宣言的な方法が用意されています。しかし HTML をロードする場合はそういう訳にいきません。やり方としては：

<iframe> - 試して、実際に動きましたが、ちょっと重いですね。iframe のコンテンツは他のページのコンテキスト上に表示されます。大抵のケースでは用を足しますが、課題を残す場合もあります (フレームのサイズを縮めるのは面倒、JavaScript で操作するのもなかなかしんどい。スタイリングに至っては、ほとんど不可能です。)
AJAX - xhr.responseType="document" をするのは大好きですが、HTML をロードするのに JavaScript が必要というのでは、正しい方法とは思えません。
クレイジーハック™ - 文字列に埋め込んで、コメントとして隠す方法とか (例： <script type="text/html">)・・・どうなんでしょうね？
この皮肉が分かりますか？ ウェブの最も基本的なコンテンツである HTML を読み込むには、かなりの労力が必要なのです！ でも幸運な事に、Web Components を使えば、これを楽に実現することができます。

# まとめ

通常 HTML をテンプレート化するためにはサーバで行うか javascript でがりがり DOM を作り込んでやるのが一般的でした。
HTML Imports を使うことでサーバを通さずに HTML,javascript,CSS を一式テンプレート化するこができ、決まった形式を使い回すのにもとても便利に感じました。

### Reference Link:

https://tech.speee.jp/entry/2016/08/05/154253

http://ino-h.com/blog/2015/02/11/startup-html-imports.html

https://www.html5rocks.com/ja/tutorials/webcomponents/imports/

https://www.html5rocks.com/ja/tutorials/webcomponents/imports/
