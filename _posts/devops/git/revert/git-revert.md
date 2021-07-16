## revert

特定のコミットを取り消す
$ git revert <commit>
コミットIDを指定することで、そのコミットを打ち消すようなコミットが新しく追加されます。
コードは、そのコミットがなかったときの状態になります。
revertコマンドを実行するとエディタが開き、コミットメッセージを編集することができます。

コミットメッセージ編集
revertコミットを行なうときに、コミットメッセージの編集を行なうかどうかをオプションで指定できます。

コミットメッセージを編集する(オプションを何も付けない場合はこちらになります)

$ git revert <commit> -e 

or

$ git revert <commit> --edit
コミットメッセージを編集しない(エディタを開かない)

$ git revert <commit> --no-edit

---

https://qiita.com/chihiro/items/2fa827d0eac98109e7ee