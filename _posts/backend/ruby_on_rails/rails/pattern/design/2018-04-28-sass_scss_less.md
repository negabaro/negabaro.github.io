---
layout: post
title:  "css의 전처리 도구SASS,SCSS,Less의 차이"
author: negabaro kim
categories: rails
tags:	css
cover:  "/assets/twice.jpg"
---

부트스트랩공부중 css의 전처리기에 대한 지식이 부족해 공부한 내용을 정리해봤다.

대략적인 이미지로는  Sass/Scss와 Less는 완전 남남이고
SASS/SCSS는 Sass집안의 형제지간인데 조금 다르다는 것과
현재SCSS가 가장 인기가 많다는것이다.

구체적으로 차이에 대해 알아보자.


### Sass/Scss와 Less의 차이


#### 구축환경

가장 큰차이는 구축환경이다.

Sass/Scsss는 Ruby환경인 반면
Less는 자바스크립트 문법을 취하고 있으며,Node.js엔진을 기반으로 구동된다.


#### 변수의 접두어가 틀리다



| Sass/Scss | Less | 
|-------|--------|---------|
| 변수 | $test  | @test |
| 대입 | $test : 10px| @hoge : 10px |

위 표와같이 
less는 변수의 접두어로 @를 사용하고
Sass는 $를 사용한다.


Less의변수는 @로 시작하기 떄문에 CSS의@media등의 기법과 부딪힐 경우가 있으므로 주의가 필요하다.


### SASS vs SCSS의차이


Sass라는CSS를 확장한 메타언어가 있는데
그Sass의 2가지 기법이 SASS,SCSS이다.

두가지 기법은 확장자가 다르고(.sass vs .scss) 사용방법도 조금다른데
배경을 설명하자면 처음에 SASS기법이 나오고 그다음에 나온게 SCSS기법이고
일반적으로 SCSS기법을 더많이 쓴다고한다.


#### 괄호와 세미콜론 사용여부의 차이

SASS 기법에서는 셀렉터나 클래스 뒤에 괄호({})를 사용하지 않고 변수뒤에 세미콜론(;)도 사용하지 않는다.
인덴트를 이용한 간략한 기법이 특징이다.
그 반면 그뒤에 나온 SCSS는 네스트형식의 기법으로 CSS작성 방법은 CSS와 거의 차이가 없다.

처음에 ruby like한  Sass가 나왔는데 ruby를 사용하지 않는 사람들이 적응하지 못해서 css like한Scss가 나온게 아닌가 생각해본다.

#### Sass코드 예)

{% highlight css %}
$red : #FF0000
.hoge
  background-color : $red
{% endhighlight %}

#### Scss코드 예)

{% highlight css %}
$red : #FF0000;
.hoge {
  color: $red;
}
{% endhighlight %}




#### 그외

Bootstrap4부터Scss를 도입했고
Bootstrap5에서는 PostCSS기반으로 움직인다고함


### SCSS의 장점


#### 장점 

표기가 CSS와 닮아 있음
네스트 표시 되어서 알기쉬움.

@mixin와@include등의 기법을 사용하지 않아서 알기쉬움

주류여서 인터넷에 정보가 많음

#### 단점 

세미콜론과 괄호,@mixin과@include등 입력해야할 요소가 많음
처음에는 알기쉬운데 프로젝트가 커지면 커질수록 코드가 길어서 보기 어려워짐
괄호를 사용하므로, 괄호분 인덴트를 맞추는게 귀찮음.



### SASS의 장점


#### 장점

괄호를 사용하지 않으므로 코드가 그만큼 짦아짐


@mixin과@include등은 기호로 표시하므로 입력이 편함
괄호를 사용하지 않으므로 인덴트 맞추는게 편함
Pug(Jade)사용할 경우 상성이 좋음

#### 단점

기호와 인덴트를 사용하므로 처음에 적응하기 어려움
인터넷에 정보가 적은편



### SCSS vs SASS 뭘 써야할까?



위에서 설명한 Pug(Jade)를 사용할 경우 SASS와의 상성이 좋다고한 이유는
SASS와 Pug(Jade)의 표기법이 닮아있기 때문이다.

이하는 Pug(Jade)를 사용한 코드의 예다.

{% highlight css %}
article.article
  header.article__header
    h1 타이틀입니다.
  콘텐츠입니다.
  footer.article__footer
    footer입니다.
{% endhighlight %}

본래 HTML은 태그 사이에 코드를 작성하는데 Pug(Jade)에서는 인덴트를 사용해서 엘리먼트를 표현한다.

처음에 학습코스트가 있으나 코드가 짦아지므로 길게 보면 SASS가 경쟁력이 있다고 본다.

css like한 SCSS를 이용하면 초기에 학습코스트가 없고 SASS에 비해서 코드가 길어질 수 있다.

개인적으로 vim plugin등 인덴트를 자동으로 조절하는 툴을 병행하면 SASS쪽이 더 편하다고 생각하지만

해당 프로젝트 팀원들의 취향을 조합해서 결정해야될 문제인거 같다.





[참고1]: https://qiita.com/pugiemonn/items/4a95f0f2b5594ccba217
[참고2]: http://uxmilk.jp/38084