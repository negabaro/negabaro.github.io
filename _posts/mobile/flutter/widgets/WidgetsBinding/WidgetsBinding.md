
## WidgetsFlutterBinding.ensureInitialized() が必要なシーン

大抵の場合は不要ですが、一言で言うとrunApp()を呼び出す前にFlutter Engineの機能を利用したい場合にコールします。

Flutter Engineの機能とは、前述のプラットフォーム (Android, iOSなど) の画面の向きの設定やロケールなどです。利用しているプラグインによっては、runApp()の前になんらか動作しているとこの設定が事前に必要になります。

runApp メソッドの中身
runApp() のソースコードは以下の様になっており、内部でWidgetsFlutterBinding.ensureInitialized()メソッドをコールし、WidgetsFlutterBindingクラスのインスタンスを生成します。

packages/flutter/lib/src/widgets/binding.dart
void runApp(Widget app) {
  WidgetsFlutterBinding.ensureInitialized()
    ..scheduleAttachRootWidget(app)
    ..scheduleWarmUpFrame();
}
先に言っておくと、全体的な構成は以下の様な感じになっています。

![image](https://user-images.githubusercontent.com/4640346/113738524-f1c3c080-9739-11eb-8aa6-f838aec43e5c.png)


## WidgetsFlutterBinding とは？

ソースコードを見るとensureInitialized()メソッドのみ存在し、WidgetsBindingインスタンスを生成するためのものであることが分かります。

```dart
packages/flutter/lib/src/widgets/binding.dart
class WidgetsFlutterBinding extends BindingBase with GestureBinding, SchedulerBinding, ServicesBinding, PaintingBinding, SemanticsBinding, RendererBinding, WidgetsBinding {

  /// Returns an instance of the [WidgetsBinding], creating and
  /// initializing it if necessary. If one is created, it will be a
  /// [WidgetsFlutterBinding]. If one was previously initialized, then
  /// it will at least implement [WidgetsBinding].
  ///
  /// You only need to call this method if you need the binding to be
  /// initialized before calling [runApp].
  ///
  /// In the `flutter_test` framework, [testWidgets] initializes the
  /// binding instance to a [TestWidgetsFlutterBinding], not a
  /// [WidgetsFlutterBinding].
  static WidgetsBinding ensureInitialized() {
    if (WidgetsBinding.instance == null)
      WidgetsFlutterBinding();
    return WidgetsBinding.instance!;
  }
}
```

## WidgetsBinding とは？
今回の記事の本命である、WidgetsBindingについて説明していきます。

公式には以下の様に記載がありますが、良く分かりませんね。

The glue between the widgets layer and the Flutter engine.
と言うことで、ソースコードを見てみると以下の様になっており、SystemChannelsを利用して Flutter Engine と通信 (MethodChannel) の設定をしていることが分かります (他にもロケールのシステムの設定変更のコールバックなども)。

SystemChannelについては、Flutter プラットフォーム固有機能を利用するためのSystemChannels APIについてにまとめていますので、良かったら読んでみて下さい。

```dart
flutter/lib/src/widgets/binding.dart
mixin WidgetsBinding on BindingBase, ServicesBinding, SchedulerBinding, GestureBinding, RendererBinding, SemanticsBinding {
  @override
  void initInstances() {
    super.initInstances();
    _instance = this;

    assert(() {
      _debugAddStackFilters();
      return true;
    }());

    // Initialization of [_buildOwner] has to be done after
    // [super.initInstances] is called, as it requires [ServicesBinding] to
    // properly setup the [defaultBinaryMessenger] instance.
    _buildOwner = BuildOwner();
    buildOwner!.onBuildScheduled = _handleBuildScheduled;
    window.onLocaleChanged = handleLocaleChanged;
    window.onAccessibilityFeaturesChanged = handleAccessibilityFeaturesChanged;
    SystemChannels.navigation.setMethodCallHandler(_handleNavigationInvocation);
    FlutterErrorDetails.propertiesTransformers.add(transformDebugCreator);
  }
```

とりあえず分かることは、Flutter Engine と Flutter Framework (Flutter Dartソースコード) をバイディング (通信できる様にしている) だけっぽいと言うことが分かります。

と言うことで、これをアプリ実行の前に行うことで、Flutter Engineと通信できる様になると言うことが分かりました。

ここまで来ると、runAppの前にFlutterアプリの機能を利用する場合にはWidgetsFlutterBinding.ensureInitialized()をコールする必要があることを理解する事ができます。


## WidgetsBinding の具体的な使用例
WidgetsBinding は WidgetsBindingObserver で利用されることが多そうです。つまり、アプリのライフライクルを取得する時に利用します。これについては、Flutterアプリのライフサイクルにまとめていますので、興味があったら読んで下さい。

WidgetsBindingの使用例
class _MyHomePageState extends State<MyHomePage> with WidgetsBindingObserver {

  AppLifecycleState _state;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    print('state = $state');
  }

---

[WidgetsFlutterBinding code]: https://github.com/flutter/flutter/blob/51fa704642774c6b6ae64c91642b62801e233e1b/packages/flutter/lib/src/widgets/binding.dart#L1255

[WidgetsBinding code]: https://github.com/flutter/flutter/blob/51fa704642774c6b6ae64c91642b62801e233e1b/packages/flutter/lib/src/widgets/binding.dart#L269 
[Flutter-WidgetsBindingとは何か？]: https://qiita.com/kurun_pan/items/04f34a47cc8cee0fe542


[WidgetsBinding document]: https://api.flutter.dev/flutter/widgets/WidgetsBinding-mixin.html
[SystemChannels document]: https://api.flutter.dev/flutter/services/SystemChannels-class.html
