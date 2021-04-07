1. set 만들기
//비어있는 set
var letters = Set<Character>()

//값이 있는 set
var coinList: Set<String> = ["bitcoin", "eth", "eos"]
var coinList: Set = ["bitcoin", "eth", "eos"]
 

2. set 관련 메서드
//갯수
coinList.count

//isEmpty
coinList.isEmpty

//추가
coinList.insert("ripple")

//삭제
coinList.remove("eth")

//정렬
coinList.sorted()

//특정 원소가 있는지 확인
coinList.contains("ripple")
 

3. 집합 계산
let oddDigits: Set = [1, 3, 5, 7, 9]
let evenDigits: Set = [0, 2, 4, 6, 8]
let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]

//합집합
oddDigits.union(evenDigits).sorted()  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//교집합
oddDigits.intersection(evenDigits).sorted()  // []
//차집합
oddDigits.subtracting(singleDigitPrimeNumbers).sorted()  // [1, 9]
//합집합 - 교집합
oddDigits.symmetricDifference(singleDigitPrimeNumbers).sorted()  // [1, 2, 9]

[]: https://jinsangjin.tistory.com/91?category=828279
