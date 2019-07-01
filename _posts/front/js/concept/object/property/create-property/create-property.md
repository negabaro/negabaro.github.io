전 예제들을 보시면서 객체의 프로퍼티를 작성하는 방법과 호출하는 방법에 대해 자연스럽게 배우셨습니다.

객체의 프로퍼티를 정의할 때는 중괄호{ }내에서 프로퍼티를 작성하면 되고, 호출하는 방법은 객체.프로퍼티를 하시면 됩니다.

그런데 객체의 프로퍼티를 작성 할 때의 유의사항과 호출할 때 다른 방식이 있어서 말씀드리려고 합니다.

1. 프로퍼티 작성시 유의사항

프로퍼티를 정의할 때 작성한 이름은 자동으로 문자열로 취급됩니다.

```
var person = {
  "name" : "victolee",
  "email" : "foo@example.com"
}

var person = {
  name : "victolee",
  email : "foo@example.com"
}
```

javascript에서 정의한 예약어를 프로퍼티로 사용할 수 있습니다.

예약어를 굳이 바꾸는 것은 별로 좋은 방식은 아니지만 " "을 이용하여 프로퍼티를 선언한다면 바꿀 수 있습니다.

그래서 저는 주로 " "을 사용하지 않는 편입니다.

--> 바꿀수 있다는게 무슨말인지..예제가 호시이

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]

출처: https://victorydntmd.tistory.com/51 [victolee]
