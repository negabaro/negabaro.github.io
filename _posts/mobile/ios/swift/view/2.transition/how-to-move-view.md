
## 화면 전환 방법 네 가지

1. ViewController의 view를 바꿔치기
2. ViewController가 다른 ViewController 호출(present)
3. NavigationController 사용하여 화면전환(push)
4. 화면전환용 객체 Segue 사용


## ViewController의 view를 바꿔치기

메모리 overflow 위험이 있기 때문에 좋은 방법이 아니라고 합니다.

https://twih1203.medium.com/swift-ios-%ED%99%94%EB%A9%B4%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-5e5998679d3a


## NavigationController 사용하여 화면전환(show == push)

이 방법으로 화면 전환을 하려면 먼저 Navigation Controller를 embed in 해주어야 합니다.
그 뒤에 다음과 같은 코드를 작성합니다.

```swift
let pushVC = self.storyboard?.instantiateViewController(withIdentifier: "vcStoaryBoardID")
self.navigationController?.pushViewController(pushVC!, animated: true)
```

## 화면전환용 객체 Segue 사용

Segue를 사용하는 이 방식은 StoaryBoard 상에서 경로가 시각적으로 나타납니다.

이 Segue 종류에는 두 가지(Action Segue, Manual Segue)가 있고
ViewController를 나타내는 방법에는 5가지가 있습니다.


1. Show
2. Show Detail
3. Present Modally
4. Present As Popover
5. Custom

https://doodledevnote.tistory.com/25