---
layout: post
title:  "rails select form xx"
author: negabaro kim
categories: rails
tags:	rails
---

<%= f.date_select :birthday, {order: [:month, :day, :year], prompt: { day: 'Select day', month: 'Select month', year: 'Select year' }, start_year: Date.today.year - 18, end_year: Date.today.year - 100}, {required: true} %>

# with_css_classes

https://qiita.com/kazuph/items/3c540ba442ae5d597636

이런 구성으로 하고 싶었는데 with_css_classe는 

```
.select
 select
   option
.select
 select
   option
```


```
 select.select
   option
 select.select
   option
```

해주는거였어서 미오쿠리 함


# 옵션

利用オプションの解説
オプション	概要	書き方例
with_css_class	年月日それぞれでCSSを当てたい場合に利用。実際のCSSはyear,month,dayで指定が可能になる	with_css_classes:'任意のクラス名'
order	年月日の順番を変えたい場合に利用。表示させない場合でも必ず年月日全部書く必要あり	order:[:month,:year,:day]
use_month_numbers	月の表示を数字にしたい場合に利用	use_month_numbers:true
discard_year	年の表示を消したいときに利用	discard_year:true
discard_month	月の表示を消したいときに利用	discard_month:true
discard_day	日の表示を消したいときに利用	discard_day:true
disabled	プルダウンを選択不可にする	disabled:true
prompt	指定データがない場合の初期値表示(一番上の表示)に利用	prompt:"--"
prompt:"選択してください"
selected	指定データがある場合の指定に利用	selected:Time.now(Date型変数ならOK)
start_year	プルダウンの一番上に来る年数を指定	start_year:Time.now.year
start_year:2019
end_year	プルダウンの一番下に来る年数を指定	end_year:Time.now.year-10
end_year:1900
date_separator	年月日のフォームを分けた場合の中間に表示する値を指定。	date_separator:'%s'
date_separator:'/'


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
例


### reference:
https://qiita.com/ozackiee/items/3c027d07cdeb61df6029
https://qiita.com/t_oginogin/items/519fb52e1708e26a8b73
https://qiita.com/msky026/items/7a21203546eb50892c9f