こんにちは。
BPSの福岡拠点として一緒にお仕事させてもらっています、ウイングドアのウメバヤシです。

Flutterといえば、Providerパッケージによる状態管理が主流になっていると思います。
今回はそのProviderパッケージの作者が新しく開発した、Riverpod（改良版Provider）というパッケージを触ってみたので、基本的な使い方をまとめてみました。

Riverpodとは
Providerと同じ作者が開発した新しい状態管理パッケージです。
用途としてはProviderとほぼ同じなのですが、Providerの欠点を補った改良版Providerとなっています。
パッケージ名もProviderのアナグラムになっていて作者の遊び心を感じますね🥳

公式サイト：Riverpod: Provider, but different
まえおき
前提としてRiverpodには3つの種類があって、その中でも今回はFlutterで使用するための基本的なパッケージであるflutter_riverpodについて解説していきます。

Pub.dev：flutter_riverpod | Flutter Package
公式サイトにもありますが、3つの違いを表にしました。

app type	package name	説明
Flutter +
flutter_hooks	hooks_riverpod	小さな追加機能を提供しながらflutter_hooksとRiverpodの両方を使用する方法。
※flutter_riverpodのボイラープレートをより簡潔に記述することができるようになります。
Flutter only	flutter_riverpod	Riverpodを使用する基本的な方法。flutter_hooksに依存しません。
※FlutterでRiverpodを使用するための最小構成はこちらです。
Dart only
(No Flutter)	riverpod	Flutterに関する全てのクラスが取り除かれたDartパッケージです。
※Flutterに依存するかたちでの使用はできません。
Providerとの違い
Providerは直感的で使いやすく、かつ高機能で非常に優れたパッケージですが、以下のような不都合もありました。
この問題は僕も実際に使用していて要所要所で感じていました🤔

Providerで包んだツリー以外からアクセスしようとすると実行時にProviderNotFoundExceptionが発生する。
この問題に関しては確実に防ぐ方法がなく、コーディング中に気をつけて使うしかありませんでした。
同じ型を複数同時に使用できない
ProviderはWidgetツリーを遡って最寄りの型を探してくるので、複数同じ型を使用することができませんでした。（使用できるけどWidgetツリーの中で一番近い型にしかアクセスできない）

Widgetツリーが肥大化する
Provideするオブジェクトが増えていくと、DevToolsなどで確認する際にWidgetツリーが肥大化して少し見にくくなってしまいます。（見にくいだけで実害はなし）

以上のような不都合がRiverpodでは解決されています🥳

Riverpodのメリット
Providerをグローバル定数として宣言するので確実にアクセスできる
同じ型のProviderを利用できる
ProviderScopeにProviderが紐づくのでWidgetツリーが肥大化しない
etc…
基本的な使い方
Flutterプロジェクト作成時に自動で作られるカウンターアプリをリファクタする形で、Providerパッケージで定番のChangeNotifierと組み合わせた使い方を例に解説していきます。

モデルクラスの作成
ChangeNotifierを継承したクラスを作成します。
これはProviderパッケージと同じですね。

class Counter extends ChangeNotifier {
  var _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}
Providerの作成
グローバル定数としてトップレベルにProviderを宣言します。
ChangeNotifierProviderの他にも、StreamProviderやStateNotifierProvider、StateProviderなどもあります。

final counterProvider = ChangeNotifierProvider(
  (ref) => Counter(),
);
ProviderScopeを追加する
WidgetツリーでProviderが使用できるようにするために、ルートにProviderScopeを追加します。

void main() {
  runApp(
    ProviderScope(child: MyApp()),
  );
}
Providerにアクセスする
Consumerを使ってProviderをリッスンします。

class MyHomePage extends StatelessWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Consumer(builder: (context, watch, child) {
              return Text('${watch(_counterProvider).count}');    // ←ここ
            }),
          ],
        ),
      ),
    );
  }
}
他にもMyHomePageのスーパークラスをStatelessWidgetからConsumerWidgetに変えることでアクセスする方法もありますが、Consumerを使用することでWidgetのリビルドの影響範囲を最小限に抑えることができます。
（参考：ConsumerWidget）

書きやすさ見やすさをとるならConsumerWidget、パフォーマンス最優先ならConsumerという選択肢になると思います。

値の監視が必要ない場合のアクセス
先ほどのMyHomePageクラスにボタンを追加してタップイベントを設定してみます。
値の変更を検知しなくて良い場合はcontext.readを使用して呼び出します。
Providerパッケージでいうところのlisten: falseにあたります。

class MyHomePage extends StatelessWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Consumer(builder: (context, watch, child) {
              return Text('${watch(_counterProvider).count}');
            }),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.read(_counterProvider).increment();    // ←ここ
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
コード全体
今回のカウンターアプリの全体コードです。

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final _counterProvider = ChangeNotifierProvider(
  (ref) => Counter(),
);

class Counter extends ChangeNotifier {
  var _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

void main() {
  runApp(
    ProviderScope(child: MyApp()),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatelessWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Consumer(builder: (context, watch, child) {
              return Text('${watch(_counterProvider).count}');
            }),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.read(_counterProvider).increment();
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
使ってみた感想
まだ基本的な部分しか触っていませんが、Providerパッケージで感じていた不都合が解消されていて非常に良いです❗️

アプリの規模が大きくなるほど恩恵を受けられそうな印象でした。
ただしまだ完全に安定しているわけではないそうなので、今後破壊的な変更が加わる可能性もゼロではないところが注意点です。

現時点でFlutter公式も推奨しているProviderパッケージもすぐにはなくならないので、より安定性を求めたい場合は従来のProviderパッケージという選択になるかもしれまんが、機能面ではProviderパッケージを選ぶ理由はほとんどないと感じています😲

まだProviderパッケージのように公式推奨とまではなっていませんが、Riverpodが今後メジャーになる可能性は十分にあるので要チェックです👀

公式サイトにより詳しい情報が載っているのでそちらも参考にしてみてください。

https://techracho.bpsinc.jp/wingdoor/2020_10_08/97815