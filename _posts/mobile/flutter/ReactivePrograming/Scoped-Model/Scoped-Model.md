## Scoped Model ①
専用のパッケージが用意されています。

scoped_model | Flutter Package
https://pub.dartlang.org/packages/scoped_model
APIリファレンス によれば、元は Fuchsia のコードベースから抜き出したライブラリだったそうです。
そう書かれているとちょっと安心感がありますね。

早速、BLoCの記事で使ったフラッシュ暗算風アプリで試してみました。

サンプルコード
https://github.com/kaboc/flutter_examples_mentalcalc/tree/master/scoped
main.dart
import 'package:flutter/material.dart';
import 'calc_model.dart';
import 'screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ScopedModel<CalcModel>(
        model: CalcModel(),
        child: CalcScreen(),
      ),
    );
  }
}

[BLoCパターンの問題点とScoped Modelとの比較]: https://qiita.com/kabochapo/items/2b992cc00e9f464c1ea9