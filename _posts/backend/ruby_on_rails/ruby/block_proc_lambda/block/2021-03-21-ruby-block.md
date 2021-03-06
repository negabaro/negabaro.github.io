---
layout: post
title: "ruby block이란"
author: negabaro kim
categories: ruby
tags: ruby
---

## block,proc,lambda관련 포스팅 인덱스

> - [ruby block,proc,lambda에 대해 개념정리]
> - [ruby block이란] << 오늘 할 내용
> - [ruby 절차오브젝트 proc,lambda의 차이에 대해 알아보자]
> - [ruby Proc에 대해 알아보자]
> - [ruby Lambda 대해 알아보자] 

## 블록이란

블록이란 간단히 말하면 코드 덩어리이다.


1. `{ }`나 `do ～ end`로 블록을 만들 수 있다.
2. 멀티라인 작성시에는 `do ～ end`를 이용해서 작성하는 것이 가독성에 좋다.
3. `{ }`은 보통 인라인으로 작성할때 사용한다.

다른 언어에서 루비로 넘어온 경우, 아래와 같은 코드를 보고 이게뭔가 헷갈려할 수 있다.

```ruby
test do 
  pp "xx"
end
```

처음에 필자는 def생략이 가능한 메소드인줄 알았다.ㅋㅋ


그러나 블록은 단순히 `{ }`나 `do ～ end`로 둘러쌓인 코드 덩어리일 뿐이고 ruby에서는 이 코드 덩어리를 메소드의 인자로 넘길 수 있다.

```ruby
3.times do | i |
  x = i * 2
  p x
end
```

위 예제의 경우

```ruby
“do | i |
  x = i * 2
  p x
end”
```

부분이 블록이고 times메소드의 인자로서 해당 블록을 넘겨주고 있다.


## 넘겨준 블록을 받아서 실행하는 방법

아래 2가지 방법으로 넘겨준 블록을 메소드내에서 실행이 가능하다.

### 메소드의 인자에 &을 달아주고 call하기

```ruby
def test(&block)
 block.call
end
```

### yield사용

```ruby
def test
 yield
end
```

※yield가 있는 메소드 호출시 인자가 없으면 에러가 발생

## 블록은 왜 쓰는거임?

변수에 담지 않고 싶을때 무명함수(익명함수)로서 간단히 사용이 가능하다. 


## 메소드에 넘겨줄때 블록의 규칙

1. 메소드의 인자에는 단 하나의 block만 넘겨줄 수 있다.
2. 넘겨준 블록을 실행할때 반드시 proc으로 변환해줘야한다.(&block, yield)



## 블록이 자주쓰이는 패턴

each,map,select등 반복실행을 위한 메소드에서 블록을 자주 사용함.

#### each example

```ruby
array = [1, 2, 3, 4]

array.each do |num|
  p num
end
```

#### map example

```ruby
array = [1, 2, 3, 4]

ret = array.map do |num|
  num + 10
end
p ret
```

#### select example

```ruby
array = [1, 2, 3, 4]

ret = array.select do |num|
  num if num % 2 == 0
end
p ret
```

블록에 대한 이해가 부족하면 위 예제들은 외워야만 하는 syntax지만

이해가 되면  `아..select,map,each라는 메소드에 do...end 블록을 넘기는구나` 라는것이 이해가 가게 된다.


## 블록을 변수에 넣는법(유지시키는 법) feat. proc

블록 자체를 변수에 보관할수는 없다.
이때, Proc오브젝트에 블록을 넘겨줌으로서 Proc오브젝트로서 변수에 저장이 가능하다.

#### example

```ruby
proc = Proc.new {|w| puts w}
```

## 블록의 스코프

블록 내에서 선언한 변수는 전부 로컬변수로 블록 밖（do ～ end、{ }）에서 참조할 수 없다.
블록 내에 있는 변수를 `블록스코프의 로컬변수`라고도 부른다.

#### example)

```ruby
array = [1, 2, 3, 4]
local = 'local'

array.each do |num|
  block = 'block'
end

p local   # =>
p block   # =>
```

#### result:

```ruby
"local"
Traceback (most recent call last):
ex2.rb:9:in `<main>': undefined local variable or method `block' for main:Object (NameError)
```

결과에서 알 수 있듯 블록내에서 선언한 block변수는 밖에서 참조할 수 없다.

## block_given

block변수를 넘긴 해당 메소드에서 블록이 넘어왔는지 `block_given?`으로 체크가 가능하다

#### example

```ruby
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

```ruby
false
true
true
```

## 메모


### yield사용시 주의사항

yield가 있는 메소드 호출시 반드시 인자에 block을 넘겨줘야한다.

Proc 넘겨줘도 문자열 넘겨줘도 에러 ArgumentError가 발생한다.

아무것도 안 넘겨주면 LocalJumpError 에러가 발생

```ruby
def test
  yield
end

#test # no block given (yield) (LocalJumpError)

#test Proc.new { pp 'test'} # wrong number of arguments (given 1, expected 0) (ArgumentError)

#test 'test' # wrong number of arguments (given 1, expected 0) (ArgumentError)

test { pp 'test'}
```

### Reference Link:


[Link1]: https://adhrinae.github.io/posts/mastering-ruby-blocks-in-less-than-5minutes-kor
[Link2]: https://www.sejuku.net/blog/14291
[Link3]: https://yakst.com/ja/posts/1634
[Link4]: https://qiita.com/mojihige/items/4850f7dc2836bb7f0efa
[defではないメソッドについて]: https://teratail.com/questions/172699

[ruby block,proc,lambda에 대해 개념정리]: https://negabaro.github.io/archive/ruby-block_proc_lambda

[ruby 절차오브젝트 proc,lambda의 차이에 대해 알아보자]: https://negabaro.github.io/archive/ruby-difference_between_proc_lambda

[ruby block이란]: https://negabaro.github.io/archive/ruby-block

[ruby Lambda 대해 알아보자]: https://negabaro.github.io/archive/ruby-lambda

[ruby Proc에 대해 알아보자]: https://negabaro.github.io/archive/ruby-proc