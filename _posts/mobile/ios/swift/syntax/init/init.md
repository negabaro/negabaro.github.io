Swift 이니셜라이져 init()
버그 잡기는 흥미진진해 버그잡이 2020. 7. 30. 21:56
해당 내용은 "swift 프로그래밍 3판(저자: 야곰)" 을 보고 정리한 내용임을 밝힙니다.

 

 

 

 

init()
: 생성자로, 인스턴스의 첫 사용을 위한 초기화 작업을 수행

 

구조체와 클래스의 인스턴스는 처음 생성할 때 프로퍼티에 적절한 초깃값을 할당해야 합니다.

init()을 통해서 이를 할당할 수 있습니다.

class Starbucks(){
  var coffee: String

  init(){
  coffee = "latte"
  } 
}

let starbucks = Starbucks()
print(starbucks.coffee)   // "latte"


//초기값이 아니라 기본값으로 지정할 수도 있습니다.
class Starbucks(){
	var coffee: String = "latte"
} 
 
 

Init() 매개변수
 

init은 매개변수를 가질 수 있습니다.

class Starbucks(){
  var coffee: String

  init(name: String){
    coffee = name
  } 
}

let starbucks = Starbucks(name: "Latte")
print(starbucks.coffee)  // "latte"
 

두 개 이상의 Init() 을 가질 수 있습니다.

class Starbucks(){
  var coffee: String
  var price: Int = 3000

  init(name: String){
    coffee = name
  } 
  init(price: Int){
    self.price = price
  } 
}

let starbucks = Starbucks(name: "Latte")
print(starbucks.price)  // 3000

let starbucks2 = Starbucks(name: "GreenTea", price: 4000)
print(starbucks2.price)  // 4000
 

 

 

옵셔널(?) 프로퍼티 / 상수(let) 프로퍼티
초기화 과정에서 값을 초기화 하지 않아도 되는 프로퍼티는 옵셔널로 선언할 수 있습니다.
프로퍼티는 변수가 아닌 상수로도 설정할 수 있습니다.
class Person {
  let name: String  //상수 프로퍼티는 초기화 이후 값을 변경하여 사용할 수 없습니다.
  let age: Int?     //옵셔널 프로퍼티는 초기화 없이 사용 가능합니다.

  init(name: String){
    self.name = name
  }
}
 

 
구조체는 내재적으로 init()을 제공합니다.
이를 Memberwise initialize라고 합니다.

struct Size {
  var width: Double = 0.0
  var height: Double = 0.0
}

let size = Size(width: 50)
클래스는 이를 제공하지 않습니다. Memberwise initialize는 구조체에만 있습니다.

 

 

 

self.init()
초기화 위임은 코드의 중복을 피하기 위해서 이니셜라이저가 다른 이니셜라이저에게 일부 초기화를 위임 하는 것입니다.

코드로 바로 살펴보겠습니다.

class Person {
  var age: Int  

  init(age: Int){
	  self.age = age
  }

  init(americaAge: Int){
	  self.init(age: americaAge+1)
  }
}

//위 처럼 init 안에서 init을 호출함으로써 중복 코드를 줄일 수 있습니다.
 
 
실패 가능한 Init()
init()으로 인스턴스를 초기화 할 수 없는 경우도 있습니다.

대표적인 예로 "init()의 전달 인자로 잘못된 값이 전달되었을 때"가 있습니다.

이런 경우 init()은 nil을 반환합니다.

즉, 반환 타입이 옵셔널로 지정되고 init 대신 init? 키워드를 사용합니다.

class Person {
  var age: Int  

  init?(age: Int){
    if age <= 0 {
      return nil
    }
  	self.age = age
  }
}

//인스턴스를 사용할때도 해당 타입은 옵셔널 입니다.
let ray: Person? = Person(18)
 

 

실패 가능한 init()은 구조체와 클래스에도 유용하지만 특히 열거형에서 유용합니다.

특정 case에 맞지 않는 값이 들어오면 생성에 실패하는 것이지요.

enum PassOrFail: String {
		case pass = "통과", fail = "실패"

		init?(score: Int){
			switch score {
				case 50...100:
					self = .pass
				case 0...49:
					self = .fail
				default:
					return nil
			}
		}
}

let myResult = PassOrFail(score: -10)  //nil

https://jinsangjin.tistory.com/93?category=828279