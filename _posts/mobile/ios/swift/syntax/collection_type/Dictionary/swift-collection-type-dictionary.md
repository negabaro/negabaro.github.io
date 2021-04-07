Dictionary
1. dictionary 생성
//값이 없는
var nameOfIntegers = [Int: String]()

//값이 있는
var namePair: [String: String] = ["ray":"dalio", "peter":"lynch"]
var namePair = ["ray":"dalio", "peter":"lynch"]
 

2. dictionary 관련 메서드
//갯수
namePair.count

//isEmpty
namePair.isEmpty

//추가
namePair["micheal"] = "jordon"
namePair.updatevalue("heungmin", forKey: "son")  //updateValue는 옵셔널을 반환함.

//수정
namePair["micheal"] = "wee"
namePair.updatevalue("byungho", forKey: "son")

//삭제
namePair.removeValue(forKey: "son")
namePair.removeAll()
namePari = [:]

//for loop
for firstName in namePair.keys{

}
for lastName in namePair.values{

}

//key값 또는 value 값만 뽑기
let firstName = [String](namePair.keys)
let lastName = [String](namePair.values)


https://jinsangjin.tistory.com/91?category=828279