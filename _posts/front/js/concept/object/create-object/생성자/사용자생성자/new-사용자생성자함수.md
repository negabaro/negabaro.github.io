3. 생성자 함수

생성자 함수를 사용하면 java나 c++의 class 개념처럼 껍데기를 만들 수 있습니다.

`기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작`합니다.

그런데 일반적인 함수인지, 객체를 만들기 위한 목적의 생성자 함수인지 구분하기 위해 생성자 함수의 첫 문자는 대문자로 표기하는 것이 관례입니다

```
function Person(name,email){
  this.name = name;
  this.email = email;
  this.walk = "직립 보행"
}

var person1 = new Person("victolee", "foo@example.com");
var person2 = new Person("worrr", "goo@example.com");

console.log(person1.name + " " + person1.email + " " + person1.walk);
console.log(person2.name + " " + person2.email + " " + person2.walk);
```

리터럴과 Obejct()로 객체를 생성하는 것과 달리, 생성자 함수를 통해 객체를 생성하면 같은 속성을 가진 객체를 여러 개 생성할 수 있습니다.

즉 person1과 person2 객체는 name, email, walk 프로퍼티를 갖게 됩니다.

또한 생성자 함수에서 정의한 this는 생성자 함수로 생성된 인스턴스가 됩니다.

사실 생성자 함수로 인스턴스를 생성하기 전에 먼저 비어있는 객체를 생성합니다.

this는 이 비어있는 객체를 가리키고, 그 객체에 name, email, walk 프로퍼티를 추가한 것입니다.

생성자 함수에 반환 값이 없으면 비어있는 객체에 새로운 프로퍼티를 추가한 this가 반환됩니다.

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]
