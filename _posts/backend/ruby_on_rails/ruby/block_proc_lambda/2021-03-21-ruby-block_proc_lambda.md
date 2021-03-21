---
layout: post
title: "ruby block,proc,lambda에 대해 개념정리"
author: negabaro kim
tags: ruby
---


## block,proc,lambda관련 포스팅 인덱스

- [ruby block,proc,lambda에 대해 개념정리] << 오늘 할 내용
- [ruby block이란]
- [ruby 절차오브젝트 proc,lambda의 차이에 대해 알아보자]
- [ruby Proc에 대해 알아보자]
- [ruby Lambda 대해 알아보자] 

---

ruby에서 자주 사용하는 block,proc,lambda에 대해 알아보자.

우선 block,proc,lambda는 크게봐서 유사한 카테고리인데 이들을 공통적으로 나타내는 용어가 없으므로 이 포스트에서는 

block,proc,lambda를 `코드 덩어리(カタマリ)`라고 표현하겠다.


## 코드 덩어리(block,proc,lambda)

코드 덩어리안 에서는 block과 proc,lambda를 분리해서 생각할 필요가 있다.

block은 말그대로 덩어리이고 proc,lambda는 덩어리를 패키지화 한것으로 이해하자.


### block을 패키징

block이 레고 사자성(?) 이라면 proc,lambda는 레고를 담는 박스와 같은것이다.

왜 박스에 담냐면 레고(덩어리)가 상품으로서의 가치가 생기게 되고 배송시 다루기 쉽기 때문이다.

누구에게 선물로 레고를 줄때 박스없이 주면 선물로서 가치가 떨어지고 배송시 레고 조각이 떨어질 수 있기때문에 꼭 패키징을 해줘야한다.

block도 마찬가지로 block자체만으로 존재가치가 없어서 반드시 proc,lambda로 패키징을 해줘야한다.

※프로그래밍 세계에서는 덩어리(block)를 패키징한것을 오브젝트화 했다라고 표현한다.


### block을 언패키징

패키징한 `레고(block)`가 선물할 상대에게 도착하면 상대는 얼른 레고를 만져보고 싶을것이다.

이때 레고는 proc,lambda로 패키징 되어 있으므로 반드시 이 박스를 뜯어야 레고를 가지고 놀 수 있다.

이 작업을 언패키징이라고 부르도록 하자.

ruby 프로그래밍 세계에서는 `call`메소드가 언패키징 + 언패키징된 블록을 실행하는 역할을 한다.


※실제 프로그래밍에서 언패키징이라는 개념은 등장하지 않지만 이해를 돕기 위해 그렇게 설명함.


### 여기까지 내용을 정리

- 레고(block)은 그 자체로 상품가치가 없다(사용되지 않는다)
- proc,lambda로 반드시 레고(block)를 패키징 해줘야한다.
- 레고를 만지기전에 반드시 언패키징 해줘야한다.



### block 패키징 타이밍

block사용시 반드시 패키징을 해줘야하는데 언제 패키징을 할지 타이밍을 달리 가질 수 있다.

두가지가 있는데 `즉시 패키징 방식`과 `지연 패키징 방식`이 있다.(이것도 설명을 위해 만든 용어)

즉시 패키징 방식은 기존의 방법과 같이 proc,lambda로 패키징해서 상대에게 배송한다.

거기에 반해 `지연 패키징 방식`은 레고를 패키징하지 않고 그대로 상대에게 배송하고 상대 집에 들어가기 직전 패키징을 하는 방식이다.

코드로 보면 아래와 같다.


#### 즉시 패키징 방식


```ruby
# 1. 배송시 패키징
pkg = Proc.new do
  p "LEGO사자성"
end
```

```ruby
# 2. 상대가 바로 언패키징 & 실행
pkg.call
=> "LEGO사자성"
```

#### 지연 패키징 방식


```ruby
# 2. &block에서 패키징(Proc화)
def house( &block )
  #3. 언패키징/실행
  block.call
end

# 1. do ~ end 레고를 패키징하지 않고 배송
house do
  p "LEGO사자성"
end
```

즉시 패키징 방식은 Proc으로 패키징을 먼저 하는데 반해 지연 패키징 방식은 block을 그대로 인자로 넘기고 넘겨받은 house메소드의 &block에서 패키징 작업을 한다.

`&block`의 `&`이란 전달받은 인자를 Proc오브젝트로 변환하는 의미를 가지므로 `상대에게 도착전에 패키징 한다`고 표현했다.(메소드를 집 인자를 집에 들어가기전 입구라고 상상)


### 지연 패키징 방식의 축약법

`지연 패키징 방식`이라 설명했지만 block을 그대로 메소드에 넘겨주는 방식이다.

한편 메소드 인자에 block을 넘겨줄때는 `하나 밖에` 넘길 수 없다.

`메소드명 do ... end, do ... end`이런식으로 복수의 block을 넘기는 문법이 존재하지 않기 때문이다.

이러한 규칙 때문에 어짜피 블록을 받을때 인자는 하나인데 `인자 선언`과 `인자.call` 필요없지 않나? 라는 발상으로 이어졌고



```ruby
def house( &block )
  block.call
end
```

가

```ruby
def house
  yield
end
```

와 같이 축약된 형태로 사용하게 되었다.

이와 같은 축약형은 인자가 block일때만 유효하다.

중요하니까 반복.. 

지연 패키징 방식은 레고를 패키징하지 않고 메소드 인자로 넘길 수 있지만 `하나의 레고만을` 보낼 수 있다는것을 기억하자.

반면 proc,lambda같은 경우 몇십몇백개의 레고라도 패키징해서 배송(메소드의 인자에 담는것)이 가능하다.

※인자가 없어지고 yield만 있다고 `패키징 언패키징`작업이 없어진건 아니다. yield 메소드 자체에서 해당 작업을 실행해줄뿐


---

여기까지 이해가 됐다면 `코드 덩어리`에 대한 전반적인 개념은 끝이다.

세세한 기능들은 아래 포스트에서 알아보도록 하자.

[ruby block이란]


## 메모

### proc을 인자로 넘겨주는 예제

```ruby
proc1 = Proc.new do
  p "hoge"
end


def sample(proc)
  proc.call
end

sample proc1
```

proc은 반드시 call로 실행해줘야한다.


### 인자가 proc인데 &xx(to_proc)해주면 에러남

proc을 proc으로 바꿔주면 에러가 발생하므로 주의해야한다.

#### 정상작동하는 예제

```ruby
def sample(&katamari)
  katamari.call
end

sample do p "test" end
```

#### 에러가나는 예제

```ruby
def sample(&katamari)
  katamari.call
end

proc1 = Proc.new do
  p "hoge"
end

sample proc1 # 5.rb:1:in `sample': wrong number of arguments (given 1, expected 0) (ArgumentError)
```


---

## 참고

[Ruby block/proc/lambdaの使いどころ]

[Ruby block/proc/lambdaの使いどころ]: https://qiita.com/kidach1/items/15cfee9ec66804c3afd2

[ruby block,proc,lambda에 대해 개념정리]: https://negabaro.github.io/archive/ruby-block_proc_lambda

[ruby 절차오브젝트 proc,lambda의 차이에 대해 알아보자]: https://negabaro.github.io/archive/ruby-difference_between_proc_lambda

[ruby block이란]: https://negabaro.github.io/archive/ruby-block

[ruby Lambda 대해 알아보자]: https://negabaro.github.io/archive/ruby-lambda

[ruby Proc에 대해 알아보자]: https://negabaro.github.io/archive/ruby-proc