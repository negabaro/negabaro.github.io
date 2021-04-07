
はじめに
Flutterからプラットフォーム固有の機能を利用するためのAPIのSystemChannelsについて解説します。

SystemChannelsとは
まず最初に、基本的にこのAPIを使うことは推奨しません。Flutter Framework内部ではこのAPIを多用していますが、以下のように中間レイヤのAPIであるため今後のバージョンアップで変わる可能性が高いです。

SystemChannelsのソースコードを見ると、中身はMethodChannel, EventChannel等を利用していることが分かると思います。MethodChannelやEventChannel等についてはこちらにまとめていますので参考にしてください。


![image](https://user-images.githubusercontent.com/4640346/113739996-474c9d00-973b-11eb-9769-b8a3c0313bdc.png)


## SystemChannelsの種類

用途毎にいくつかの種類が用意されています。一覧を以下に示します。

種類	機能	上位のFlutter Service
lifecycle	ライフサイクル	widget
navigation	ナビゲーション	widget, system_chrome
system	不明…。ここで利用されているが、実質何もしていない	widget
accessibility	アクセシビリティ (テキスト読み上げなど)	PlatformViews, Semantics
platform	システム設定 (画面回転, 終了など)	SemanticsService,RouteNotificationMessages etc.
platform_views	プラットフォーム固有のビュー操作	AndroidView, UiKitView
skia	グラフィックス	-
keyEvent	キー入力	RawKeyEvent
textInput	テキスト入力	TextInput, AndroidView, UiKitView
サンプルコード
lifecycle
ライフサイクルリスナー
SystemChannels.lifecycle.setMessageHandler((message){
  print('<SystemChannels.lifecycle> $message');
  /*
  AppLifecycleState.paused
  AppLifecycleState.inactive
  AppLifecycleState.resumed
  AppLifecycleState.suspending
  AppLifecycleState.detached
   */
  return Future<String>.value();
});
navigation
ナビゲーション操作リスナー
SystemChannels.navigation.setMethodCallHandler((call) {
  print('<SystemChannels.navigation> ${call.method} (${call.arguments})');
  /*
   popRoute
   pushRoute
   */
  return Future<dynamic>.value();
});
system
実質何にも使えず、使われておらず、無視して良さそうです。

とりあえずコールバックだけ設定
SystemChannels.system.setMessageHandler((message) {
  print('<SystemChannels.system> $message');
  return Future<dynamic>.value();
});
accessibility
テキスト読み上げサンプル
SemanticsService.announce('Hello world', TextDirection.ltr)
のFlutter Framework内部実装が以下です。

参照

Dart
final AnnounceSemanticsEvent event = AnnounceSemanticsEvent('Hello world', TextDirection.ltr);
SystemChannels.accessibility.send(event.toMap());
platform
アプリ終了
SystemNavigator.pop()
のFlutter Framework内部実装が以下です。

アプリ終了
SystemChannels.platform.invokeMethod('SystemNavigator.pop');
platform_views
flutter_webで利用しているので参考にしてください。

こんな感じでビューを作成していく
final Map<String, dynamic> args = <String, dynamic>{
  'id': 1,
  'viewType': 'Create WebView',
};
SystemChannels.platform_views.invokeMethod('create', args);
skia
Skiaキャッシュサイズ設定。他に機能がなく、今はこれしか出来ない…
const maxBytes = 4 * 1024 * 1024;
SystemChannels.skia.invokeMethod('setResourceCacheMaxBytes', maxBytes);
keyEvent
キー入力リスナー
SystemChannels.keyEvent.setMessageHandler((message) {
  print('<SystemChannels.keyEvent> $message');
  return Future<dynamic>.value();
});
textInput
キーボードの表示ON/OFF
SystemChannels.textInput.invokeMethod('TextInput.show');
SystemChannels.textInput.invokeMethod('TextInput.hide');



[Flutter プラットフォーム固有機能を利用するためのSystemChannels APIについて]: https://qiita.com/kurun_pan/items/c0c881f7a3f95ecb3f9d

https://api.flutter.dev/flutter/services/SystemChannels-class.html