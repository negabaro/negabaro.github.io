형변환
앞선 글에서 언급했듯, 한 값은 여러 타입에 속할 수 있다. 하지만 이는 가능성의 문제일 뿐, 실제로는 특정 시점에 어떤 값(또는 변수)에는 하나의 타입만이 할당 될 수 있다. 하지만 다양한 필요로 인해 이 값의 타입을 지금 할당된 타입과 다르게 바꾸어야 할 필요가 생길 수 있다. 예를 들어, 정수 타입과 부동소수점 타입을 구분하는 언어에서 두 타입에 속하는 값을 더하는 경우가 그러하다. 이때, 정수 값의 타입을 부동소수점으로 변경하거나 혹은 그 반대의 작업이 선행되어야 한다. 이렇게 값의 타입을 변경하는 작업을 형변환type conversion이라 부른다.

형변환, 타입 캐스팅, 타입 강제
형변환에 관해 이야기할 때 자주 쓰이는 세 용어가 있다.

형변환type conversion
타입 캐스팅type casting
타입 강요type coercion
이 세 용어는 그 의미와 관계가 정확히 합의되지 않았고, 언어와 플랫폼 별로 다르게 사용된다. 본 연재에서는 형변환과 타입 캐스팅을, 그리고 아래에서 언급할 암시적 형변환과 타입 강제를 각각 같은 개념으로 정의하고 사용한다.

형변환은 크게 암시적 형변환과 명시적 형변환으로 나눌 수 있다.

암시적 형변환
암시적 형변환implicit type conversion은 이름이 암시🙃하듯 프로그래머의 명시적 선언 없이 컴파일러 또는 인터프리터를 통해 자동으로 일어난다. 어떤 연산이 허용하지 않는 타입에 대해 이루어질 때, 타입 에러를 내는 대신 컴파일러 혹은 인터프리터가 하나 이상의 피연산자를 ‘말이 되는’ 타입으로 자동으로 변경한 후 작업을 진행하는 것이다.

이 때, ‘말이 되는’ 변환이란 무엇인지에 관한 정의는 언어마다 다르다. 어떤 언어는 정수 값과 부동소수점 값 사이를 포함해 모든 암시적 형변환을 전혀 허용하지 않고, 어떤 언어는 지나치다 싶을 정도로 관용적인 태도로 모든 프로그램을 어떻게든 타입 에러 없이 실행시킨다. 그리고 대부분 언어의 정책은 그 두 극단 사이 어딘가에 위치한다. 독창적인 암시적 형변환으로 악명 높은 언어로 자바스크립트를 꼽을 수 있다.

/* Javascriptundefined the good parts */
console.log(1 + 1)          // 1
console.log(1 + 3.1)        // 4.1
console.log(1 + 3.14)       // 4.140000000000001 (IEEE 754)

/* Javascriptundefined some parts of it... at least */
console.log(1 + []);        // '1'
console.log(1 - []);        // 1
console.log(1 + {});        // '1[object Object]'
console.log(1 - {});        // NaN
console.log([] + []);       // ''
console.log({} + []);       // 0
console.log({} + {});       // NaN
명시적 형변환
암시적 형변환과 다르게 프로그래머가 값을 다른 타입으로 해석하겠다는 의도를 명확히 밝힘에 따라 일어나는 형변환을 명시적 형변환explicit type conversion이라 부른다. 명시적 형변환은 언어에 따라 타입 캐스팅 연산자type casting operator, 타입 변환 함수type conversion function 등을 이용해 일어난다.

// C
double a = 3.3;
int b = (int) a;

// Python
a = 3.3;
b = int(a)

// Haskell
a = 3.3
b = round a
https://ahnheejong.name/articles/types-basic-concepts/
https://ahnheejong.name/articles/types-basic-concepts/