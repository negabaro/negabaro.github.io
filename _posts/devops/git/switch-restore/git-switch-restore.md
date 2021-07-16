## switch


さて、本題の新コマンドです。

まず、新しくローカルにブランチを作成する際には今までですとgit checkout -b hogehogeとしていました。

これを新コマンドを用いるとこのようになります。

$ git switch -c hogehoge
checkoutがswitchに変わり、-bが-cに変わります。
ちなみに-cは--createの略です。

また、作業するブランチを切り替える時ですが、
今までgit checkout master としていましたが

$ git switch master
とすれば切り替えることができます。

## restoreコマンド

今まで自分はローカルで行ったコミット前の修正を取り消す際に、git checkout . や git checkout hogehogeといった形でcheckoutコマンドを使用してきました。

予想がついているとは思いますが、これらをrestoreコマンドで行うと、下記のようになります。

$ git restore .
$ git restore hogehoge
こちらも単純にcheckoutをrestoreに置き換えるだけです。

---

https://qiita.com/rebi/items/5a23f8cf904271bb5452