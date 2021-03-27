---
layout: post
title:  swift 다른 뷰 컨트롤러를 호출해서 화면이동하는 방법(using ViewController,modalTransitionStyle)
tags: swift
---


## 화면이동

스토리보드에 이동할 ViewController를 배치하고 classId를 SecondVC로 변경해줬다.

기존ViewController에서 이동할 버튼을 추가하고 해당 버튼을 Action드레그해서 moveNext라는 메소드
를 만들어줬고 SecondVC에 해당하는 ViewController에도 돌아가기 버튼을 만들어서 해당 버튼을 Action드레그해서 moveNext라는 메소드를 만들어줬다.

각 메소드의 코드는 아래와 같다.

전체코드는 [참고해서 만든코드]를 참고


### 앞으로 이동

```swift
@IBAction func moveNext(_ sender: Any){
    guard let uvc = self.storyboard?.instantiateViewController(identifier: "SecondVC") else {
      return
    } //스토리보드 내 SecondVC 뷰컨트롤러를 찾음
    
    uvc.modalTransitionStyle = UIModalTransitionStyle.coverVertical //화면 전환 속성
    
    self.present(uvc, animated: true) //애니메이션을 사용한다면 True 안하면 False
    
  }
```

### 뒤로이동

```swift
 @IBAction func back(_ sender: Any){
    self.presentingViewController?.dismiss(animated: true)
    
  }
```

---

 
## UIModalTransitionStyle

UIModalTransitionStyle 객체는 아래의 4가지 속성을 제공한다.


### 1. UIModalTransitionStyle.coverVertical

아래에서 위로 올라가면서 전환


### 2. UIModalTransitionStyle.crossDissolve

전화면에서 다음화면이 교차되며 뚜렷하게 표현되는 전환


### 3. UIModalTransitionStyle.flipHorizontal

화면 중앙 축을 기준으로 회전하며 전환

 
### 4. UIModalTransitionStyle.partialCurl

화면 오른쪽 아래에서 페이지가 올라가는 효과로 전환


---



[Link1]: https://lazyowl.tistory.com/entry/Swift-%ED%99%94%EB%A9%B4%EC%A0%84%ED%99%98-ViewController-%EC%A7%81%EC%A0%91-%ED%98%B8%EC%B6%9C

[참고한 코드]: https://github.com/2jae6/Swift-Example/tree/master/PresentDismiss

[참고해서 만든코드]: https://github.com/negabaro/SwiftHandsOn/tree/master/SwiftTransitionWayViewCallDiffrentView/SwiftTransitionWayViewCallDiffrentView
