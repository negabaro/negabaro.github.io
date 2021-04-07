Dispatch

こんな感じで手元から試すことができます

$ curl -vv \
    -H "Authorization: token ${{ secrets.REPO_GITHUB_TOKEN }}" \
    -H "Accept: application/vnd.github.everest-preview+json" \ 
    "https://api.github.com/repos/okitan/actions-sandbox/dispatches" \
    -d '{"event_type": "build", "client_payload": {"hoge": "fuga"}}'
repository dispatch event を受け取る action
https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#external-events-repository_dispatch

です。
12月28日現在、types（event_typeを指定する機能のことと予想）はサポートしてないとドキュメントに書いてありますが、普通にtypesでfilterしてくれるようになってます。

Communityのproposalにも返答ないみたいだし、つい最近実装された機能なのでしょうか？

こんな感じで repository_dispatch を使うとよいと思います。
こうすることで、普段のactionsを簡単にAPI経由で起動できるようになって非常に便利だと思います。

ただし master ブランチに対して event が発行されてしまうので、 branch に対して実行するには、client_payload を使って branch を指定しておいて checkout を頑張るとか工夫が必要になります。

name: build

on:
  repository_dispatch:
    types: [build]
  push:
    branches:
      - master
event_type にアクセスする
types で filtering できるために多くの場合不要かと思うのですが、
以下のように何故か action という名前で取得できます。

  steps:
    - run: echo "${{ github.event.action }}"
client_payload にアクセスする
普通に github event context から取得できます。

  steps:
    - run: echo "${{ toJSON(github.event.client_payload) }}"
repository dispatch event を簡単に送る Github Actions
そもそも、なくてもまぁ curl 叩くだけなのでそんなに難しくはないとは思いますが、あるものは使ったほうが楽になるので、使うといいと思います。

https://github.com/marketplace/actions/repository-dispatch

まとめ
repository dispatch event を利用することで、
外部システムからのAPI連携以外にも、
github actions内から動的なworkflowの制御ができるようになります。

よりはかどりますね。

https://github.com/marketplace/actions/repository-dispatch


https://qiita.com/okitan/items/88994a36c996f2397a07