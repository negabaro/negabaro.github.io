## flutter_gen

flutter_gen
pubspec.yamlで管理するassetにアクセスするためのコードが自動生成される。リソース名のハードコーディングを防げる
R.javaやR.swift、SwiftGenなどと同じ感じ
brew経由でも、projectのpubspecに書いてpackageとして導入することもできる
画像以外にもjsonやPDFもgenerateできる
jsonやPDFの場合は、flutter_genで生成されるコードを使って、 自分でbundleを使ってロードする必要がある
jsonとPDFのロード
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';

// json
final json = await rootBundle.loadString(Assets.json.fruits);

// pdf
final pdf = await rootBundle.load(Assets.pdf.manual);

---

[flutter_gen]: https://github.com/FlutterGen/flutter_gen
