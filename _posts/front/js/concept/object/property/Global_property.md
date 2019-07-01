1. 전역 프로퍼티(Global property)
   전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 애플리케이션 전역에서 사용하는 값들을 나타내기 위해 사용한다. 전역 프로퍼티는 간단한 값이 대부분이며 다른 프로퍼티나 메소드를 가지고 있지 않다.
   #1.1. Infinity
   Infinity 프로퍼티는 양/음의 무한대를 나타내는 숫자값 Infinity를 갖는다.
   console.log(window.Infinity); // Infinity

console.log(3/0); // Infinity
console.log(-3/0); // -Infinity
console.log(Number.MAX_VALUE _ 2); // 1.7976931348623157e+308 _ 2
console.log(typeof Infinity); // number
#1.2. NaN
NaN 프로퍼티는 숫자가 아님(Not-a-Number)을 나타내는 숫자값 NaN을 갖는다. NaN 프로퍼티는 Number.NaN 프로퍼티와 같다.

console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 \* 'string'); // NaN
console.log(typeof NaN); // number
#1.3. undefined
undefined 프로퍼티는 원시 타입 undefined를 값으로 갖는다.
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined

https://poiemaweb.com/js-global-object
