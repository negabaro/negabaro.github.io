---
layout: post
title: "javascript Property란?"
author: negabaro kim
categories: js
tags: js concept
---

# 프로퍼티를 알면 뭐가 좋은가?

# 프로퍼티는 크게 2가지 속성이 있다.

1. 데이터 프로퍼티 속성
2. 접근자 프로퍼티 속성

# 프로퍼티란

'Property' 는 속성 이란 뜻으로, JS에서는 `객체 내부의 속성`을 의미한다.

객체안에 프로퍼티가 속해있다는 이미지로 생각하면 이해가 빠름

## 객체 생성시 프로퍼티 할당

```
// 객체 생성
var ob = {a: 1};
```

## 객체의 프로퍼티에 접근하기

property에 접근하는 방법
프로퍼티에 접근하는 방법은 2가지가 있다.

1. 대괄호(`[]`)로 접근 //브라캣 연산자라고도 부름
2. 점 표기법을 이용한 접근

### 예제 1)

```
var text = "purple haze";
test["length"]; //11
test.length; //11
```

### 예제 2)

```
// property 접근하기
ob.a; // => 1
ob["a"] // => 1??
```

## 객체의 프로퍼티 수정하기

```
// property 수정하기
ob.a = 0;
```

## 객체의 프로퍼티 추가하기

```
// property 추가하기
ob.b = 2;
ob.b; // => 2
```

## 객체의 프로퍼티 삭제하기

```
// property 삭제하기
delete ob.b;
ob.b; // => undefined
```

# 속성값 이해하기

Property는 총 6가지의 속성을 가지고 있습니다.

1. value
2. get
3. set
4. enumerable
5. writable
6. configurable

## 1. value

value는 일단 프로퍼티의 속성값을 말함

value는 단지 값을 의미할뿐 다른 기능은 없다.

value에 대한 `접근 권한자를 설정`하기 위해서 Enumerable, Writable, Configurable를 이용할 수 있다.

## 2. get & 3. set

get & set 은 ES6에서 부터 나오기 시작한 문법으로

객체의 속성값에 대한 `접근 권한자 역할`을 할 수 있다

그렇기 때문에 `get & set 과 wriatable 속성을 함께 줄 수 없다.`

get & set 자체로 writable의 역할을 가지고 있기 때문

## enumerable (열거 할 수 있는)

만약 해당 property가 열거할 수 있는 속성이라면,

`for...in... 루프를 사용하여 그것들에 접근할 수 있다.`

또한 개체의 열거 가능한 속성의 키는 Object.keys 메서드를 이용해 반환 받을 수 있다.

즉, 조회가능여부와 열거가능여부는 엄연히 다름.

Object속성의 기본 property가 for...in... 루프에 반환되지 않는 이유는 해당 속성이 false이기 때문

```
var ob = {a:1, b:2};

ob.c = 3;

Object.defineProperty(ob, 'd', {
  value: 4,
  enumerable : false
});

// enumerable속성은 조회가능여부와 엄연히 다릅니다.
ob.d; // => 4

// enumerable속성은 열거가능여부와 관련이 있습니다.
for( var key in ob ) console.log( ob[key] );
// Console will print out
// 1, 2, 3

Object.keys( ob );  // => ["a", "b", "c"]

JSON.stringify( ob ); // => "{a:1,b:2,c:3}"

// enumerable속성은 조회가능여부와 엄연히 다릅니다.
ob.d; // => 4
```

# 프로퍼티 vs 메소드

프로퍼티안에 함수를 받는 프로퍼티를 일반적으로 메소드라고 함

```
var person = {
 name: "Jason",
 age: 25,
 occupation: "Student",
 getPersonProfile: function() {
  return "Name : " + this.name +
   "\nAge : " + this.age +
   "\nOccupation : " + this.occupation;
 }
};
```

name, age, occupation은 분명 property처럼 보입니다. 그렇다면 그렇다면 함수를 담고 있는 getPersonProfile도 property일까요?

위의 정의대로라면 getPersonProfile도 분명 객체 안에서 object와 연관된 값을 가지고 있습니다. 하지만 프로그래밍에 조금 익숙하신 분이라면 메소드에 대해서도 많이 들어보셨을 겁니다. 메소드는 object 안에 속해 있고 어떤 기능을 정의하고 있죠. 아래는 microsoft에서 정의 한 프로퍼티와 메소드입니다.

아래는 마이크로소프트에서 정의한 프로퍼티와 메소드 설명의 일부입니다.

`properties store data for an object methods are actions an object can be asked to perform`

프로퍼티는 object를 위해서 데이터를 저장한다.
메소드는 object가 요청 받을 수 있는 액션이다.

그럼 함수를 담고 있는 property는 메소드인 것일까요? 하지만 분명 함수도 JavaScript에서는 값으로 취급됩니다. 그렇다면 값을 담고 있는 것이라는 property의 정의에도 포함이 될 수 있습니다.

하지만 이 이상 고민하는 것은 크게 의미가 없을지도 모르겠습니다. 단순한 관점의 차이로 getPersonProfile 을 property 로도 method 로도 볼 수 있다는 것이 정답이니까요(일반적으로 함수를 담은 프로퍼티를 메소드라고 부릅니다).

프로퍼티와 메소드의 관계를 조금 더 살펴볼까요?

```
function Pen() {
    this._color = 0;}// Add the property to the Pen type itself, can also// be set on the instance individually

Object.defineProperties(Pen.prototype, {
    color: {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        }
    }});

var pen = new Pen();
pen.color = ~pen.color; // bitwise complement
pen.color += 1; // Add one
```

위 코드에서 color는 프로퍼티입니다. 객체를 담고 있지만 프로퍼티는 객체의 reference를 담을 수 있으니까요. 객체 관점에서 보면 color 는 instance property(프로퍼티)입니다. (color와 *color는 각각 다른 프로퍼티입니다. 혼동하지 마세요. 위 참고사항에서 설명한 것처럼 *는 내부에서만 쓰이는 프로퍼티를 의미 약속된 기호입니다.)
[출처][javascript] property란 무엇인가?|작성자 AIdev

[출처][javascript] property란 무엇인가?|작성자 AIdev

# 프로퍼티란?

객체에 대해 다루게 될때 프로퍼티와 메소드에 대한 이해가 없으면 객체를 이해할수 없다. 객체란 것은 결국 껍대기를 이루는 말이고 실제 객체를 완성하는 구성요소들은 이 프로퍼티와 메소드이기 때문

ECMA5에서 프로퍼티는 객체의 일부로 이름과 값 사이 연결을 의미 라고 정의됨
객체의 속성을 나타내는 접근 가능한 이름과 활용가능한 값을 가지는 특별한 형태

객체를 활용함에 있어서 유용함

특정 객체가 가지고 있는 정보를 품고 있기에 해당 객체가 가진 정보에 직접적으로 접근할 수 있게 해줌

이름과 값을 가지고 객체의 정보를 담고 있음
프로퍼티의 접근 연산자는 `.`임.

이 연산자를 통해 프로퍼티를 추가 할 수도 있다.

```
var foo={}; // foo 객체 생성.
foo.a=1; // . 연산자를 이용하여 a 라는 이름의 프로퍼티를 생성하면서 1이라는 값을 할당.
var sum = foo.a+10; // . 연산자를 이용하여 foo 객체의 a 프로퍼티에 접근하여 값을 활용가능하다.
console.log(sum);
> 11
```

# 프로퍼티에 아무런 값도 없으면?

자바스크립트에서 사용하는 변수는 값을 할당하지 않고 선언만 할경우 자바스크립트 엔진이 강제적으로 undefined를 할당한다. 하지만 프로퍼티는 값이 활당되지 않으면 존재할 필요가 없는 녀석이다. 객체의 정보를 담고 있어야할 요소가 그 어떤 정보도 할당받지 않았다면 객체로서는 이 프로퍼티는 쓸모없는 녀석이기 때문이다. 그렇기 대문에 프로퍼티를 추가하면서 값을 할당하지 않으면 syntax error 이다. 프로퍼티를 추가 할때 이점을 반드시 주의 하여야 한다.

또한가지 추가적으로 반드시 기억해야할 것은 자바스크립트의 프로퍼티는 undefined나 null 을 할당한다고 삭제 되지 않는다. 프로퍼티의 삭제는 delete 라는 keyword를 사용하여야 한다.

```
var foo= new Object();
foo.name='foo';
console.log(foo.name);

> foo

foo.name=null;
console.log(foo.name);

> null

delete foo.name;
console.log(foo.name);

> undefined
```

ECMA script5에는 프로퍼티의 내부속성에 접근 할 수 있는 방법이 몇가지 추가 되었다. 데이터 프로퍼티와 접근자 프로퍼티의 속성에 대해 살펴보자

# 공통속성

Enumerable
프로퍼티가 열거 가능한지 정하는 속성
Configurable
프로퍼티를 변경할 수 있는지 정하는 속성
true일 경우 delete연산자를 통해 프로퍼티를 제거하거나 변경이 가능하다.
기본값은 모두 true
이러한 프로퍼티의 속성을 바꾸려면 Object.defineProperty() 메소드를 통해서 변경한다.

var client = {
name : "amumu"
};
//인수 : 변경할 객체, 프로퍼티 이름, 프로퍼티 속성 값
Object.defineproperty(client, "name", {
enumerable : false
});
Object.defineProperty(client, "name", {
configurable : false
});
//이후에는 더 이상 defineProperty를 통해 수정이 불가능하다.

# 데이터 프로퍼티 속성

value
프로퍼티의 값을 저장
객체에 프로퍼티를 만들면 이 속성에 값이 저장
Wirtable
프로퍼티에 값을 저장 할 수 있는지
var client = {};
Object.definePropertry(client, "name", {
value:"amumu",
writable : true
});
위와 같이 작성하면 cleient의 객체에 name프로퍼티가 자동으로 생성되고 값이 설정된다. 다만 defineProperty를 하게 되면 설정하지 않은 속성들은 모두 false가 되기 때문에 공통속성에서 예로 들었던 enumerable과 같은 속성들은 모두 false로 변경이 된다.

# 접근자 프로퍼티 속성

get과 set
접근자 프로퍼티에는 get과 set 2가지 속성이 있다. get과 set을 객체 리터럴 형식으로 접근하려면 아래와 같이 객체를 생성할 때 정의해주면 된다.

var client = {
\_name : 'amumu',
get name(){
return this.\_name;
}
set name(value){
this.\_name = value;
}
};
Object.defineProperty() 를 사용 하면 위 속성들을 함수형태로 작성할 수 있다.
var client = {
\_name : 'amumu'
};
Object.defineProperty(client, "name", {
get : function(){
return this.\_name;
},
set: function(value){
this.\_name = value;
}
});
위와 같이 정의하면 Enumerable, Configurable과 같은 속성이 false이므로 열거불가능하고 쓰기 불가능한 프로퍼티가 된다. 또한, 접근자 프로퍼티와 데이터 프로퍼티를 동시에 설정할 순 없다.

Object.defineProperties()
여러 프로퍼티를 동시에 설정 할 수 있다.

Object.defineProperties(client, {
property1 : {
},
property2 : {
}
});
Object.getOwnPropertyDescriptor()
프로퍼티의 속성을 가지고 있는 객체를 반환해준다. (고유프로퍼티 속성만)

이 포스팅은 객체지향 자바스크립트의 원리(니콜라스 C. 자카스지음, 김태곤 옮김)의 일부를 읽고 정리한 내용입니다.

---

```
var foo={}; // foo 객체 생성.
foo.a=1; // . 연산자를 이용하여 a 라는 이름의 프로퍼티를 생성하면서 1이라는 값을 할당.
var sum = foo.a+10; // . 연산자를 이용하여 foo 객체의 a 프로퍼티에 접근하여 값을 활용가능하다.
console.log(sum);
> 11
```

여기서 문제를 하나 내보도록 하겠다. 자바스크립트에서 프로퍼티에 아무런 값도 할당하지 않으면 어떻게 될가?

자바스크립트에서 사용하는 변수는 값을 할당하지 않고 선언만 할경우 자바스크립트 엔진이 강제적으로 undefined를 할당한다. 하지만 프로퍼티는 값이 활당되지 않으면 존재할 필요가 없는 녀석이다. 객체의 정보를 담고 있어야할 요소가 그 어떤 정보도 할당받지 않았다면 객체로서는 이 프로퍼티는 쓸모없는 녀석이기 때문이다. 그렇기 대문에 프로퍼티를 추가하면서 값을 할당하지 않으면 syntax error 이다. 프로퍼티를 추가 할때 이점을 반드시 주의 하여야 한다.

또한가지 추가적으로 반드시 기억해야할 것은 자바스크립트의 프로퍼티는 undefined나 null 을 할당한다고 삭제 되지 않는다. 프로퍼티의 삭제는 delete 라는 keyword를 사용하여야 한다.

```
var foo= new Object();
foo.name='foo';
console.log(foo.name);
> foo

foo.name=null;
console.log(foo.name);
> null

delete foo.name;
console.log(foo.name);
> undefined
```

물론 proto 와 같이 프로그램적으로 접근 불가능한 프로퍼티들도 존재한다. 이들에 대해서는 후에 자세히 다루도록 하겠다

어찌되었건 프로퍼티란 기본적으로 이름과 값을 가지고 객체의 정보를 담고 있는 녀석들이다. 이 프로퍼티의 접근 연산자는 '.' 이다. 이 연산자를 통해 프로퍼티를 추가 할수도 있고 프로퍼티에 접근 할수도 있다.

### Reference Link:

http://blog.naver.com/PostView.nhn?blogId=magnking&logNo=220966405605&redirect=Dlog&widgetTypeCall=true
https://vnthf.github.io/blog/javascript_property/
https://moonscode.tistory.com/6?category=744351
