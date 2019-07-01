# 2) Object() 생성자 함수

new 키워드를 이용하여 Object 생성자 함수를 호출하면 빈 객체를 얻을 수 있습니다.

예제

```
var person = new Object();
console.log(person.name)
console.log(person.email)
console.log(person.birth)

person.name = "victolee";
person.email = "asdf@example.com";
person.birth = "0225";
console.log(person.name)
console.log(person.email)
console.log(person.birth)
```

new Object()를 호출하면 `비어있는 객체를 생성`합니다.

따라서 name, email, birth 프로퍼티를 갖고 있지 않습니다.

비어있는 객체는 의미가 없으므로, new Object()로 비어있는 객체를 생성했으면 `프로퍼티를 추가`해줘야 합니다.

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]
