セッション（session）とは
sessionというのは、前述の通りログインしたあと、ページ遷移しても再度ログインを行わなくても良いように、「ログインしている」ことを記憶しておく機能のことです。

そもそも、インターネットを支えているプロトコルであるHTTPは、ステートレスなものです。

ステートレスというのは、ステート（State：状態）レス（less：～がない）ですので、状態を記憶しておらず、ただリクエストに対するレスポンスだけで処理するというものです。

つまり、HTTPは、同じリクエストに対しては、常に同じレスポンスを返すというのが、基本的な動作なわけです。

インターネット黎明期であればそれで十分だったかもしれませんが、今ではステートレスなサイトの方が珍しく、ユーザーに合わせた動きをするのが、一般的でしょう。

そんな、「アクセスした人が過去に行った操作履歴」を「状態」として保持し、それに合わせてレスポンスを返すステートフル（Stateful）な動きを実現するためのしくみの1つがセッションなのです。
※なお、広義には、このしくみ全体をセッションと呼びます。しかし、狭義には、「状態を保持している」ということをセッションと呼び、「セッションを管理する」、「セッションを切る（消す）」などと言うこともあります

セッションには、ログインしたユーザーの「ID」と「ログイン履歴」が保持されています。そして、任意のタイミングでその記録を呼び出すことができるのです。

そのため、ユーザーがアクセスしたときにその記録を確認することで、「すでにログイン済み」であれば、ログイン処理をスキップさせるといったことを行うことができるようになります。