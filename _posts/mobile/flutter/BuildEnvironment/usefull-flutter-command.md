
## Flutter커맨드 정리

はじめに
Flutterのコマンドラインについてのまとめです。

Android StudioやVSCodeを使えば、普段はあまりコマンドを使うことが無いかもしれませんが…、個人的にはGUIで操作するよりもコマンドで操作した方が素早くて効率が良いです。

随時更新します！メジャーなものは網羅出来ていると思いますが、抜けているものがあればコメント下さい。プラグイン, テスト系はこれから充実させます。

Flutter環境セットアップ
## flutter precache
FlutterのSDK内部では必要なデータをGoogleのインフラサーバーから必要なタイミングでダウンロードしていますが、それを意図的に行うためのコマンドです。普通のユーザは基本的に利用する必要がありません。

## flutter doctor
インストールバージョンやインストールされてないものが無いかなど、Flutter環境診断をしてくれます。
Flutter実行出来なくなったなど、困ったらまずこれをやってみると良いです。

さらに-vオプションをつける事で詳細情報を確認できます。

$ flutter doctor -v
$ flutter --version
現在のSDKバージョンを確認するときに利用します。flutter doctorは時間が少しかかるので、バージョンだけ調べたいときはこれを使います。

$ flutter --version
Flutter 1.23.0-4.0.pre • channel dev • https://github.com/flutter/flutter
Framework • revision 83dd176777 (12 days ago) • 2020-09-22 12:04:44 -0700
Engine • revision 2abe69c608
Tools • Dart 2.10.0 (build 2.10.0-136.0.dev)
$ flutter upgrade
現在のチャンネルの新しいバージョンにアップデートする時に利用します。

## flutter downgrade
現在のチャンネルの一つ前のバージョンにダウングレードする時に利用します。

$ flutter downgrade       
Downgrade flutter to version 1.22.0-12.0.pre
? [y|n]: y
$ flutter version
非推奨のコマンドで将来削除される予定とのことですが、任意のバージョンを指定してダウングレード出来ます。ただし、これを使うと通常のチャンネル（master, devなど)とは異なり、gitコマンドの特定のバージョンをcheckoutするイメージになるので、元の状態に戻るには$ flutter channel stableなどのコマンドを利用する必要があります。

バージョン一覧を確認
$ flutter version       
[!] The "version" command is deprecated and will be removed in a future version of Flutter. See
https://flutter.dev/docs/development/tools/sdk/releases for previous releases of Flutter.

1.25.0-8.1.pre
1.26.0-1.0.pre
1.22.5
1.25.0-8.0.pre
1.25.0-4.0.pre
1.24.0-10.2.pre
1.24.0-10.1.pre
1.22.4
1.24.0-7.0.pre
1.22.3
〜（略）
特定のバージョンに変更
$ flutter version 1.22.4
[!] The "version" command is deprecated and will be removed in a future version of Flutter. See
https://flutter.dev/docs/development/tools/sdk/releases for previous releases of Flutter.

╔══════════════════════════════════════════════════════════════════════════════╗
║ Warning: "flutter version" will leave the SDK in a detached HEAD state.      ║
║ If you are using the command to return to a previously installed SDK version ║
║ consider using the "flutter downgrade" command instead.                      ║
╚══════════════════════════════════════════════════════════════════════════════╝


Are you sure you want to proceed? [y|n]: y

Switching Flutter to version 1.22.4
Downloading engine...
〜（略）
$ flutter channel
現在利用しているFlutter SDKのチャンネルを確認します。

## flutter channel 
Flutter channels:
* master
  dev
  beta
  stable
チャンネルには以下があります。

チャンネル名	内容
master	githubのマスターブランチ。不安定な可能性がありますが、最新を使う場合はこれ
dev	masterに対して自動テスト等をパスした一定品質が担保されているもの (α版相当, Windows/macOS/Linux版はここに含まれる)
beta	ベータ版機能が有効になったもの。例えばWebプラットフォームなど
stable	正式リリースのステーブル版。普通の開発者はこれを利用
$ flutter channel チャンネル名
オプションで指定したチャンネルに変更されます。

例.betaチャンネルに切り替え
$ flutter channel beta
$ flutter devices
Flutterアプリとして実行可能なデバイス一覧を確認できます。
Android/iOSエミュレータの場合は、事前に立ち上げた状態でなければ表示されません。

## flutter devices
2 connected devices:

Android SDK built for x86 • emulator-5554 • android-x86 • Android 10 (API 29) (emulator)
macOS                     • macOS         • darwin-x64  • Mac OS X 10.15.3 19D76
$ flutter config
~/.flutter_settingsに設定ファイルがあり、これを更新するコマンドです。ファイルを直接編集も可能です。
一度設定したらその後はほぼ触る事が無いと思いますが。
※Windows/Linux/macOSを有効にしておくと、新規プロジェクト作成時にそれら向けのディレクトリが作成されます。

## Flutter-Webを有効化
$ flutter config --enable-web
Flutter-Desktop-Linuxを有効化
$ flutter config --enable-linux-desktop
Flutter-Desktop-macOSを有効化
$ flutter config --enable-macos-desktop
Flutter-Desktop-Windowsを有効化
$ flutter config --enable-windows-desktop
プロジェクト作成




## flutter create
Flutterプロジェクト新規作成時に利用します。大体以下で足りるかと思います。
オプションの最後に出力先のディレクトリ名を指定します。

オプション	内容
-t, --template=	app, module, package, pluginのいずれかを指定。デフォルトはapp
--org	オーガナイゼーションを指定。デフォルトはcom.example
--project-name	Flutterプロジェクト名を指定
-i, --ios-language	iOS向けプラットフォーム側のコードの言語でobjc, swiftのいずれかを指定。デフォルトはswift
-a, --android-language	Android向けプラットフォーム側のコードの言語でjava, kotlinのいずれかを指定。デフォルトはkotlin
--description	プロジェクト説明文。デフォルトは"A new Flutter project."
$ flutter create -t app --org com.hoge --project-name ¥
                 example -i swift -a kotlin ¥
                 --description "Example Flutter project." ¥
                 ./example_app
また、一度プロジェクトを作成後、そのプロジェクトディレクトリで$flutter create .を実行する事で、現在有効なプラットフォームandoid/, linux/など、足りていないのテンプレートだけ生成してくれるようです。

## flutter clean
ビルド時に生成されるファイル群のクリーン (削除) 時に利用します。
buildと.dart_toolディレクトリを削除してくれます。

## プラグイン

### flutter pub get
pubspec.yamlを更新したら実行するやつです。プラグインのライブラリなどを取得したり更新します。

### flutter pub deps
ライブラリの依存関係をツリーで表示してくれます。

ビルド
## flutter build xxx

--flavor で schemaを切り替える
--debug と --release でConfigurationsの名前を切り替える
--dart-define=app.flavor でFlutter内のコードを切り替える


### --no-codesign

証明書とプロビジョニングプロファイルがないので、--no-codesign つけないとだめですね。

flutter build ios --debug --no-codesign
$ flutter build apk --debug
iOSでDebugするときには --no-codesign つけないとsigningが走ってそこでコケてしまうことがあるっぽい

---


ターゲット環境 (xxx) を指定してビルドだけ行います。成果物は./build/xxx以下に生成されます。デフォルトはリリースモードでのビルドになります。

オプション	内容
aar	AAR？何用？
aot	DartコードのAOTビルド(マシン語)。いつの間にか削除された様子です。
apk	Android APKファイル
appbundle	Android App Bundleファイル
bundle	Flutterのフォントや画像等のバンドルのビルド(flutter_assetsディレクトリ以下, DartのJIT用バイトコード)
iso	iOS向けビルド
ios-framework	.framework向けビルド
web	Webアプリ向け
macos	macOSデスクトップ向け(デフォルトはリリースモードでのビルド)
linux	Linuxデスクトップ向け(デフォルトはリリースモードでのビルド)
windows	Windowsデスクトップ向け(デフォルトはリリースモードでのビルド)
--target-platformオプション
以下のように、ターゲットアーキテクチャを指定してビルドすることが可能です。

$ flutter build apk --target-platform=android-arm64
--analyze-sizeオプション
--analyze-sizeオプションを付けることで、ビルド成果物のサイズ情報を確認することが可能です。

$ flutter build macos --analyze-size
Building macOS application...                                           

  sample.app                                                               35 MB
  sample.app/
    Contents/
      _CodeSignature                                                        9 KB
      MacOS                                                                66 KB
      Resources                                                           246 KB
      Frameworks                                                           34 MB
      Dart AOT symbols accounted decompressed size                          3 MB
        package:flutter                                                     2 MB
        dart:core                                                         306 KB
        dart:typed_data                                                   221 KB
        dart:ui                                                           191 KB
        dart:async                                                        115 KB
        dart:collection                                                   110 KB
        dart:convert                                                       58 KB
        dart:isolate                                                       40 KB
        dart:io                                                            38 KB
        package:vector_math                                                33 KB
        dart:developer                                                     10 KB
        package:typed_data/
          src/
            typed_buffer.dart                                               7 KB
        package:collection/
          src/
            priority_queue.dart                                             5 KB
        dart:math                                                           4 KB
        dart:ffi                                                            4 KB
        package:sample/
          main.dart                                                         3 KB
        dart:vmservice_io                                                   2 KB
        dart:mirrors                                                       668 B
        dart:nativewrappers                                                382 B
        Never                                                               63 B
      Info.plist                                                            2 KB

A summary of your macOS bundle analysis can be found at: /Users/kurun/.flutter-devtools/macos-code-size-analysis_01.json

To analyze your app size in Dart DevTools, run the following command:
flutter pub global activate devtools; flutter pub global run devtools --appSizeBase=macos-code-size-analysis_01.json
アプリ実行
flutter runコマンドを利用することでビルドからインストール、実行まですべて行ってくれます。


## flutter run
プロジェクトのディレクトリ直下で実行するとdevicesに見えているターゲット (Android/iOS優先） 向けにpub getやビルト、インストールまで一連の作業を実行してくれます。

$ flutter run --release
リリースモードで実行します。

$ flutter run --debug
デバッグモードで実行します。

$ flutter run -d xxx
ターゲットデバイスを指定する場合には-dオプションを利用します。flutter devicesで表示されているデバイスのIDを指定します。

macOSで実行する例
$ flutter run -d macOS
$ flutter run --verbose
flutter runコマンド実行中の詳細ログを表示します。

インストール
## flutter install
ビルド済みのインストールパッケージをデバイスにインストールします。

テスト
## flutter test
プロジェクト直下のtestディレクトリのユニットテストを実行します。

## flutter drive
Flutterアプリのインテグレーションテスト実行コマンドです。

実行例
$ flutter drive --target=test_driver/sample_perf.dart
その他
$ flutter screenshot
現在接続しているデバイスのスクリーンショットを取得します。
出力先を指定する場合は、--outオプション (ファイル名も指定必要) を利用します。

$ flutter --help
ヘルプメッセージを表示します。Flutterコマンドの良いところは、以下のように必要なオプションの後に--helpを付けるとそのオプションに対するヘルプを表示してくれる点です。

実行例
$ flutter --help
$ flutter run --help


---

[Flutterコマンド一覧まとめ]: https://qiita.com/kurun_pan/items/f9251b1827ce9dca9e14