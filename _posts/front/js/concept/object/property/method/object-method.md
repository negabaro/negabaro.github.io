객체 메소드(method)
모든 자바스크립트 객체는 Object 객체와 Object.prototype 객체의 모든 프로퍼티와 메소드를 상속받습니다.

자주 사용되는 대표적인 객체 메소드는 다음과 같습니다.

1. hasOwnProperty()

2. propertyIsEnumerable()

3. isPrototypeOf()

4. isExtensible()

5. toString()

6. valueOf()

http://tcpschool.com/javascript/js_object_propertyMethod

# hasOwnProperty() 메소드

hasOwnProperty() 메소드는 특정 프로퍼티가 해당 객체에 존재하는지를 검사합니다.

해당 객체에서 직접 선언된 프로퍼티만을 검사하며, 같은 이름의 프로퍼티라도 상속받은 프로퍼티는 false 값을 반환합니다.

```
unction Dog(color, name, age, family) {

    this.color = color;

    this.name = name;

    this.age = age;

    this.family = family;

    this.breed = function() {

        return this.color + " " + this.family;

    }

}

var myDog = new Dog("검정색", "곰", 3, "불독");

myDog.hasOwnProperty("color"); // true

myDog.hasOwnProperty("breed"); // true

myDog.hasOwnProperty("class"); // 상속받은 프로퍼티이므로, false를 반환함.
```

# propertyIsEnumerable() 메소드

propertyIsEnumerable() 메소드는 특정 프로퍼티가 해당 객체에 존재하고, 열거할 수 있는 프로퍼티인지를 검사합니다.

즉, 이 메소드는 hasOwnProperty() 메소드의 결과가 true이면서, 동시에 열거할 수 있는 프로퍼티인지를 검사합니다.

열거할 수 있는 프로퍼티란 내부적으로 enumerable 플래그가 true로 설정된 프로퍼티를 의미합니다.
이러한 프로퍼티들은 for / in 문으로 접근할 수 있게 됩니다.

Object.defineProperty() 메소드는 ECMAScript 5부터 추가된 객체에 프로퍼티를 추가해주는 메소드입니다.
이때 추가하는 프로퍼티의 속성까지도 설정할 수 있습니다.

예제

```
function Dog(color, name, age) {

    this.color = color;

    this.name = name;

    this.age = age;

}

var myDog = new Dog("흰색", "마루", 1);

// color 프로퍼티의 enumerable 속성을 false로 설정함.

Object.defineProperty(myDog, 'color', { enumerable : false} );



document.write(myDog.propertyIsEnumerable("color") + "<br>"); // false

document.write(myDog.propertyIsEnumerable("name") + "<br>");  // true

document.write(myDog.propertyIsEnumerable("age"));            // true

```

# isPrototypeOf() 메소드

isPrototypeOf() 메소드는 특정 객체의 프로토타입 체인에 현재 객체가 존재하는지를 검사합니다.

예제

```
var day = new Date(); // Date 객체를 생성함.

// 객체 day의 프로토타입이 Date.prototype인지를 검사함.

document.write(Date.prototype.isPrototypeOf(day));          // true

document.write(Date.prototype.isPrototypeOf(new String())); // false

```

# isExtensible() 메소드

isExtensible() 메소드는 객체에 새로운 프로퍼티를 추가할 수 있는지 여부를 반환합니다.

자바스크립트에서 모든 객체는 기본적으로 새로운 프로퍼티를 추가할 수 있습니다.

하지만 preventExtensions() 메소드를 사용하여 해당 객체에 새로운 프로퍼티를 추가할 수 없도록 설정할 수 있습니다.

예제

```
var day = new Date(); // Date 객체를 생성함.

// 객체 day에 새로운 프로퍼티를 추가할 수 있는지 검사함.

document.write(Object.isExtensible(day) + "<br>"); // true



// 해당 객체에 새로운 프로퍼티를 추가할 수 없도록 설정함.

var myDay = Object.preventExtensions(day);

document.write(Object.isExtensible(day));          // false
```

# toString() 메소드

toString() 메소드는 이 메소드를 호출한 객체의 값을 문자열로 반환합니다.

예제

```
var arr = [10, "문자열", true]; // 배열

var bool = false;               // 불리언

function func() { return 0; }   // 함수

arr.toString();  // 10,문자열,true

bool.toString(); // false

func.toString(); // 함수의 소스 코드가 전부 문자열로 반환됨.
```

코딩연습 ▶

toString() 메소드는 어떠한 인수도 전달받지 않습니다.

# valueOf() 메소드

valueOf() 메소드는 특정 객체의 원시 타입(primitive type)의 값을 반환합니다.

자바스크립트에서는 원시 타입의 값이 기대되는 곳에 객체가 사용되면, 내부적으로 이 메소드를 호출하여 처리합니다.

만약 어떤 객체가 원시 타입의 값을 가지고 있지 않다면, 이 메소드는 객체 자신을 반환합니다.

예제

```
function func(n) {

    this.number = n;

}

myFunc = new func(4);

document.write(myFunc + 5); // ① : [object Object]5



func.prototype.valueOf = function() { // valueOf() 메소드를 정의함.

    return this.number;

}

document.write(myFunc + 5); // ② : 9
```

코딩연습 ▶

위의 예제 ① 부분에서는 산술 연산을 위해 number 타입의 값을 기대하는 곳에 myFunc 객체가 사용됩니다.

따라서 자바스크립트는 내부적으로 해당 객체의 valueOf() 메소드를 호출합니다.

하지만 이 객체의 valueOf() 메소드는 아직 정의되지 않았으므로, 해당 객체 자신을 반환하게 됩니다.

따라서 산술 연산이 아닌 문자열 결합 연산이 수행됩니다.

그 후에 예제에서는 prototype 프로퍼티를 이용하여 valueOf() 메소드를 정의합니다.

따라서 ② 부분에서는 내부적으로 호출된 valueOf() 메소드가 해당 객체의 number 프로퍼티 값을 반환합니다.

따라서 정상적으로 산술 연산이 수행됩니다.

원시 타입에 대한 더 자세한 사항은 자바스크립트 기본 타입 수업에서 확인할 수 있습니다.

# valueOf() 메소드
