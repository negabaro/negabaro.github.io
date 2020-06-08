
---
layout: post
title:  "terraform backend 기능"
author: negabaro kim
tags: terraform
---

# backend란

どのようにstate file(いわゆる.tfファイル)を管理し適用するか定義するもの。
Backend typeとしてAmazon S3だけでなくAzure Storage、Google Cloud Storageなどのパブリッククラウドのオブジェクトストレージサービスやetcdやconsulなどの分散KVSとして使えるもの等が用意されている。

使うメリットとしては、単純にstate fileをリモートで一括管理できるというだけでなく、backendによってはリモートでの実行も可能にしてくれるらしい。

# 

terraform init するとmoduleやpluginと共にbackendの設定も行われる。


また、S3の中にまだtfファイルがない場合は、applyした際にkeyで指定した文字列をファイル名にtfファイルを作ってくれる。



```js
terraform {
  required_version = ">= v0.11.1"

  //backend "local" {}
  backend "s3" {
    region = "ap-northeast-1"
    bucket = "twice-tfstates"
    key = "terraform.tfstate.kim"
  }
}
```


## v0.8:
v0.8までは初回にterraformn remote configでバックエンドの設定を行っていました。しかしTerraformファイルに書くことができず、メンバーやプロジェクトが増えるたびに「バックエンドの設定どうやるんだっけ？」とハマることが結構ありました。

```js
$ terraform remote config \
    -backend=S3 \
    -backend-config="bucket=terraform-tfstate-bucket" \
    -backend-config="key=tfstate"
 
Remote configuration updated
Remote state configured and pulled.
```

## v0.9:
v0.9からは以下のようにTerraformファイルにバックエンドの設定ができるようになり、設定手順などを別途用意する必要がなくなりました。

```js
$ cat backend.tf
terraform {
  backend "s3" {
    bucket = "terraform-tfstate-bucket"
    key    = "tfstate"
    region = "ap-northeast-1"
  }
}
# terraform initで初期化または既存のtfstateと同期する
$ terraform init
Initializing the backend...
 
Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.
```

### State Locking
複数の環境から同時にterraform applyを実行してしまうと、意図せぬ変更になったりtfstateを壊してしまう可能性があるため、planやapplyを実行してる間、tfstateをロックする機能が追加されました。以下はS3をバックエンドにしてい場合の例です。S3がバックエンドの場合はDynamoDBを利用してState Lockを実装しています。
まず、State Lockの設定をする前にDynamoDBを作成しなければならないので、以下の設定でDynamoDBを作成します。RCU/WCUは1としています。
```js
resource "aws_dynamodb_table" "terraform-state-lock" {
  name = "terraform-state-lock"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"
 
  attribute {
    name = "LockID"
    type = "S"
  }
}
```
バックエンドの設定にlock_tableを追加します。値は先ほど作成したDynamoDBのテーブル名です。(v0.9.7からlock_tableはDeprecated、代わりにdynamodb_tableで設定します)

```js
terraform {
  backend "s3" {
    bucket     = "terraform-tfstate-bucket"
    key        = "tfstate"
    region     = "ap-northeast-1"
    lock_table = "terraform-state-lock"
  }
}
```
State Lockの設定を追加すると、バックエンド設定を変更したらterraform initせよとエラーメッセージが出力されます。

## Enhanced Backends
Enhanced Backends には以下の二種類があります.

local はデフォルトの Backend で明示的に path を指定しない場合にはカレントディレクトリに tfstate ファイルは保存されるようです. 以下は, 明示的に path の設定を行った例です.
```js
terraform {
  backend "local" {
    path = "relative/path/to/terraform.tfstate"
  }
}
```

### reference:
https://inokara.hateblo.jp/entry/2018/09/08/151804#Backends
https://dev.classmethod.jp/devops/terraform-changelog-from-v0-9-to-v0-11/
https://qiita.com/mashmash911/items/e8c05f580d07451fcf5e
https://www.terraform.io/docs/backends/index.html