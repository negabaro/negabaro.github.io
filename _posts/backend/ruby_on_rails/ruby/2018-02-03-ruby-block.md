---
layout: post
title: "ruby block이란"
author: negabaro kim
categories: ruby
tags: ruby
---

## 블록이란

블록이란 간단히 말하면 변수의 집합이다.

`{ }`나 `do ～ end`로 블록을 만들 수 있다.
멀티라인 작성시에는 `do ～ end`를 이용해서 작성하는 것이 가독성에 좋다.
`{ }`은 보통 인라인으로 작성할때 사용함

다른언어에서 루비로 넘어온 경우, 변수주제에 복수의 행으로 이어져서 쓰이는것을 보고 변수인지 헷갈려할 수 있다.
그러나 블록은 단순히 `{ }`나 `do ～ end`로 둘러쌓인 변수일뿐이다.

```
3.times do | i |
  x = i * 2
  p x
end
```

위 예제의 경우

```
“do | i |
  x = i * 2
  p x
end”
```

부분이 블록이고 times메소드의 변수로 위 블록을 넘겨주고 있다.

## 블록이 자주쓰이는 패턴

each,map,select등 반복실행을 위한 메소드에서 블록을 자주 사용함.

#### each example

```
array = [1, 2, 3, 4]

array.each do |num|
  p num
end
```

#### map example

```
array = [1, 2, 3, 4]

ret = array.map do |num|
  num + 10
end
p ret
```

#### select example

```
array = [1, 2, 3, 4]

ret = array.select do |num|
  num if num % 2 == 0
end
p ret
```

## 블록을 변수에 넣는법(유지시키는 법) feat. proc

블록 자체를 변수에 보관할수는 없다.
이때, Proc오브젝트에 블록을 넘겨줌으로서 Proc오브젝트로 변수에 보관이 가능하다.

#### example

```
proc = Proc.new {|w| puts w}
```

## 블록의 스코프

블록 내에서 선언한 변수는 전부 로컬변수로 블록 밖（do ～ end、{ }）에서 참조할 수 없다.
블록 내에 있는 변수를 「블록스코프의 로컬변수」라고도 부른다.

#### example)

```
array = [1, 2, 3, 4]
local = 'local'

array.each do |num|
  block = 'block'
end

p local   # =>
p block   # =>
```

#### result:

```
"local"
Traceback (most recent call last):
ex2.rb:9:in `<main>': undefined local variable or method `block' for main:Object (NameError)
```

결과에서 알 수 있듯 블록내에서 선언한 block변수는 밖에서 실행이 안된다.

## block_given

block변수를 넘긴 해당 메소드에서 블록이 넘어왔는지 `block_given?`으로 체크가 가능하다

#### example

```
def block_given_test
  puts block_given?
end

block_given_test #<<--block을 변수로 넘겨주지 않았으므로 false
block_given_test{
  puts "papa"
}
block_given_test do
  puts "mama"
end
```

#### result:

```
false
true
true
```

### Reference Link:

```
https://adhrinae.github.io/posts/mastering-ruby-blocks-in-less-than-5minutes-kor
https://www.sejuku.net/blog/14291
https://yakst.com/ja/posts/1634
https://qiita.com/mojihige/items/4850f7dc2836bb7f0efa
```
