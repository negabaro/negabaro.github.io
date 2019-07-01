実はこれらのタスクランナーを使わずとも、Node.js インストール時に付属する npm(Node Package Manager)を使用すれば、タスク処理が実現できます。

npm とは Node.js のモジュールを管理するためのツールであり、タスク処理には npm の機能の npm-scripts を使用します。Gulp や webpack は有用ですが、npm-scripts と併用することでさらに便利になります。本記事は npm-scripts を使ったタスク実行環境が構築できることを目標に解説します。

# そもそも npm-scripts とは何か？

npm-scripts とは、package.json ファイルに記述可能なシェルスクリプトのエイリアスです。エイリアスとはコマンド名を別のコマンド名に置き換えることです。以下の npm-scripts は Hello world!!を表示させるコマンドのエイリアスを作成する例です。

# postinstall コマンドとは npm install コマンドの終了時に実行されるコマンドです。

```json
{
  "scripts": {
    "build:ts": "tsc",
    "postinstall": "npm run build:ts"
  }
}
```

https://ics.media/entry/12226/

# gulp,grunt vs npm-scripts

## メリット

Gulp で実行するより処理速度が早い
使用可能な npm モジュールが豊富

## デメリット

複雑なタスクは行いづらい
npm-scripts だけで構築していると、scripts が大量増産されて package.json ファイルが読みにくくなる
シェルスクリプトの知識が必要

# Gulp のコード例

Gulp を例に解説しましょう。次の例は前章で作成した package.json のタスクを Gulp で置き換えたものです。

▼package.json ファイル

```json
{
  "scripts": {
    "build": "gulp build",
    "build:scss": "gulp build:scss",
    "build:ts": "gulp build:ts",
    "watch": "gulp watch",
    "watch:scss": "gulp watch:scss",
    "watch:ts": "gulp watch:ts"
  }
}
```

一見、エイリアスを介すことで煩わしくなったように思えますが、利点があります。

gulp コマンドをグローバルにインストールする必要がない
gulp コマンドのバージョンがプロジェクト毎に固定されるため、Gulp の大きな仕様変更にも左右されない
npm の知識だけあればタスクが実行できる
このように併用することで、より効率の良い環境をつくる事が可能です。Grunt の場合も同様です。
