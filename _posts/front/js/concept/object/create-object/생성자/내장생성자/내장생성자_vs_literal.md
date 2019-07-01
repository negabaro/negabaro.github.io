# 객체생성 방법

1. 사용자가 직접 만든 생성자 함수를 사용
2. Object(), Date(), String() 등 내장 생성자를 사용

# 생성자를 이용해 생성한 변수는 오브젝트다

```
var str1 = "Hello word";
var str2 = new String("Hello word");

console.log(type of str1); //"String"

console.log(type of str2); // "object"
```

결과를 보면 내장 생성자를 이용해 생성한 변수의 데이터 타입은 object

리터럴 방식으로 생성한 변수의 데이터 타입은 string

---

다음 예제는 동일한 객체를 생성하는 두 가지 방법을 보여줍니다.

```
JAVASCRIPT
// 첫 번째 방법 - 객체 리터럴 사용
var car = { goes : 'far'};

// 다른 방법 - 내장 생성자 사용
// 경고 : 이 방법은 안티패턴이다.
var car = new Object();
car.goes = 'far';
```

# 리터럴 vs 내장생성자를 이용한 객체 생성방법의 차이

보다시피 첫 번째인 객체 리터럴 표기법의 명백한 이점은 짤

리터럴 표기법이 코드가 짦다

# 유효범위 판별 작업이 발생하지 않아 퍼포먼스에 유리

생성자 함수를 사용했다면 지역 유효범위에 동일한 이름의 생성자가 있을 수 있기 때문에 Object()를 호출한 위치에서부터 전역 Object 생성자까지 인터프리터가 쭈욱 거슬러 올라가며 유효범위를 검색해야 합니다.

https://brunch.co.kr/@brunch92ny/23
https://webclub.tistory.com/309
