Null-Safety対応と未対応のパッケージが入り交じるときのビルド実行時は --no-sound-null-safety をつける

$ dart --no-sound-null-safety run
$ flutter run --no-sound-null-safety


https://dart.dev/null-safety/unsound-null-safety

Null Safety対応されていないパッケージのimportをする場合は // ignore: import_of_legacy_library_into_null_safeをつける(analysis_optionで一括disableできると楽なのだけど...)


Null-Safetyとfreezedでの自動生成ファイル
freezedで生成するファイルがまだ完全にnull-safety対応されていないので、生成元となるファイルの先頭に// @dart=2.10を追加してnull-safety対応を無効にすることで、生成されるファイルにも同様に// @dart=2.10が追加され、ビルドできるようになる