
---
layout: post
title:  "Rails6.0 datadog로 로그 관리"
author: negabaro kim
categories: rails infra
tags:	rails
---


# mac osx에 agent인스톨

서버 기동
레일즈 기동


# ddtrace

次に、アプリケーション側でAgentにデータを飛ばすための設定を行います。

gem ddtrace をインストールします

[Gemfile]
gem 'ddtrace'
configファイルに転送先や内容を設定します。

[config/initializers/datadog-tracer.rb]
Datadog.configure do |c|
  c.tracer enabled: true, env: development
  c.use :rails
end
Dockerを使ってアプリケーションを立ち上げている場合や、AgentをDockerで立てていたり、他の場所に設置している場合は hostname: の指定が必要です。

正しくDatadogへ監視データが飛ばせていると、ログイン後のAPM>Serviceの画面に対象サービスが表示され、内容が確認できるようになります。

# lograge 도입



# datadog에서 status가 info만 표시되는 문제



# lograge 커스텀



# logger.error사용하면 datadog에 전송안되는 문제

datadogで整形する方法ではないですが、
firelensでjson parser設定を見つけたので
試しに設定していただいてもよろしいでしょうか？
https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json
今のtask defで

```json
"firelensConfiguration": {
        "type": "fluentbit",
        "options": null
      },
```

のoption: nullなってる部分を
以下のように修正すれば動くようです。

```json
 "options": {
        "config-file-type": "file",
        "config-file-value": "/fluent-bit/configs/parse-json.conf"
    }
```

datadog에서 nested json하는 방법도


https://docs.datadoghq.com/ja/logs/processing/parsing/?tab=matcher



### reference:


https://qiita.com/amanekey/items/b921ef73d871dac299eb
https://www.datadoghq.com/ja/blog/managing-rails-application-logs/

# 메모1. datadog쪽 표시커스텀
https://docs.datadoghq.com/ja/logs/processing/processors/?tab=ui#%E3%83%AD%E3%82%B0%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%83%AA%E3%83%9E%E3%83%83%E3%83%91%E3%83%BC

# 메모2. 슬랙에 통지


https://engineer.crowdworks.jp/entry/2017/03/03/174731

# 메모3. APM 퍼포먼스체크

https://developer.kaizenplatform.com/entry/sho_tokuda/2018-08-01