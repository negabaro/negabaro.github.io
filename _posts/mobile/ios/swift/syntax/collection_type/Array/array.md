1. 빈 array 만들기
var someInts = [Int]()

//인자 추가하기
someInts.append(3)

//다시 빈 배열로 만들기
someInts = []
 
2. 값이 있는 array 만들기
//1. default 값이 있는 배열 만들기
var threeDoubles = Array(repeating: 0.0, count: 3)  //reseult: [0.0, 0.0, 0.0]

//2. 배열 생성과 함께 값 넣기
var numList: String = [1,2,3]
var numList = [1,2,3]
var stringList = ["ray", "dalio"]
 
3. array 관련 메서드
//원소 갯수 확인
stringList.count    // result: 2

//Array가 비어 있는지 확인
stringList.isEmpty    // result: false

//원소 더하기
stringList.append("star")
stringList += ["bucks", "coffee", "latte"]

//index
var firstItem = stringList[0]    // result: ray

//slice
var selectedItem = stringList[1..3]   //result: ["dalio", "star", "bucks"]

//insert(특정 index에 추가하기)
stringList.insert("syrup", at:0)

//remove
let componentRemoved = stringList.remove(at:0)
let componentRemoved = stringList.removeLast()

//enumerated
for (idx, val) in stringList.enumerated(){
	
}

//정렬
stringList.sort()

https://jinsangjin.tistory.com/91?category=828279