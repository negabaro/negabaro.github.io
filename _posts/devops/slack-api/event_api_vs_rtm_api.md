
Event APIを使う方法です。
これは、Botアプリ側にSlackからイベント情報を受け取るwebhookのURLを実装し、それをつかってSlackとインタラクションする方式です。

Event APIを使う場合は、Slack Appの形式でbotを作成する必要があります。

実装の流れは以下のような感じです。

1. Slackからアクセスされるwebサーバーを作成して、インターネット上からアクセスできるようにする

2. 以下のページからSlack Appを新規に作成する
https://api.slack.com/apps

3. [Event Subscriptions]のページで、[Enable Events]を"ON"にする

4. Step.1で作成したwebhoook URLを [Request URL]に設定する

5. ここで設定したURLは、正当性の検証が行われるので、所定の返答をするようにアプリを実装しておく
詳細: https://api.slack.com/events-api#request_url_configuration__amp__verification

6. 所定の形式のJSONがSlackからPOSTされるので、それに対して適した内容をレスポンスすることで検証が成功する

7. [Subscribe to Workspace Events]のところで受け取りたいイベントの種類を設定する

8. この時点でEventを受け取る準備ができているが、Botとしてメッセージを送信するためにこの[Bot Users]ページでSlack AppにBotユーザを追加する

9. 最後に、このAppをBotを利用するworkspaceにインストールする

インストール時に、Step.6で設定したイベントに応じた認可確認が行われる
Slackからwebhookへのアクセスは、Slash commandのときと同様にリクエストの正当性を確認します。
Event APIはSlackからのイベントを受け取るのみの仕組みですので、Botからメッセージを送信するときは、WebAPIを使ってメッセージを送信します。


https://qiita.com/namutaka/items/233a83100c94af033575