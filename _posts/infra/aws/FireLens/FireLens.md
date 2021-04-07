

ログを出力している側の logConfiguration の options に設定を追加することで、動的に [OUTOPUT] レコードを追加してくれるようです。

例えば Fluent Bit の Datadog output プラグインをアウトプットとして使用する場合は

[OUTPUT]
    Name        datadog
    Match       *
    Host        http-intake.logs.datadoghq.com
    TLS         on
    dd_service  my-service
のような設定が必要ですが、

    "logConfiguration": {
        "logDriver":"awsfirelens",
            "options": {
                "Name": "datadog",
                "Host": "http-intake.logs.datadoghq.com",
                "TLS": "on",
                "dd_service": "my-service",
             },
        }
    }
のように logConfiguration を設定することで同じ設定が動的に生成されるようです。

https://yasuharu519.hatenablog.com/entry/2019/12/19/142454


CloudWatch Logへのログ出力のようにアプリケーションコンテナから直接ログをログ出力先に送信するのではなく、タスク内に「FireLensコンテナ」を追加して、FireLensコンテナ経由でログを送信する仕組みです。(いわゆる「サイドカー」構成ですね)

https://dev.classmethod.jp/articles/ecs-firelens/



https://www.datadoghq.com/ja/blog/collect-fargate-logs-with-firelens/


FireLens Example: Parsing container stdout logs that are serialized JSON
As of AWS for Fluent Bit version 1.3, an external configuration file is not needed to parse JSON. The config shown in extra.conf is included in the image. Simply reference it in your FireLens configuration:

