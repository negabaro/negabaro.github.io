## pry-stack_explorer

Pryは超便利だけど、単体ではデバッガとしての機能やスタックを追う機能はあります。デバッガの機能はpry-debuggerで使えるようになりました。

スタックトレースを見たい場合はpry-stack_explorerというgemを導入する必要があります。それにしてもアンダースコアとダッシュを混ぜた名前を付けるなんて、、、！

pry/pry-stack_explorer

pry-stack-explorerをrequireした状態でbinding.pryによりPryを起動したとき、次のコマンドが使えるようになります。

down Go down to the callee’s context.
frame Switch to a particular frame.
show-stack Show all frames
up Go up to the caller’s context.
show-stackでスタックトレースがわかるし、up/downでコンテキストの移動ができたりします。Pryという強力な環境でスタックトレースまでできるので、ライブラリの挙動を調べたりデバッグするのによさそう。

---

https://blog.piyo.tech/posts/2014-05-16-200000/

[pry-stack_explorer]: https://github.com/pry/pry-stack_explorer