

Swift 프로토콜 지향 프로그래밍(POP)
버그 잡기는 흥미진진해 버그잡이 2020. 8. 19. 21:52
프로토콜 지향 프로그래밍
 

애플은 Swift를 "프로토콜 지향 언어" 라고 말합니다.

프로토콜 지향이란 도대체 무슨 뜻일까요?

 

객체지향 프로그래밍 패러다임의 언어들은 대부분 클래스를 상속을 사용해 타입에 공통된 기능을 구현합니다.

상속을 활용하면 코드의 재활용을 할 수 있어 중복 코드를 줄이는 장점이 있지요.

그런데 Swift는 class 뿐만 아니라 struct, enum과 같은 값타입도 class 만큼 자주 사용합니다(권장하고 있죠.) 이러한 값타입은 상속을 받을 수 없죠.
 

맞습니다. struct, enum과 같은 값타입에 프로토콜을 사용하면 상속을 사용하는 것과 같은 효과를 누릴 수 있습니다.

 

"근데 기존의 참조타입을 써도 되는데 값타입을 쓰는 이유는 무엇일까요?"
Class와 같은 참조 타입의 경우 다중 스레드 환경에서 원본 데이터가 바뀔 수 있게 때문에 값타입을 사용하는 것이 권장됩니다. (값 타입은 값을 복사해서 사용하기 때문에 원본 데이터는 바뀌지 않습니다.)

 
 
프로토콜 초기구현
 

프로토콜은 자신을 채택한 타입이 기능을 구현하도록 강제한다는 특징이 있습니다.

이는 반대로 프로토콜 본인은 자신의 기능을 정의만 할뿐 구현할 수는 없습니다.

하지만 extension을 활용한다면 이야기가 달라집니다.

extension을 활용하여 protocol의 초기화를 진행할 수 있는 것이지요.

protocol Person {
    var name: String { get }
    var age: Int { get }
    
    func getAge() -> Int
}

// 프로토콜 초기구현
extension Person {
    func getAge() -> Int {
        return self.age
    }
}

struct FireFighter: Person {
    var name: String
    var age: Int
    
    func extinguish() {
    }
}

var fireFighter = FireFighter(name: "롤스", age: 25)
print(fireFighter.getAge())  // 25



*출처: https://medium.com/@Alpaca_iOSStudy/protocol-oriented-programming-pop-2db7d4d02747
위와 같이 protocol에 있는 func getAge()을 extension을 활용해서 구현하는 것을 볼 수 있습니다.

그리고 해당 프로토콜을 채택한 값 타입에서는 이를 따로 정의하지 않고 사용할 수 있습니다.

Protocol + Extension ⇒ 프로토콜 초기화
프로토콜의 요구사항을 익스텐션을 통해 구현하는 것을 프로토콜 초기구현이하고 합니다.

 

물론 정의한 대로만 사용할 필요는 없습니다.

타입의 특성에 따라 조금 변경해서 구현하고 싶다면 재정의하면 됩니다.

이렇게 프로토콜 초기화를 활용하면 상속과 유사한 효과를 가져갈 수 있습니다.

 

이러한 프로토콜 초기화 패턴은 Swift 표준 라이브러리에도 많이 적용되어있고,

많은 사람들이 응용하여 사용하는 패턴입니다.

이를 활용하면 가볍고 안전한 코드를 짤 수 있을 뿐만 아니라 이를 바탕으로 짠 다른 코드를 더욱 잘 이해할 수 있습니다.

 

 

*참고

https://medium.com/@Alpaca_iOSStudy/protocol-oriented-programming-pop-2db7d4d02747

책: 야곰 스위프트 프로그래밍 3판

https://jinsangjin.tistory.com/101?category=828279