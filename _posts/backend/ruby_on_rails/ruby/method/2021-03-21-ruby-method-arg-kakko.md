---
layout: post
title:  "ruby 메소드 인자 넘겨줘서 호출시 괄호생략하는 문법"
author: negabaro kim
tags:	ruby
---

## 결론

![image](https://user-images.githubusercontent.com/4640346/111907145-64c10c00-8a97-11eb-8d13-d3c60535bc9b.png)

인자가 하나일때만 생략하자.

2개이상일때는 가독성이 떨어질 수 있으므로 주의가 필요

되도록이면 2개이상일때 괄호 생략은 피하도록 하자.

----

ruby에서는 메소드에 인자를 넘겨줄때 괄호 생략이 가능하다.

```ruby
def test(x)
  p "#{x} is pretty"
end
```

라는 메소드에 x인자를 넘겨줄때

```ruby
test("dahyun")
```

와 같이 일반적인 프로그래밍과 같이 괄호안에 인자를 넣는것도 가능하지만

```ruby
test "dahyun"
```

이런식으로 괄호 없이 메소드명에 스페이스 띄우고 인자를 넣는게 가능하다.


인자가 하나일때는 일일이 괄호열고 닫기 할 필요없어서 사용하기 편한데 반면, 복수의 인자를 넘겨주거나 변수에 넣지 않은채로 hash값 같은것을 인자에 바로 넘겨주다 보면 가독성이 굉장히 떨어질 수 있어 주의가 필요하다.




예를 들면 아래와 같은 코드

```ruby
def a(x, y)
    "I'm A. x is #{x} and y is #{y}."
end

def b
    "I'm B"
end

result = a b, key: true #=> "I'm A. x is I'm B and y is {:key=>true}."
```

괄호를 다 붙여주면 아래와 같은 의미이다.

```ruby
result = a(b(), {:key => true})
```

a메소드에 b()메소드와 hash값을 인자로 넘겨준건데 굉장히 가독성이 떨어지므로 이러한 식으로의 코드 작성은 피하도록 하자.





## 메모

### 괄호를 영어로

`()`괄호는 영어로 `parenthesis`라고 한다.

### かっこつけないで

일본어로 괄호를 かっこ라고 하는데 다른 뜻으로 `폼,멋`이라는 의미가 있다.

그래서 `かっこつけないで`라고 하면 괄호 안붙이고 라는 의미와 `(쓸데없는)폼 잡지마`라는 중의적인 의미가 됨..ㅋ

ruby에서 메소드에 복수의 인자를 넘길때 괄호를 생략하는것은 쓰잘데기 없는 폼잡는것과 같음.

---

## 참고링크

[かっこつけないで]

[rubyで変数の代入について]

[かっこつけないで]: https://blog.aotak.me/post/69272692495/show-off-parentheses
[rubyで変数の代入について]: https://teratail.com/questions/41034