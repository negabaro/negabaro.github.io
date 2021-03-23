そうか、世の中はもう switch や restore なのか…
1 件の返信
チャンネルにも投稿済

sinsoku  6日前
git switch -d で手軽にdetached headに移動できることを知ってから、switchを使うようになりました！


inductorという方がブログにcheckoutとswitch/restoreの対応表を書いてくれてますよ
https://blog.inductor.me/entry/git-checkout-deprecation

git cloneしたらgit branch --set-upstream-to=origin/master masterを自動でやりたいということだけが望みで、これはbranch.autoSetupMerge = always (か true) のことっぽいけど、手元のgitではそれの設定に関わらずそうなる (でも以前cloneした奴はそうなってない) ので迷宮入りしました