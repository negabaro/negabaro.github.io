---
layout: post
title: "ruby 심볼이란"
categories: ruby
---

# 한마디로 심볼이란

문자열과 거의 같은 오브젝트이다.
문자열같이 생긴 정수(Integer)다.

## 조금 자세히 심볼이란

루비의 내부구조에는 메소드명과 변수명 정수명 클래스명등의 `이름`에 정수로 관리하고 있음.
이것은 이름을 직접 문자열로 처리하는것보다 속도면에서 유리하기 때문이다.
그리고 그 정수를 Ruby의 코드상에서 표현한것이 심볼이다.

문자열과 다르게 immutable(변경불가)한것도 특징. 같은값이라면 반드시 동일하다.

## 보충

클래스명/메소드명/변수명/상수명을 정의하면 자동적으로 심볼로 작성됨.
심볼의 이름과 수치는 1:1관계이므로 몇번을 사용해도 오브젝트 숫자가 늘어나지 않아 메모리절약이 가능
심볼의 이름은 immutable (변경불가) 그러나 변경불가한 문자열로서 사용한다는 의미는 아니다. 그럴때는 String#freeze를 사용하면 좋음.

## 심볼 특징

문자열과 비교해서 심볼의 특징을 간단히 적으면 이하와 같다.

1. 메모리 소비가 낮다.
2. 코드의 가독성이 높아진다.
3. 문자열보다 처리 속도가 빠르다.

### 1. 메모리 소비가 낮아지는 이유

한번 만들어진 심볼은 포인터가 되어서 복수 사용시에도 같은 영역을 참조하게 된다.
반면 문자열은 선언할때마다 문자열의 영역을 생성하게 된다.

이하 예제를 통해 확인해보자.

##### 문자열의 경우

```
str1 = "test"
str2 = "test"
p str1.object_id
p str2.object_id
p str1.equal?(str2)
```

##### 실행결과

```
23122440
23122420
false #문자열의 내용은 같지만 object_id가 틀린걸 알 수 있다. 즉 2개의 오브젝트가 만들어졌다는 증거
```

##### 심볼의 경우

```
sym1 = :test
sym2 = :test
p sym1.object_id
p sym2.object_id
p sym1.equal?(sym2)
```

##### 실행결과

{% highlight ruby %}
892188
892188
true #같은 오브젝트id인걸 알 수 있다. 즉 심볼의 경우 내용이 같으면 하나의 오브젝트만 생성한다는걸 알 수 있다.
{% endhighlight %}

위의 예제에서 확인했듯이 심볼로 선언할 경우 문자열보다 오브젝트 생성을 덜하기 때문에
문자열과 비교해서 메모리 절약이 된다.

### 2. 코드의 가독성이 높아지는 이유

보통 해시를 만들때 이하와 같이 선언하는데

```
dog = { "name" => "pochi", "kind" => "shibaken" }
```

심볼을 이용하면 이하와 같이 사용이가능하다.

```
dog = {name: "pochi", kind: "shibaken" }
```

「=>」와 따옴표가 줄기 때문에 후자가 알기쉽지 않은가??

### 3. 문자열보다 처리 속도가 빠른이유

1번과 이유는 같다. 심볼은 한번 생성되면 같은 영역을 참조하므로 문자열에 비해 처리가 빠르다.

심볼은 문자열이 아니고 데이터의 위치값을 가진 포인트값을 참조하므로
문자열 비교연산시 심볼을 사용하면 integer를 비교한것과 맞먹는 속도가 나온다.

### 심볼의 정의

문자열 앞에 콜론기호「:」를 붙임으로 심볼을 정의한다.
단 기존의 문자열과 같이 「””」로 묶지 않는다.

이하 예제의 실행결과를 보자.

```
str = "string" #문자열
sym = :symbol #심볼
p str.class
p sym.class
```

##### 실행결과:

```
String
Symbol
```

Ruby에서는 위와 같이 「””」으로 에워싼 부분은 문자열로 판단하고, 콜론기호 「:」를 문자열 앞에 붙인경우 심볼로 판단하는걸 알 수있다.

### 콜론을 문자열 앞에 붙이는 경우와 뒤에 붙이는 경우

심볼을 정의하는 콜론기호「:」는 문자열에 앞에 붙인다고 말했는데 문자열 뒤에 붙을 때도 있다.
이유는 ruby특유의 생략과 관련이 있다.

#### 해시 정의

```
a = {} #a를 해시로 정의
a["first"] = 1
pusts a["first"] #1를 표시
```

#### 문자열을 사용한 해시

```
a = { "first" => 1, "second" => 2 }
puts a["first"] #1를 표시
puts a["second"] #2를 표시
```

#### 심볼을 사용한 해시

```
h1 = { :first => 1, :second => 2 }
puts h1[:first] #1를 표시
puts h1[:second] #2를 표시
```

#### 심볼을 사용한 해시(=>생략)

```
h2 = { first: 1, second: 2}
puts h2[:first] #1를 표시
puts h2[:second] #2를 표시

h1 == h2 #결과는 true
```

h1과h2의 결과는 동일하지만 h1에서는 「=>」를 사용하므로 코드가 길어진다.
h2는 「=>」를 생략하고 심볼을 사용한 해시를 사용할 수 있는데 이때 「:」부분이 문자열 뒤로 간다.
「=>」가 없어지면서 key와 value사이의 구분자가 없어져서 심볼을 정의하는 콜론이 구분자 역할을 위해 뒤로 간것같다.

정리하면
심볼은 문자열 앞에 「:」를 붙여서 정의한다.
값 대입시 구분자를 생략하기 위해 「:」를 뒤에 붙이는 경우가 있다.

이부분 때문에 헷갈리는게 이런코드

```
dahyun = { nickname: :dubu, kind: :kawaii}
```

보면 이게뭐지 싶은데 key와value가 모두 심볼이구나 하고 넘어가면 된다.

### 헷갈리는 코드 예 with rails)

```
stylesheet_link_tag "application", media: "all", "data-turbolinks-track" => true
```

위 설정은 Rails의application.html.erb에 있는 stylesheet_link_tag함수의 설정인데
「:」「=>」과 섞여있어 보기가 불편하기도 하고 변수를 여러가지 가지고 있는거처럼도 보인다.
하지만 변수는 2개뿐이다.

생략한 부분을 다시 돌려보면 이해가 빠르다.

#### 함수는 （）를 생략가능

먼저 괄호가 생략되었다. 괄호를 되돌려보자.

```
stylesheet_link_tag "application", media: "all", "data-turbolinks-track" => true
```

↓

```
stylesheet_link_tag ("application", media: "all", "data-turbolinks-track" => true)
```

#### 변수 마지막이 해시인경우 {}가 생략가능

```
stylesheet_link_tag ("application", media: "all", "data-turbolinks-track" => true)
```

「:media」는 해시인거 같은데 {}가 보이지 않는다. 어떻게 된걸까
`변수 마지막이 해시인경우 {}가 생략가능`하다고 한다.(변태 rubyist들..)

{}를 생략한 부분을 돌려보면 이하와 같다.

```
stylesheet_link_tag ("application", { media: "all", "data-turbolinks-track" => true} )
```

여기까지 오면 왜 변수가 2개인지 납득이 간다.

#### 심볼에서는 「-」가 사용불가

마지막으로 「:media」은 심볼을 사용하는데 「data-turbolinks-track」이부분은 왜 심볼을 사용하지 않았을까
통일성이 없어 가독성이 매우 떨어지는 이코드에는 슬픈이유가 있는데
`심볼에는 「-」를 사용할 수 없어` 사용못한것. 안한것이 아니라 못한것이다.

여기까지 ruby의 symbol에대해 알아봤다.

### Reference Link:

[with_indifferent_access]: https://qiita.com/QUANON/items/169c73425a6bc50dee51
[참고1]: http://jinbroing.tistory.com/34
[참고2]: http://wantknow.tistory.com/42
[配列とハッシュとシンボルは紛らわしいので整理！！]: https://qiita.com/iron-breaker/items/32710004f0bb2e2babb6
[콜론기호]: https://www.sejuku.net/blog/13094
[rubyの文字列とシンボルの違いをキッチリ説明できる人になりたい]: https://qiita.com/Kta-M/items/53a13ef60e14fcb41193
