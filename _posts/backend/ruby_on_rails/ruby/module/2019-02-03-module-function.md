---
layout: post
title: "ruby module_function이란"
author: negabaro kim
categories: ruby
tags: ruby tip
---

Ruby のモジュール関数とは
module_function と密接に関連するモジュール関数について改めて確認してみました。

モジュール内で定義されたメソッド（以下モジュールメソッドと呼びます）は、そのモジュール自身の内部や、モジュールを include した場所（クラスなど）で呼び出すことができます。

しかしモジュールメソッドは、そのままではモジュールの外部に公開されていない（デフォルトで private）ので、モジュール名.メソッド名の形で外部から呼び出すことはできません。

モジュールメソッドを外部に公開するには module_function が必要です。公開したいモジュールメソッドはシンボルで与えます。

### module_function이란

모듈내의 메소드에 접근가능하게 만들어주는 내장메소드

## 예제

### module_function이 없어서 에러가 남

```
module MyModule
  def hello
    puts 'hello'
  end
end

MyModule.hello
```

#### result:

```
Traceback (most recent call last):
ex1.rb:7:in `<main>': undefined method `hello' for MyModule:Module (NoMethodError)
```

### module_function을 선언해줘서 실행이 됨

```
module MyModule
  def hello
    puts 'hello'
  end
  module_function :hello
end

MyModule.hello
```

#### result:

```
hello
```

Referencee Link:

```
https://techracho.bpsinc.jp/hachi8833/2016_12_06/29921
http://karoten512.hatenablog.com/entry/2017/10/23/230734
```
