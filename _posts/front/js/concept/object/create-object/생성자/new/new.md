#

---

# new란

new 演算子とは、オブジェクトを生成する際使われるもので、
この new 演算子を伴ってコンストラクタ関数を呼び出すことで特別な役割を果たすことが出来ます。

# new가 하는일

new 演算子を伴うことで、大きく２つ
■ これから新たに生成するオブジェクトを this の値として設定
■return 文の宣言をしない場合 false を返すところを、新たに生成するオブジェクトを返す
が、行われることになります。

```
var Person = function(name, age) {
  this.name = name;
  this.age = age;
  // newを伴う場合、return文が宣言されなくてもthisを返す。
}

// new演算子を伴うことで、Personコンストラクタ関数のインスタンスを生成
var person = new Person('taro', 24);

console.log(person); //出力：Object{name: taro, age: 24}
```

# 인스턴스를 만들 때는 new 연산자와 함께 생성자를 호출한다.

```
function GirlGroup(name) [
    this.name = name;
}
```

```
var twice = new GirlGroup('Twice');
twice.name; // 'Twice'
```

주의할 것은 new 연산자가 빠지면 안되는 점이다. 그냥 Person() 으로 호출하면 Person은 일반 함수로서 동작한다. 일반 함수의 this는 기본적으로 글로벌 객체를 참조하며 strict-mode에서는 undefined이 된다.

이어서 메서드의 정의는 생성자 안에서 할 수도 있다. 하지만 비효율적이다.

```
function GirlGroup(name) {
    this.name = name;
    this.greeting = function() {
        return `안녕하세요, ${this.name}입니다!`
    }
}
```

# new 연산자

new 연산자를 붙임으로써 자바스크립트 내부에서 다음 동작을 수행하게 됩니다.

함수 실행 공간에서 임의의 객체 obj를 생성합니다.
obj의 기본 메소드들을 정의하고, obj의 [[proto]] 속성에 constructor의 prototype 속성을 대입시킵니다.
this 키워드에 obj를 대입합니다. --> ..
this를 리턴합니다. ok return this;

```
function Dog() {
  // var this = {};
  this.bark = function() {
    console.log('멍멍!!');
  };
  // return this;
}
```

# new2

new

f 를 호출용 함수로만 사용한다면, 프로토타입 객체는 그다지 유용하지 않습니다. new 연산자를 앞에 붙이고 함수를 호출할 때, 프로토타입 객체는 중요한 역할을 수행합니다.

```
var result = f();      // result 는 undefined
var result = new f();  // result 는 Object
```

f 는 텅 빈 함수이기에 반환값도 없지만, new 연산자와 함께 호출하면 호출된 함수의 프로토타입을 근간으로 하는 신규 객체가 반환됩니다. result 는 다음 구조를 갖습니다.

```
result = {
    __proto__ : {
        constructor : function f () {},
        __proto__ : Object
}
}
```

출처: https://beizix.tistory.com/entry/자바스크립트-Function-의-비밀-prototype-과-new [절대적이고 상대적인 Spring Boot 이야기]

출처: https://beizix.tistory.com/entry/자바스크립트-Function-의-비밀-prototype-과-new [절대적이고 상대적인 Spring Boot 이야기]

# 함수를 new 생성자로 호출하도록 강제하는 법

https://beizix.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Function-%EC%9D%98-%EB%B9%84%EB%B0%80-prototype-%EA%B3%BC-new

https://kimjh0727.tistory.com/entry/javascript-new-%EC%97%B0%EC%82%B0%EC%9E%90
