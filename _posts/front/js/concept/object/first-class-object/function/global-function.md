2. 전역 함수(Global function)
   전역 함수는 애플리케이션 전역에서 호출할 수 있는 함수로서 전역 객체의 메소드이다.
   #2.1. eval()
   매개변수에 전달된 문자열 구문 또는 표현식을 평가 또는 실행한다. 사용자로 부터 입력받은 콘텐츠(untrusted data)를 eval()로 실행하는 것은 보안에 매우 취약하다. eval()의 사용은 가급적으로 금지되어야 한다.
   eval(string)
   // string: code 또는 표현식을 나타내는 문자열. 표현식은 존재하는 객체들의 프로퍼티들과 변수들을 포함할 수 있다.
   var foo = eval('2 + 2');
   console.log(foo); // 4

var x = 5;
var y = 4;
console.log(eval('x \* y')); // 20
#2.2. isFinite()
매개변수에 전달된 값이 정상적인 유한수인지 검사하여 그 결과를 Boolean으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 변환한 후 검사를 수행한다.
isFinite(testValue) // testValue: 검사 대상 값
console.log(isFinite(Infinity)); // false
console.log(isFinite(NaN)); // false
console.log(isFinite('Hello')); // false
console.log(isFinite('2005/12/12')); // false

console.log(isFinite(0)); // true
console.log(isFinite(2e64)); // true
console.log(isFinite('10')); // true: '10' → 10
console.log(isFinite(null)); // true: null → 0
isFinite(null)은 true를 반환하는데 이것은 null을 숫자로 변환하여 검사를 수행하였기 때문이다.

// null이 숫자로 암묵적 강제 형변환이 일어난 경우
Number(null) // 0
// null이 불리언로 암묵적 강제 형변환이 일어난 경우
Boolean(null) // false
#2.3. isNaN()
매개변수에 전달된 값이 NaN인지 검사하여 그 결과를 Boolean으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 변환한 후 검사를 수행한다.
isNaN(testValue) // testValue: 검사 대상 값
isNaN(NaN) // true
isNaN(undefined) // true: undefined → NaN
isNaN({}) // true: {} → NaN
isNaN('blabla') // true: 'blabla' → NaN

isNaN(true) // false: true → 1
isNaN(null) // false: null → 0
isNaN(37) // false

// strings
isNaN('37') // false: '37' → 37
isNaN('37.37') // false: '37.37' → 37.37
isNaN('') // false: '' → 0
isNaN(' ') // false: ' ' → 0

// dates
isNaN(new Date()) // false: new Date() → Number
isNaN(new Date().toString()) // true: String → NaN
#2.4. parseFloat()
매개변수에 전달된 문자열을 부동소수점 숫자(floating point number)로 변환하여 반환한다.
parseFloat(string)
// string: 변환 대상 문자열
문자열의 첫 숫자만 반환되며 전후 공백은 무시된다. 그리고 첫문자를 숫자로 변환할 수 없다면 NaN을 반환한다.

parseFloat('3.14'); // 3.14
parseFloat('10.00'); // 10
parseFloat('34 45 66'); // 34
parseFloat(' 60 '); // 60
parseFloat('40 years'); // 40
parseFloat('He was 40') // NaN
#2.5. parseInt()
매개변수에 전달된 문자열을 정수형 숫자(Integer)로 해석(parsing)하여 반환한다. 반환값은 언제나 10진수이다.
parseInt(string, radix);
// string: 파싱 대상 문자열
// radix: 진법을 나타내는 기수(2 ~ 36, 기본값 10)
첫번째 매개변수에 전달된 값이 문자열이 아니면 문자열로 변환한 후 숫자로 해석하여 반환한다.

parseInt(10); // 10
parseInt(10.123); // 10
2번째 매개변수에는 진법을 나타내는 기수(2 ~ 36)를 지정할 수 있다. 기수를 생략하면 첫번째 매개변수에 전달된 문자열을 10진수로 해석하여 반환한다.

parseInt('10'); // 10
parseInt('10.123'); // 10
두번째 매개변수에 진법을 나타내는 기수를 지정하면 첫번째 매개변수에 전달된 문자열을 해당 기수의 숫자로 해석하여 반환한다. 이때 반환값은 언제나 10진수이다.

parseInt('10', 2); // 2진수 10 → 10진수 2
parseInt('10', 8); // 8진수 10 → 10진수 8
parseInt('10', 16); // 16진수 10 → 10진수 16
기수를 지정하여 10진수 숫자를 해당 기수의 문자열로 변환하여 반환하고 싶을 때는 Number.prototype.toString 메소드를 사용한다.

두번째 매개변수에 진법을 나타내는 기수를 지정하지 않더라도 첫번째 매개변수에 전달된 문자열이 “0x” 또는 “0X”로 시작한다면 16진수로 해석하여 반환한다.

parseInt('0x10'); // 16진수 10 → 10진수 16
두번째 매개변수에 진법을 나타내는 기수를 지정하지 않더라도 첫번째 매개변수에 전달된 문자열이 “0”로 시작한다면 8진수로 해석하지 않고 10진수로 해석한다.

ES5 이전까지는 비록 사용을 금지하고는 있었지만 “0”로 시작하는 숫자를 8진수로 해석하였다. ES6부터는 “0”로 시작하는 숫자를 8진수로 해석하지 않고 10진수로 해석한다.

따라서 문자열을 8진수로 해석하려면 지수를 반드시 지정하여야 한다.

parseInt('010'); // 8진수 10으로 인식하지 않는다.
parseInt('010', 8); // 8진수 10 → 10진수 8
parseInt('10', 8); // 8진수 10 → 10진수 8
parseInt는 첫번째 매개변수에 전달된 문자열의 첫번째 문자가 해당 지수의 숫자로 변환될 수 없다면 NaN을 반환한다.

parseInt('A0')); // NaN
parseInt('20', 2); // NaN
하지만 첫번째 매개변수에 전달된 문자열의 두번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자(예를 들어 2진수의 경우, 2)와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며 해석된 정수값만을 반환한다.

parseInt('1A0')); // 1
parseInt('102', 2)); // 2
parseInt('58', 8); // 5
parseInt('FG', 16); // 15
첫번째 매개변수에 전달된 문자열에 공백이 있다면 첫번째 문자열만 해석하여 반환하며 전후 공백은 무시된다. 만일 첫번째 문자열을 숫자로 파싱할 수 없는 경우, NaN을 반환한다.

parseInt('34 45 66'); // 34
parseInt(' 60 '); // 60
parseInt('40 years'); // 40
parseInt('He was 40') // NaN
#2.6. encodeURI() / decodeURI()
encodeURI()은 매개변수로 전달된 URI(Uniform Resource Identifier)를 인코딩한다.
uri

URI(Uniform Resource Identifier)

여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다.

이스케이프 처리
네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 ASCII Character-set로 변환하는 것이다. UTF-8 특수문자의 경우, 1문자당 1~3byte, UTF-8 한글 표현의 경우, 1문자당 3btye이다. 예를 들어 특수문자 공백(space)은 %20, 한글 ‘가’는 %EC%9E%90으로 인코딩된다.
이스케이프 처리 이유
URI 문법 형식 표준 RFC3986에 따르면 URL은 ASCII Character-set으로만 구성되어야 하며 한글을 포함한 대부분의 외국어나 ASCII에 정의되지 않은 특수문자의 경우 URL에 포함될 수 없다. 따라서 URL 내에서 의미를 갖고 있는 문자(%, ?, #)나 URL에 올 수 없는 문자(한글, 공백 등) 또는 시스템에 의해 해석될 수 있는 문자(<, >)를 이스케이프 처리하여 야기될 수 있는 문제를 예방하기 위함이다.
단 아래의 문자는 이스케이프 처리에서 제외된다.

알파벳, 0~9의 숫자, - \_ . ! ~ \* ‘ ( )
decodeURI()은 매개변수로 전달된 URI을 디코딩한다.

encodeURI(URI)
// URI: 완전한 URI
decodeURI(encodedURI)
// encodedURI: 인코딩된 완전한 URI
var uri = 'http://example.com?name=이웅모&job=programmer&teacher';
var enc = encodeURI(uri);
var dec = decodeURI(enc);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher
console.log(dec);
// http://example.com?name=이웅모&job=programmer&teacher
#2.7. encodeURIComponent() / decodeURIComponent()
encodeURIComponent()은 매개변수로 전달된 URI(Uniform Resource Identifier) component(구성 요소)를 인코딩한다. 여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다. 단 아래의 문자는 이스케이프 처리에서 제외된다.
알파벳, 0~9의 숫자, - \_ . ! ~ \* ‘ ( )
decodeURIComponent()은 매개변수로 전달된 URI component(구성 요소)를 디코딩한다.

encodeURIComponent()는 인수를 쿼리스트링의 일부라고 간주한다. 따라서 =, ?, &를 인코딩한다. 반면 encodeURI()는 인수를 URI 전체라고 간주하며 파라미터 구분자인 =, ?, &를 인코딩하지 않는다.

encodeURIComponent(URI)
// URI: URI component(구성 요소)
decodeURIComponent(encodedURI)
// encodedURI: 인코딩된 URI component(구성 요소)
var uriComp = '이웅모&job=programmer&teacher';

// encodeURI / decodeURI
var enc = encodeURI(uriComp);
var dec = decodeURI(enc);
console.log(enc);
// %EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher
console.log(dec);
// 이웅모&job=programmer&teacher

// encodeURIComponent / decodeURIComponent
enc = encodeURIComponent(uriComp);
dec = decodeURIComponent(enc);
console.log(enc);
// %EC%9D%B4%EC%9B%85%EB%AA%A8%26job%3Dprogrammer%26teacher
console.log(dec);
// 이웅모&job=programmer&teacher

https://poiemaweb.com/js-global-object
