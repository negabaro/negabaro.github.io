```
var person = {
  name: "victolee"
}

console.log(person.name)
console.log(person["name"])   // victolee
console.log(person[name])     // undefined
```

출처: https://victorydntmd.tistory.com/51 [victolee]

보시는 바와 같이 대괄호 [ ]를 사용하여 프로퍼티를 호출 할 수 있습니다.

이 때 대괄호안에는 무조건 문자열이여야 합니다.

---

그런데 가끔 대괄호에 문자열이 아닌 변수를 넣을 수도 있습니다.

```
var person = {
  foo : "name",
  name: "victolee"
}

console.log(person["name"])

var nameVar = person.foo
console.log(person[nameVar])
```

person.foo는 문자열인 name을 반환합니다.

name이라는 문자열은 변수 nameVar에 할당되고, person의 속성을 호출하는데 사용됩니다.

어떤 프로퍼티를 호출해야 할지 동적으로 결정해야 할 때 변수에 할당하기도 하므로 기억하두셔야 할 부분입니다.

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]
