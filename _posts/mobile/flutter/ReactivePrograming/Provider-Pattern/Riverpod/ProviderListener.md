## ProviderListener

https://riverpod.dev/docs/concepts/reading/


ProviderListenerとAsyncValue
stateの変更を受けて一時的にsnackbarを出したい、エラーアラートを出したい、画面遷移させたい場合にはProviderListenerを使うのが一番良さそう

// Example from riverpod
Widget build(BuildContext context) {
  return ProviderListener<StateController<int>>(
    provider: counterProvider,
    onChange: (context, counter) {
      if (counter.state == 5) {
        showDialog(...);
      }
    },
    child: Whatever(),
  );
}



一方で、StreamProviderなどである値を監視し続ける場合に状態が変化したタイミングでwidgetを出し分ける場合にはwatch(streamProvider)|useProvider(streamProvider)で得られるAsyncValueのwhen/whenDataを使うと良さそう

Widget build(BuildContext context) {
  return useProvider(authStreamProvider).whenData((auth) {
    if (auth == null) {
      return WidgetForNotLoggedInUser();
    } else {
      return WidgetForLoggedInUser();
  }
}
-ref: https://riverpod.dev/docs/concepts/reading#providerlistener

