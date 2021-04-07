# data_select

```ruby
= s.date_select :enrollment_date, {with_css_classes:'select', use_month_numbers: true, start_year:Time.now.year, end_year:1940}, {class: "select", style: "display: inline;"}
```

オプション 説明
:use_month_numbers 月を数字で表示
:use_two_digit_numbers 月と日を2桁表示
:use_short_month 月名を省略形で表示
:add_month_numbers 数値 + 月名表示
:use_month_names 月名をカスタマイズ
:date_separator 年月日の区切り文字
:start_year 開始年
:end_year 終了年
:minute_step 分の間隔を変更
:discard_day 日の選択ボックスを非表示
:discard_month 月の選択ボックスを非表示
:discard_year 年の選択ボックスを非表示
:order 並び順を指定
:include_blank 空を含めて表示
:default デフォルトの日付を設定
:selected 優先した設定
:disabled 選択を無効
:prompt 選択値の一番上を指定
:with_css_classes スタイルを変更するタグの設定
:discard_type 名前の型を破棄
:prefix 名前の接頭辞を設定
:size フォームの幅
:maxlength 入力フィールドに入力可能な最大文字数
:accept フォームで受付可能なMIMEタイプ
:readonly フォームの内容変更禁止
:disabled フォームの項目の利用禁止
:tabindex Tabキーによる入力欄の移動順
:accesskey フォームに移動するショートカットキー
:id 要素固有の識別子
:class 要素を分類するクラス名
:title 要素の補足情報
:style 要素の補足情報
:dir 表記方向
:lang 基本言語

https://qiita.com/ozackiee/items/3c027d07cdeb61df6029
https://qiita.com/Kaisyou/items/c544058dd9c8ae312881