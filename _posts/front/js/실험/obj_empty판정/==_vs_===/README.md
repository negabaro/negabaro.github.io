## 8) null과undefined만 판별하고 싶을때


`null,undefined`는 

// 4.1.7
// 어떤 변수가 있다고 하죠. 이 변수의 값은 null이나 undefined일 수는 있지만 false나 "", 또는 0의 값은 가지지 않습니다. 이런 변수를 판정할 때에는,
// 아래처럼 작성하지 마시고
if ( foo === null || foo === undefined ) ...
 
// ...강제형변환되는 ==를 사용하세요. 다음과 같이요:
if ( foo == null ) ...
 
// 그리고 이 점을 기억하세요. == 를 사용하면, 판정하려는 변수의 값이 `null` 이나 `undefined` 일 때, 참을 반환할 것입니다.
// 하지만 `false` 나 "" 나 0 값을 가질 때에는 거짓을 반환할 것입니다.
null == undefined