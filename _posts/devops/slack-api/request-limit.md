



公式ドキュメントを見た限りでは、Slack側のIPが公開されていないようなのでIP制限で不正アクセスを防止する方法は無いようです。代わりにSlackからのHTTPリクエストが正当なものであることを検証するための機能があります。
Verifying requests from Slack | Slack
https://api.slack.com/docs/verifying-requests-from-slack
上記の紹介の記事を https://qiita.com/namutaka/items/20951da3dddd1750af4a に記載したので詳細はこちらを参照してください。

なお、以前のVerification Tokenを使ったリクエストの検証方式は、非推奨になったようです。 ( https://api.slack.com/docs/token-types#verification )


https://qiita.com/namutaka/items/233a83100c94af033575