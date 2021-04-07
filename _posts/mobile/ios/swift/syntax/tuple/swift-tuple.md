

tuple은 아주 간단한 구조체(Struct)이라고 생각

여러가지 타입을 한꺼번에 묶어서 사용이 가능

한꺼번에 묶을때 괄호를 사용해서 묶음

```swift
var tuple = (1, "dahyun", true)
var anotherTuple = (1, (tuple))
```


## tuple은 여러가지 타입을 한번에 리턴이 가능

func someFunction() -> (Int,String,Bool){

    return (1,"Zedd",true)

}

짠! 이렇게 tuple을 리턴할 수 있답니다. 

그럼 이 someFunction을 사용해볼까요? 



func someFunction() -> (Int,String,Bool){

    return (1,"Zedd",true)

}

var someTuple = someFunction()

someTuple.0//1

someTuple.1//"Zedd"

someTuple.2//true



var (a,b,c) = someFunction()

print(a)//1

print(b)//"Zedd"

print(c)//true



출처: https://zeddios.tistory.com/238 [ZeddiOS]

## function type도 담을 수 있음

func a() -> Int { return 1 }
func b() -> String { return "dahyun" }
func c() -> Bool { return false }

var functionTuple = (a(), b(), c())


## tuple은 CollectionType이 아니다.


## 순서만 맞춰주면 다 들어감

var tuple = (1, "Hello, world!", true)



var (a,b,c) = tuple

print(a)//1

print(b)//"Hello, world!"

print(c)//true

이렇게!!!! 특정한 이름이 아니더라도, 괄호안에 해당 tuple 개수와 맞게 선언해주면,

이렇게도 쓸 수 있답니다.

제가 선언한 순서대로 tuple에 있는 값이 차례대로 들어가게 되죠XD



출처: https://zeddios.tistory.com/238 [ZeddiOS]


## typealias

tuple은 typealias와 같이 쓰면 깔끔하게 쓸 수 있답니다.

typealias People = (name:String,age:Int, likes:[String])

People이라는 "타입"을 tuple로 만들어주었어요.



var person : People = ("Zedd",999,["Swift","iOS"])

그럼 이렇게 변수가 "People타입"이라고 해주면, tuple을 받을 수 있게됩니다. 

한가지 형식을 가지는 tuple을 여러개 만들 때 유용하겠죠?



var peopleArr : [People] = [("Zedd",999,["Swift","iOS"]),("Your_Name",123,["Piano","Poet"])]

이렇게 People"타입"으로 배열도 만들 수 있겠죠?ㅎㅎ



출처: https://zeddios.tistory.com/238 [ZeddiOS]

## 주의사항



### 1.

tuple은 Type이다.

어 그럼 구조체말고 tuple쓰면 되자나?

..는 조심해야합니다. Swift문서에 따르면,



Tuples are useful for temporary groups of related values. (…) If your data structure is likely to persist beyond a temporary scope, model it as a class or structure (…) 



튜플은 관련된 값들을 임시로 그룹지을때 유용합니다 (...) 만약 데이터구조가 임시범위를 넘어서 존속할 가능성이 있는 경우에는 클래스나 구조체로 모델링하십시오.



### 2.

※ 나는 이 tuple로 loop를 돌리고 싶다!!하시는 분들이 있을지도 몰라요 :)

하지만..tuple로 for문을 돌리게 되면, 

does not conform to protocol 'Sequence'

이러한 에러메세지를 볼 수 있어요. 

tuple이 Sequence라는 프로토콜을 준수하고 있지 않기 때문이에요.

그러니까 tuple에 대해서 루프를 돌릴 수 있는 방법은 없습니다. 

주의하세요 :)

하지만!!!!!tuple을 Sequence프로토콜을 따르는 녀석?..에게 넣어주면 루프를 돌 수 있다는 말이 됩니다.

Sequence프로토콜을 따르는 대표적인 것은 바로 배열!!



"배열"안에 tuple을 넣어줄 수 있답니다 :)



var tupleArr = [(1, "Hello, world!", true),(2, "Hello, world!",false)]



출처: https://zeddios.tistory.com/238 [ZeddiOS]



출처: https://zeddios.tistory.com/238 [ZeddiOS]

---

[]: https://zeddios.tistory.com/238