
## heroku



## heroku 환경변수

https://qiita.com/chihiro/items/b8a3ef54716842dd115a
https://devcenter.heroku.com/ja/articles/config-vars

## dyno

Dynoとは Dynoとは、Herokuアプリケーションが実際に実行されるプラットフォームのことです。 その実体は、Amazon EC2の巨大インスタンス上で動作する軽量Linuxコンテナです。 ... Dynoは常にHerokuのDynoManagerによって監視されており、毎日1度は再起動されます。


## Bucketeer

HerokuでAmazon S3を利用するアドオン。別途AWSを契約したりIAMロールを作る必要がない
現在は使用していないが、患者の薬の画像をアップロードする機能で使用予定

## Heroku Postgres
RDBのPostgreSQL、HerokuにはPostgreSQLを自社のAddon、バックアップやフェールセーフの仕組みが簡単に構築できる
現在はHobbyプランの低用量の無料版のみ利用している
RailsのRDBはこれを利用している

local에서 production postgres에 바로 접속됨
ip제한 하는 방법은?


## Heroku Redis
RedisのHerokuのAddon
ActiveJobでプッシュ通知を遅延実行するのに利用している

## Mailgun
メール送信SaaS
同様の機能でSendGridの方がAddonとしてもメジャーだが2020年のSendGridの仕様変更にHeroku側が追いついておらずうまく接続できなかったのでこちらを利用。将来的にはSendGridにしてもよいだろう

## New Relic
APM、アプリケーションの遅いところをリストアップするSaaS。無料版でもある程度わかるので便利
Rails側でNew Relic用のGemをまだ入れていないので機能していない

## PaperTrail
ログ保存・監視用のSaaS、リアルタイムで正規表現でログを探すこともできる
Herokuのデフォルトのログを見る機能は使いにくいのでこちらを使うと良い

## Heroku Scheduler
rakeタスクなどを定期実行させるSaaS、crondと同じようなものだが、実行タイミングの種類cronより少なく、10分ごと、1時間毎、毎日程度
Firebase Authenticationと通信するために認証情報を更新するrakeタスクを実行している
https://docs.google.com/document/d/1xkmcAlSQ9EzSJbWtLb3AixdJwTlnC85ZCYDxDVhqb54/edit# 

---

[herokuで本番環境までを構築する上で知っておきたいこと]: https://qiita.com/undrthemt/items/1f49cc2bc9aabeb35a4c