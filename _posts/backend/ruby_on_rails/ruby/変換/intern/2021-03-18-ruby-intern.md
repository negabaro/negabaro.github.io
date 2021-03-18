---
layout: post
title: "ruby 문자열을 심볼로 변환하는 방법(with intern)"
description: intern메소드를 이용
tags: ruby
---

## intern

intern메소드를 이용하면 문자열을 심볼로 변환이 가능

```ruby
p "foo".intern # => :foo
```

## exam

enum 사용시 특정 value의 key값을 가져오고 싶을때 아래와 같이 


```ruby
roles = {"지도자"=>:Leader, "스탭"=>:Staff, "학생"=>:Student, "운영자"=>:Manager, "팬"=>:Fan}
```

```ruby
role_list = ["Staff", "Fan"]
pp role_list&.map{|m| roles.key(m.intern)}.join(",") # => "스탭,팬"
```


## 메모

### intern == to_sym

intern메소드와 `String#to_sym`는 완벽하게 동일하다.

```ruby
p "hoge".to_sym == "hoge".intern #=> true
```

### intern메소드명의 유래

```
まつもと ゆきひろです

|原です。
|
|また気まぐれなリクエストです。この前 once をどう定義するかと
|いうやりとりを見ていて思ったのですが、Fixnum#id2name がある
|のだから、
|
|String#name2id
|
|があってもいいのではないでしょうか。

String#internってのがあります．名前が気に入らないかも知れま
せんが我慢して下さい．lisp由来の名前です．
```

해석하면 lisp에서 가져온 이름이라한다.


### 

```
In computer science, string interning is a method of storing only one copy of each distinct string value, which must be immutable.
Interning strings makes some string processing tasks more time- or space-efficient at the cost of requiring more time when the string is created or interned.
The distinct values are stored in a string intern pool.
```


### reference:

```
https://docs.ruby-lang.org/ja/latest/method/String/i/intern.html
[intern유래]: https://qiita.com/tbpgr/items/04faca3e032b4aa97475

```