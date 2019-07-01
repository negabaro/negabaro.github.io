---
layout: post
title:  "jquery기초 문법"
author: negabaro kim
categories: jquery
tags:	jquery
---


### jquery란?

jQuery란JavaScript의 라이브러리이다.
유저의 클릭에 반응하는 폼이나 애니메이션등 HTML,CSS만으로 구현하기 어려웠던 것들을 간단히 만들어줄 수 있다.


#### 사용방법

jquery의 기본문법은 이하와 같다.

```
$('셀렉터').메소드(변수);
```

문장으로 쓰면 
무엇을(셀렉터) 어떻게 할것인가(메소드 부분) 순으로 정의를 한다.


예제

```
$('h1').hide();
```

##### 셀렉터 부분 설명 

```
$('셀렉터')
```

이 부분이 실행되는것을 jquery오브젝트 작성 했다고도 한다.

셀렉터에는 html태그명이나 class명을 지정하고
해당HTML요소가 jquery오브젝트가 됨.


##### 메소드 부분 설명 

선택된 jquery오브젝트로 jquery에서 제공하는 여러가지 메소드에 접근할 수 있게된다.


#### 숨기기 기능 hide() 

{% highlight juqery %}
<h1>Hello, World</h1>
{% endhighlight %}
 
{% highlight juqery %}
 $(function() {
  $('h1').hide();
});
{% endhighlight %}

결과: Hello, World가 사라짐


### 요소를 사라지게 하기


##### fadeOut적용 예

![fade-in-out](https://user-images.githubusercontent.com/4640346/40338021-e10dff4e-5dad-11e8-814b-5c538eee45de.gif)

##### slideUp적용 예

![slideup](https://user-images.githubusercontent.com/4640346/40338009-ce45f286-5dad-11e8-9e59-4437285dd1c1.gif)



##### fadeOut,SlideUp예제

{% highlight html %}
<img src="https://prog-8.com/images/html/beginner/wanko.jpg">
<p>jQuery를 배우자.</p>
{% endhighlight %}



{% highlight juqery %}
$(function() {
  $('img').fadeOut();
  
  $('p').slideUp();
  
});
{% endhighlight %}




#### class,id를 이용해 jquery오브젝트 접근

##### id를 이용하는 법

{% highlight juqery %}
$('#list').css('margin','20px');
{% endhighlight %}

##### class를 이용하는 법

{% highlight juqery %}
$('.list-item').css('color','red');
{% endhighlight %}


### 요소를 표시하기

{% highlight html %}
<h1 id="title">test</h1>
<img id="image" src="https://prog-8.com/images/html/beginner/wanko.jpg">
{% endhighlight %}


{% highlight juqery %}
$(function() {
  $('#title').show();
  
  $('#image').fadeIn();
  
});
{% endhighlight %}



### 이벤트

어떤 처리를 실행할 타이밍을 설정가능
예) 유저가 버튼을 클릭했을때 어떤 처리를 한다든지

#### 사용방법

{% highlight juqery %}
$('셀렉터').이벤트명(function(){ });
{% endhighlight %}

#### 예제

{% highlight html %}
<div class="btn" id="hide-text">설명을 삭제</div>
<h1 id="text">Hello, World!</h1>
{% endhighlight %}


{% highlight juqery %}
$('#hide-text').click(function(){
  $('#text').slideUp();
});
{% endhighlight %}


설명을 삭제 버튼을 누르면 Hellow,World가 slideUp하게 사라진다.




### css 메소드(css속성 변경)

기본 문법은 이하와 같다.

{% highlight juqery %}
$('셀렉터').css('프로퍼티명','값');
{% endhighlight %}


#### 예제

CSS를 변경 버튼을 클릭하면 text의 문자 컬러를 빨간색으로 폰트크기를 50px로 변경하는 예제


{% highlight juqery %}
<div class="btn" id="change-css">CSS를 변경</div>
<h1 id="text">Hello, World!</h1>
{% endhighlight %}


{% highlight juqery %}

$('#change-css').click(function() {
  $('#text').css('color','red');
  $('#text').css('font-size','50px');
});
{% endhighlight %}


  
위에서 배운 특정 요소 숨기기 기능인 hide와 같은 의미로 이하와 같이도 사용한다.


{% highlight juqery %}
$('셀렉터').css('display', 'none');
{% endhighlight %}

### text,html메소드(문자 변경)

textメソッドを用いることでHTMLそのものを変更することも出来ます。textメソッドは、$('セレクタ').text('書き換える文字列');のように記述します。 

텍스트 메소드는 HTML자체를 변경하는것이 가능하다.

```
$('셀렉터').text('바꿀문자열');
```

html메소드는 요소를 HTML형식으로 바꾸는것이 가능하다.

```
$('셀렉터').html('바꿀문자열');
```

#### 예제

문자열을 변경 버튼을 클릭하면 Hello, World! -> 텍스트입니다로 변경됨.
HTML을 변경 버튼을 클릭하면 Hello, World! -> <a>태그로 덮힌 html입니다라는 문자로 변경됨

{% highlight html %}
<div class="btn" id="change-text">문자열을 변경</div>
<div class="btn" id="change-html">HTML을 변경</div>
<h1 id="text">Hello, World!</h1>
{% endhighlight %}  


{% highlight juqery %}
  $('#change-text').click(function(){
    $('#text').text("텍스트입니다.");
  });
  $('#change-html').click(function(){
    
    $('#text').html('<a href="https://naver.com/">html입니다.</a>');
  });  
{% endhighlight %}


### this

$(this)는 이벤트안에서  그이벤트가 일어난 요소를 취득하는것이 가능합니다.


#### 예제

클릭한 리스트의 색깔을 빨간색으로 변경하는 예제

{% highlight html %}
<ul>
  <li class="list-item">리스트1</li>
  <li class="list-item">리스트2</li>
  <li class="list-item">리스트3</li>
</ul>
{% endhighlight %}    

{% highlight juqery %}
$(function() {
  $('.list-item').click(function(){
   $(this).css("color", "red"); 
  });
});
{% endhighlight %}


### 변수

#### 변수를 사용하지 않은경우 

{% highlight html %}
<h1 id="title">안녕하세요 타이틀입니다.</h1>
$('#title').css('color', 'red');
$('#title').html('안녕하세요 타이틀입니다.');
$('#title').fadeOut(1000);
{% endhighlight %}

#### 변수를 사용한 경우

{% highlight html %}
<h1 id="title">안녕하세요 타이틀입니다.</h1>
var $t = $('#title');
    
$t.css('color', 'red');
$t.html('안녕하세요 타이틀입니다.');
$t.fadeOut(1000);
{% endhighlight %}

### 메소드 체인

메소드 체인은 하나의 jQuery오브젝트에서 연속으로 메소드를 이용할 수 있는 구문이다.

```
$('셀렉터').メソッド().メソッド()...
```

이런식으로 사용가능하고 각각의 메소드가 적용됨 


### find,children메소드(자식요소의 취득)

find메소드는 모든 자식요소 중에 지정한 셀렉터을 가진 요소를 취득할때 사용한다.

children메소드는 지정한 셀렉터가 가진 바로밑의 자식요소중에 지정한 셀렉터가 있는지 요소를 취득할떄 사용한다

#### 예제

find메소드 버튼을 클릭하면 링크1,2가 전부 빨간색이 되는데
children메소드는 링크1만 fadeOut된다.

{% highlight html %}
  <div class="btn" id="find-method">find 메소드</div>
  <div class="btn" id="children-method">children 메소드</div>
  <div id="wrapper">
    <a href="#">링크1</a>
    <div>
      <a href="#">링크2</a>
    </div>
  </div>
{% endhighlight %}  

{% highlight html %}  
  $(function() {
  $('#find-method').click(function() {
    $('#wrapper').find('a').css('color','red');
  });
  
  $('#children-method').click(function() {
    $('#wrapper').children('a').fadeOut();
  });
});
{% endhighlight %}

### hover

hover메소드는 요소위에 마우스를 올렸을때와,마우스가 벗어낫을때에 어떤 처리를 할 수 있는 이벤트이다.

hover이벤트는 이하와 같이 정의한다.

```
$('셀렉터').hover(마우스를 올렸을때의 처리, 마우스가 벗어났을때의 처리);
```

클릭이벤트와 다르게 2개의 변수가 있는것이 특징 변수사이는 컴마로 구분한다.

##### 예제

language-wrapper div에 마우스를 올리면 텍스트가 서서히 나타나고 마우스를떼면 사라지는 예제

{% highlight html %} 
  <div id = "language-wrapper">
    <h1 class="language-title">jQuery란?</h1>
    <p class="language-text">
      jQuery란JavaScript의 라이브러리이다.유저의 클릭에 반응하는 폼이나 애니메이션등 HTML,CSS만으로 구현하기 어려웠던 것들을 간단히 만들어줄 수 있다.
    </p>
  </div>
{% endhighlight %}  

  
{% highlight html %} 
$(function() {
  $('#language-wrapper').hover(
    function(){
      $(this).find('.language-text').fadeIn();
    },function(){
      $(this).find('.language-text').fadeOut();
    });
});
{% endhighlight %}  