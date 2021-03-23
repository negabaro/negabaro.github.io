git pull origin master

it pull origin masterが手癖になっている問題の対策として、origin/master だけで生活するというのは個人開発においては単に辛いだけなので除外すると、masterにいる時にgit pullだけでpullできるようにしておけば手癖にブランチ名も含まれないしpull元を間違えるリスクもないので全て解決するような気がしてきた
13:44
問題は、その設定が普通にcloneした時につくわけじゃないので、なんかgit push -u origin master (rake releaseの前にやらされる奴) とかしておく必要があって、それが面倒なくらい
13:46
[branch "master"]
        remote = origin
        merge = refs/heads/master
13:46
この設定が両方ないとできないように見える

koheisg  13:50
自分しかmasterにpushしない場合は、まぁpullしますけど、(でも自分しかpushしないならそもそもpullすることが少ない、まぁ今時はdependetabotとかで自分よりもbotが開発頑張ってくれてたりはする)
基本的にそういう場合でも、割とgit rebase origin/masterしてしまっていますね。(使用頻度は半々くらい)
ちなみにpullする場合も pull --rebaseになるようにgitconfigしてます。
pullする前に無駄なコミット積んでてもコンフリクトせずに先っちょにのるので気に入ってます。がっつりコンフリクトとか辛そうですけど。 （編集済み） 

inductor  13:51
ちなみにpullする場合も pull --rebaseになるようにgitconfigしてます。
これは私もやってます

k0kubun  13:51
「git pull origin master」か「git fetch と git rebase origin/master」を半々って感じですかね
13:51
僕もpullのdefaultはrebaseですね

inductor  13:51
規模が大きい前提だとそもそもベースブランチ細かく分けるべきって感じがしますね。
沢山の人で開発するときにみんなで同じブランチに向けてごちゃごちゃするのはそもそもアンチパターンな気がしています

はい、僕もそう思います
13:53
あくまで個人開発が結構多い人向けのワークフローということで

koheisg  13:54
git pullだけで自分の親ブランチに追随するような設定入れてるので、 (gitのいつぞやのバージョンから標準になった気もする。)
`origin master`の部分は省略できそう。

k0kubun  13:54
おー
13:55
(ちなみにgit pushはgpというオレオレaliasからやってて、これがcurrent branchを補完するので僕はpushでは問題になってないけど、git pullも略そうとするとgpになるのでそっちだけやらないままになってしまったという)

inductor  13:55
あ、そうなんだ
gitのいつぞやのバージョンから標準になった

alias pull='git pull origin $(git_branch)'
alias push='git push origin $(git_branch)'
これbashrcに入れてます

it pushで常に同名のブランチを使うなら git config --global push.default current しておくと、現在のブランチをpushできます。
:おすすめ:
1

14:06
- 作業するとき git fetch && git switch -c foo origin/master
- 追従するとき git fetch && git rebase origin/master foo
- 最新のoriginに移動するとき git switch -d origin/master
14:07
手元でmasterをorigin/masterに追従したいときは、 git fetch && git rebase origin/master master ってやってます。
稀に間違ってmasterにコミットしちゃっているときがあって、rebaseだと必ず変更が残るのでrebaseを多用してます。


バックグラウンドで定期的にgit-fetchしておくと便利
やってみたい

inductor  14:16
crontabで5分に1回とかべんりそう（？）

shishi  14:16
VSCodeには定期的に実行するオプションありましたね


ruby -e 'loop { system("git fetch"); sleep 60 }'