---
layout: post
title: "ruby Lambda 대해 알아보자"
author: negabaro kim
tags: ruby
---


## block,proc,lambda관련 포스팅 인덱스

> - [ruby block,proc,lambda에 대해 개념정리]
> - [ruby block이란]
> - [ruby 절차오브젝트 proc,lambda의 차이에 대해 알아보자]
> - [ruby Proc에 대해 알아보자]
> - [ruby Lambda 대해 알아보자] << **오늘 할 내용**

## Lambda란

Proc객체의 한종류

block을 객체화한것

block을 패키징한것

## block을 객체화 하는 이유?

Proc이 존재하는 이유와 같다. 

아래 링크를 참조

[ruby Proc에 대해 알아보자]

## Proc Lambda차이

기본적으로는 같다.

return방식이나 인자체크의 동작방식에 조금 차이가 있다.

자세한건 아래링크를 참조

[ruby 절차오브젝트 proc,lambda의 차이에 대해 알아보자]

### lambda인지 확인하는 방법

위에서 설명했듯이 lambda도 Proc객체이다.

혹시 lambda로 생성된 함수인지 확인하고 싶다면 `lambda?`메소드가 유용하다.

```ruby
Proc.new{}.lambda? # => false
proc{}.lambda?     # => false
lambda{}.lambda?   # => true
->{}.lambda?       # => true
```

## Lambda선언 방법

lambda선언 방법은 아래와 같다.

```ruby
l1 = lambda do |x|
  puts "dahyun #{x}"
end
```

신텍스 슈가로 `->`로도 선언이 가능하다.

```ruby
l2 = ->(x) do
  puts "dahyun #{x}"
end
```

## Lambda실행 방법

Proc과 완전히 동일하다.

`.call()`,`.yield()`,`[]`,`()` 이 있다.

```ruby
l = lambda do |x|
  puts "dahyun #{x}"
end

l.call('cuty') # => dahyun cuty

l.yield('sexy') # =>  dahyun sexy

l.('pretty') # => dahyun pretty

l['kawaii'] # =>  dahyun kawaii
```


## 일반메소드 Proc객체 변환시 = lambda로 생성된 함수

참고로 일반적인 메서드를 객체화해서 Proc 객체로 변환하면 람다 Proc 객체가 된다.


```ruby
def hello; end
hello_method = method(:hello)
hello_method.to_proc.lambda? # => true
```

## 메모

lambda 객체의 신텍스슈가 선언방식인 `->` 과 블록인 `{}` 실행방법 4가지를 이해하면 아래와 같은 괴상한 코드가 뭘 하는지 납득이 된다 ㅎ

```ruby
pp ->(){}[] # nil

pp ->()do end[] # nil

pp ->(){}.() # nil

pp ->(){}.yield # nil

pp ->(){}.call # nil
```

---

[루비proc lambda block함수의 차이 이해하기]: https://www.44bits.io/ko/post/ruby-proc-and-lambda

[ruby block,proc,lambda에 대해 개념정리]: https://negabaro.github.io/archive/ruby-block_proc_lambda

[ruby 절차오브젝트 proc,lambda의 차이에 대해 알아보자]: https://negabaro.github.io/archive/ruby-difference_between_proc_lambda

[ruby block이란]: https://negabaro.github.io/archive/ruby-block

[ruby Lambda 대해 알아보자]: https://negabaro.github.io/archive/ruby-lambda

[ruby Proc에 대해 알아보자]: https://negabaro.github.io/archive/ruby-proc
