
---
layout: post
title:  "Rails hash값에 try를 해야할까?"
author: negabaro kim
categories: rails
tags:	rails ruby
---

hashに対するtryの使い方 
hashではtryメソッドを使う場合、fetchメソッドか[]かどちらかと合わせて使います。
両方のパターンを見ていきましょう。

fetchメソッド

コンソール | fetchとtryを合わせた使い方
1
2
3
4
5
6
7
pikawaka = {url: 'https://www.pikawaka.com'}

pikawaka.try(:fetch, :url, '値がありません')
=> "https://www.pikawaka.com"

pikawaka.try(:fetch, :name, '値がありません')
=> "値がありません"
コンソール | []とtryを合わせた使い方
1
2
3
4
5
6
7
pikawaka = {url: 'https://www.pikawaka.com'}

pikawaka.try(:[], :url)
=> "https://www.pikawaka.com"

pikawaka.try(:[], :name)
=> nil
fetchメソッドはハッシュから指定したキーのバリューを取り出すメソッドです。
もし指定したキーがない場合は、第三引数(今回は値がありませんに相当します)に指定した値を返します。

この様な形でhashに対してtryメソッドを使用できます。
fetchの場合はkeyがなければ、値がありませんと指定した値を返し:[]の場合はnilを返します。
それぞれkeyがあればそのkeyのvalueを返します。

ただhashに対してtryメソッドを使うメリットはあまりないと思ってます。
tryを使わずにvalueを取り出す例を見てみましょう。

コンソール | tryを使わない例
1
2
3
4
5
6
7
8
9
10
11
12
13
pikawaka = {url: 'https://www.pikawaka.com'}

pikawaka.fetch(:url, '値がありません')
=> "https://www.pikawaka.com"

pikawaka.fetch(:name, '値がありません')
=> '値がありません'

pikawaka[:url]
=> "https://www.pikawaka.com"

pikawaka[:name]
=> nil
結局hashで使えるfetch(:key, 'keyがなかった場合の値')と[:key]がtryと同じ挙動なので、hashに対してtryを使う必要は特にありません。hashでtryも使えるんだな〜くらいの認識でいてもらって、hashでtryメソッドを使っているコードを見かけたら、tryを消した形でリファクタリングできると覚えておきましょう！


### reference:

```
https://pikawaka.com/rails/try
https://qiita.com/ngron/items/ec5f72639634949c126e
```