---
layout: post
title: "ruby symbol 관련 여러가지 실험"
author: negabaro kim
categories: ruby
tags: ruby
---

---

文字列とは違い、シンボルは値を持たない。
혼토?

# 실험1

```
:papa = "33"　　#＜＜에러 string,number불가
cat = {name: :papa}
```

# 실험2

```
@:papa = "55"
cat = {name: @:papa}
@pepe = :papa  <<이건 가능
```

# 실험3

instance 変数
symbol は変数じゃない！！ 型を持ってるオブジェクト

심볼은 변수가 아님 오브젝트임

```
12 = "hello"
↑error
```

これと同じレベルの話

# 실험4

````
user = { first_name: "john", last_name: "lenon" }
puts user
=> {:first_name=>"john", :last_name=>"lenon"}

```

```

dog = { "name" => "pochi", "kind" => "shibaken" }
dog = {name: "pochi", kind: "shibaken" }

```

```

user = { first_name: "john", last_name: "lenon" }
puts user
=> {:first_name=>"john", :last_name=>"lenon"}

```

cat = { name: :papa, kind: :xxx}





```

dog = { "name" => "pochi", "kind" => "shibaken" }
dog = {name: "pochi", kind: "shibaken" }

```

```

user = { first_name: "john", last_name: "lenon" }
puts user
=> {:first_name=>"john", :last_name=>"lenon"}

```

cat = { name: :papa, kind: :xxx}
2 replies

negabaro   [1 day ago]
ruby1.8から 矢印必須だったけど1.9以降から省略できるように

negabaro   [1 day ago]
{ :name => “foo”, :email => “hoge@com” }
↓
{ name: “foo”, email: “hoge@com” }


### Reference Link:

```

https://qiita.com/Kta-M/items/53a13ef60e14fcb41193

```

```
````
