---
layout: post
title: "ruby 절차오브젝트(proc,lambda)의 차이에 대해 알아보자"
author: negabaro kim
tags: ruby
---

이 포스트에서는 proc,lambda의 차이점에 대해 알아보자.

## proc,lambda 공통점

먼저 공통점으로는 둘다 Proc오브젝트 라는것이다.

거의 같은 속성이라고 보면된다.

둘다 절차오브젝트(手続きオブジェクト)라고도 불린다.


## proc,lambda차이점

거의 똑같은 proc,lambda에도 `인자 체크방식`과`return을 대하는 자세`에 차이가 있다.


### 차이점1. 인자 체크방식

lambda가 proc보다 인자 검사를 철저히 한다.

#### Proc의 경우

유연하다. 에러가 안남

필요한 인자만 가져오고 필요없는건 무시하는 방식

필요한 인자가 없더라도 에러가 아니라 nil을 넣어준다.


```ruby
proc1 = proc { |arg| p arg }
proc1.call( '다현', '채영') # => "다현"
```
필요한 다현만 가져와 뿌려준다.

```ruby
proc3 = proc { |arg| p arg }
proc3.call() # => nil
```

필요한 인자를 넘겨주지 않자 nil을 뿌려준다.


#### lambda의 경우

깐깐하다.  에러가 잘남

lambda 같은 경우 필요한 인자와 넘겨주는 인자의 수가 일치하지 않으면 ArgumentError에러가 발생한다.

```ruby
proc1 = lambda { |arg| p arg }
proc1.call( '다현', '채영') # => wrong number of arguments (given 2, expected 1) (ArgumentError)

proc3 = lambda { |arg| p arg }
proc3.call() # => wrong number of arguments (given 0, expected 1) (ArgumentError)
```



### return 동작방식

Proc의 경우 ruturn을 만나면 거기서 메소드를 빠져나오는데

Lambda의 경우 return후 다시 메소드로 돌아와 끝까지 실행한다.

#### Proc의 경우

도중 포기파..

```ruby
def proc_method
  proc = Proc.new { return p "다현"}
  proc.call
  p "채영"
end

proc_method #=> "다현"
```

#### lambda의 경우

끈기파😍 lambda칭찬해


```ruby
def lambda_method
  lambda1 = lambda { return p "다현"}
  lambda1.call
  p "채영"
end

lambda_method #=> "다현"
              #=> "채영"
```



## 메모

### lambda인지 proc인지 체크 (lambda?)

Proc 객체의 lambda? 메서드로 lambda로 생성된 함수인지를 확인할 수 있다.


```ruby
Proc.new{}.lambda? # => false
proc{}.lambda?     # => false
lambda{}.lambda?   # => true
->{}.lambda?       # => true
```

### 일반메소드 Proc객체 변환시 = lambda로 생성된 함수

일반적인 메서드를 객체화해서 Proc 객체로 변환하면 람다 Proc 객체가 된다.


```ruby
def hello; end
hello_method = method(:hello)
hello_method.to_proc.lambda? # => true
```

---


[루비 블록, Proc 객체, 람다 함수의 차이]: https://www.44bits.io/ko/post/ruby-proc-and-lambda
