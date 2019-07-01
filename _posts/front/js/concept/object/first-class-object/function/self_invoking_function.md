함수표현이 실행코드로서 해석되기 위해서는 ()를 이용하여 함수를 감싸 주어야 한다. 이를 자기호출함수(self invoking function) 라고도 한다. 자기호출함수는 재귀함수와는 다른 개념이다. 재귀함수는 함수 안에서 자신을 호출하는 형식이지만 자기호출함수는 해석과 동시에 실행되는 코드블럭을 말한다.

```
//anonymous function expression
var foo = function() {
    console.log('hello');
};

//named function expression
var foo = function foo() {
    console.log('hello');
};

// self invoking function expression
(function foo() {
    console.log('hello');
})();
```

위 코드에서named function expression는 매우 특이하다. foo 라는 변수에 이름있는 함수를 할당하고 있다. 흔히 알고 있는 함수리터럴과는 좀 거리가 있다. 하지만 이 named function expression에는 한가지 특징이 있다. 바로 해당 함수의 이름은 함수밖에서는 사용할수 없다는 것이다.

```
var foo = function A() {
    A(); // 실행가능
}

A(); //  Syntax Error
```

즉 재귀호출외에는 그다지 쓸대가 없다. 하지만 이런 표현식이 가능하다는 것은 알고 있다고 나쁠것은 없지 않은가? 함수표현은 자기호출함수을 이용하여 콘솔에서 실행결과를 받을 수 있다.

http://insanehong.kr/post/javascript-function/

# 즉시 실행 함수 = 자기호출 함수

즉시 실행 함수 패턴은 다른 말로 자기 호출(self-invoking) 또는 자가 실행(self-excuting) 함수라고도 부른다.

그 이유는 함수 자신이 선언됨과 동시에 실행되기 때문이다.

출처: https://webclub.tistory.com/310 [Web Club]

출처: https://webclub.tistory.com/310 [Web Club]
