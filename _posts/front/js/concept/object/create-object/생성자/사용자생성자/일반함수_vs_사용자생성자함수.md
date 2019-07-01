일반 함수와 생성자 함수의 차이점은 new 연산자를 붙이느냐의 차이입니다.

생성자 함수인데 new를 붙이지 않는다면 오류를 발생하겠죠.

이러한 경우를 대비해서 생성자 함수를 호출할 경우 새로운 객체를 만들도록 분기문을 작성하곤 합니다.

```
function foo(arg){
  if(!(this instanceof foo)){
    return new foo(arg);
  }
  this.value = arg ? arg : -99;
}

let a = new foo(10);
let b = foo(100);

console.log(a);
console.log(b);
```

변수 b의 경우 생성자 함수 foo를 호출하려 했지만 new 연산자를 붙이지 않은 경우입니다.

즉 foo()함수를 호출했으므로 this는 전역 객체가 될 것이고, 전역 객체는 foo의 인스턴스가 아니므로 생성자 함수를 호출하도록 new foo(arg)를 호출하도록 작성한 코드입니다.

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]
