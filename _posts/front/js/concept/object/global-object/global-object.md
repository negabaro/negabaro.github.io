グローバルオブジェクトは、グローバルスコープ上に常時存在するオブジェクトです。

JavaScript では、グローバルオブジェクトが常に定義されています。ウェブブラウザー上でスクリプトがグローバル変数を生成する時、グローバルオブジェクトのメンバーとして作成されます。 (Node.js ではこの限りではありません。) グローバルオブジェクトが実装するインターフェイスは、どのようなコンテキストでスクリプトが実行されているかによって変化します。例えば、

ウェブブラウザーでは、明示的にバックグランドタスクとして起動されるコードを除き、 Window がグローバルオブジェクトになります。ウェブにおける JavaScript コードのほとんどはこのケースに該当します。
Worker 内で実行されるコードでは WorkerGlobalScope オブジェクトがグローバルオブジェクトになります。
Node.js で実行されるスクリプトの場合、 global と呼ばれるオブジェクトがグローバルオブジェクトになります。

# 전역 객체(Global Object)

모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 `window`, Server-side(Node.js)에서는 `global` 객체를 의미한다.

```
// in browser console
this === window // true

// in Terminal
node
this === global // true
```

# global object의 생성시기

전역 객체는 실행 컨텍스트에 컨트롤이 들어가기 이전에 생성이 되며 `constructor가 없기 때문에` new 연산자를 이용하여 새롭게 생성할 수 없다.
즉, 개발자가 전역 객체를 생성하는 것은 불가능하다.

전역 객체는 전역 스코프(Global Scope)를 갖게 된다.

# 전역객체의 자식을 부를때 부모 이름(전역객체)를 묻지 않는다

전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있다.
예를 들어 document 객체는 전역 객체 window의 자식 객체로서 window.document…와 같이 기술할 수 있으나
일반적으로 전역 객체의 기술은 생략한다.

```
document.getElementById('foo').style.display = 'none';
// window.document.getElementById('foo').style.display = 'none';
그러나 사용자가 정의한 변수와 전역 객체의 자식 객체 이름이 충돌하는 경우, 명확히 전역 객체를 기술하여 혼동을 방지할 수 있다.
function moveTo(url) {
  var location = {'href':'move to '};
  alert(location.href + url);
  // location.href = url;
  window.location.href = url;
}
moveTo('http://www.google.com');
```

# 전역 변수는 전역 객체랑 무슨사이?

전역 객체는 전역 변수(Global variable)를 프로퍼티로 가지게 된다.
다시 말해 전역 변수는 전역 객체의 프로퍼티이다.

```
var ga = 'Global variable';
console.log(ga);
console.log(window.ga);
```

# 전역 함수는 전역 객체랑 무슨사이?

글로벌 영역에 선언한 함수도 전역 객체의 프로퍼티로 접근할 수 있다. 다시 말해 전역 함수는 전역 객체의 메소드이다.

```
function foo() {
  console.log('invoked!');
}


window.foo();
```

# Standard Built-in Objects(표준 빌트인 객체)는 전역 객체랑 무슨사이?

Standard Built-in Objects(표준 빌트인 객체)도 역시 전역 객체의 자식 객체이다. 전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있으므로 표준 빌트인 객체도 전역 객체의 기술을 생략할 수 있다.

```
// window.alert('Hello world!');
alert('Hello world!');
```

그럼,
window.MATH가능??

# 전역 프로퍼티(Global property)

전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 애플리케이션 전역에서 사용하는 값들을 나타내기 위해 사용한다. 전역 프로퍼티는 간단한 값이 대부분이며 다른 프로퍼티나 메소드를 가지고 있지 않다.

1.1. Infinity //Infinity 프로퍼티는 양/음의 무한대를 나타내는 숫자값 Infinity를 갖는다.
1.2. NaN //NaN 프로퍼티는 숫자가 아님(Not-a-Number)을 나타내는 숫자값 NaN을 갖는다. NaN 프로퍼티는 Number.NaN 프로퍼티와 같다
1.3. undefined //undefined 프로퍼티는 원시 타입 undefined를 값으로 갖는다.

# 전역 함수(Global function)

전역 함수는 애플리케이션 전역에서 호출할 수 있는 함수로서 전역 객체의 메소드이다.

2.1. eval() //매개변수에 전달된 문자열 구문 또는 표현식을 평가 또는 실행한다. 사용자로 부터 입력받은 콘텐츠(untrusted data)를 eval()로 실행하는 것은 보안에 매우 취약하다. eval()의 사용은 가급적으로 금지되어야 한다.
2.2. isFinite() //매개변수에 전달된 값이 정상적인 유한수인지 검사하여 그 결과를 Boolean으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 변환한 후 검사를 수행한다.
2.3. isNaN() //매개변수에 전달된 값이 NaN인지 검사하여 그 결과를 Boolean으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 변환한 후 검사를 수행한다.
2.4. parseFloat() //매개변수에 전달된 문자열을 부동소수점 숫자(floating point number)로 변환하여 반환한다.
2.5. parseInt() //매개변수에 전달된 문자열을 정수형 숫자(Integer)로 해석(parsing)하여 반환한다. 반환값은 언제나 10진수이다.
2.6. encodeURI() / decodeURI() // encodeURI()은 매개변수로 전달된 URI(Uniform Resource Identifier)를 인코딩한다.
2.7. encodeURIComponent() / decodeURIComponent() //encodeURIComponent()은 매개변수로 전달된 URI(Uniform Resource Identifier) component(구성 요소)를 인코딩한다. 여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다. 단 아래의 문자는 이스케이프 처리에서 제외된다

# 글로벌 오브젝트 왜 알아야하나?

# 글로벌 오브젝트란?

글로벌 오브젝트란 글로벌 스코프상에 항상 존재하는 오브젝트를 말한다.
Javascript에서는 글로벌 오브젝트가 항상 정의되어 있다.
웹 브라우저상에서 스크립트가 `글로벌 변수`를 생성할때, `글로벌 오브젝트의 멤버로서 작성된다.`

# 글로벌 오브젝트는 절대적이지 않아

글로벌 오브젝트가 실행하는 인터페이스는

글로벌 오브젝트가 실행하는 인터페이스는 어떤 컨텍스트로 스크립트가 실행되는가에 따라 변한다

예를 들어

웹브라우저:
명시적으로 백그라운 타스크로 기동되는 코드를 제외하고 Window가 글로벌 오브젝트가 된다.

웹에 존재하는 Javascript코드는 거의 이케이스에 해당한다

워커 안에 실행되는 코드에서는 WorkerGlobalScope오브젝트가 글로벌 오브젝트가 된다.

Node.js에서 실행되는 스크립트의 경우 global이라고 불리는 오브젝트가 글로벌 오브젝트가 된다.

---

자바스크립트는 최상위에 1개의 전역객체(Global Object)를 가진다.

자바스크립트는 소스코드를 실행하기 전에, 최상위에 위치한 전역객체(Global Object)를 만든다.

(Math나 Date를 비롯한 몇몇 특별한 객체를 제외한다면) 자바스크립트의 모든 객체와 값들은 이 전역객체의 아래에 자손(descendants)으로 위치하게 된다.

전역객체는 전체 코드에서 단 1개만 존재할 수 있으며, new 연산자를 이용하는 등의 방법으로 새롭게 만들 수 없다.

이 전역객체의 이름은 자바스크립트를 사용하는 환경에 따라 얼마든지 달라질 수 있는데,

이를테면 웹 브라우저에서 사용되는 자바스크립트의 전역객체는 우리가 잘 아는 window라는 이름의 객체이고
한편 자바스크립트를 사용하는 서버인 Node.js에서는 global이라는 이름의 전역객체가 있다.

자바스크립트에서는 코딩할 때 전역객체를 생략할 수 있다.

자바스크립트를 이용한 웹 개발 중에 숱하게 만나게 되는 객체들이 있습니다. BOM으로 만들어진 screen, navigator, history, location 객체나 document 객체가 바로 그것입니다. 그런데 많은 자바스크립트 예제코드에서는 이들 객체 앞에는 아무런 부모객체도 쓰여있지 않은 것을 발견하게 됩니다.

### Reference Link:

```
https://poiemaweb.com/js-global-object
https://developer.mozilla.org/ja/docs/Glossary/Global_object
https://jinbroing.tistory.com/102
http://dev.epiloum.net/1035
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects
https://javascript.info/global-object
```
