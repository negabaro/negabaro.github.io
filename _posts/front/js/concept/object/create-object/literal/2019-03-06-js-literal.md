---
layout: post
title: "Javascript literal(리터럴)이란?"
author: negabaro kim
categories: js
tags: js
---

# 영어 literal의 의미

(어구의 뜻이) 문자 그대로의[기본적인/일반적인]
...문자 그대로 뭐??..

영어 의미만 보면 잘모르겠네

# 객체 리터럴(literal) vs 리터럴?? 차이가 있나?

의미를 혼용해서 쓰는 글들이 많은걸로 보아서 객체 리터럴=리터럴 같은 의미로 사용된다고 보여진다.
자신은 없다..
일단 이 포스트에서는 리터럴이라고 칭하겠다.

# Javascript에서의 리터럴이란?

리터럴(literal) 은 자바스크립트에서 `객체와 배열을 생성하는 간단한 방법`이다.

```
var o = {};
var a = [];
console.log(o);
console.log(a);
```

![image](https://user-images.githubusercontent.com/4640346/53904389-4c851c80-4089-11e9-8916-601adef4ea09.png)

확실히..!`__proto__`가 각가 Object와Array를 가지고 있는걸 봐서 객체뿐만 아니라 배열도 생성하는게 맞는거 같다.

객체 생성 공부할때 많이본 `{}` 을 리터럴이라고 지칭하는 기사만 많이봐서 익숙한데 `[]`도 리터럴이라는 표현이 아직은 어색..

# 리터럴의 정의

> 리터럴(literal) 은 자바스크립트에서 `객체와 배열을 정의하는 간단한 방법`이다.

literal공부중에 위와 같은 문구를 발견했는데 나에게는 `정의하다`라는 동사가 `생성하다` 라고 이해되기 보다는 `선언하다` 에 가깝게 느껴진다.
프로퍼티를 넣어주지 않았으므로 어떻게 생각하면 `선언하다`,`정의하다`가 맞는거 같기도 하고 그렇다고 `객체를 생성할때 쓰이는 literal`의 의미를 `정의하다`
로 바꾸는게 위화감이 들어 이 포스트에서는 `정의하다`가 아닌 `생성하다`로 수정해서 `객체와 배열을 생성하는 간단한 방법`이라고 표기했다.

# 리터럴 형식을 사용하면 뭐가 좋아??

1. 객체 생성 퍼포먼스가 제일 좋음
2. new하기 귀찮지 않아??우린 new안해도돼!

```
var apple = {
    type: "macintosh",
    color: "red",
    getInfo: function () {
        return this.color + ' ' + this.type + ' apple';
    }
};
```

여기서 `getInfo`는 따로 선언안해도 바로 사용가능

```
alert(apple.getInfo());
```

이런 객체를 싱글튼(singleton) 이라고 부르기도 한다

### Reference Link:

```
http://steadypost.net/post/lecture/id/13/
https://meetup.toast.com/posts/104
```
