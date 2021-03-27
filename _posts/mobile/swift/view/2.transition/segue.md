3_1. 화면이동

Storyboard 에서 다른 ViewController 와 연결 -> Action Segue
출발점이 뷰 컨트롤러 자체인 경우 -> Manual Segue

```s
@IBAction func manualSegueBtn(_ sender: Any) {
 self.performSegue(withIdentifier: "ManualSegue", sender: self)
}
```

UIStoryboardSegue 클래스를 서브클래싱항 새로운 가능을 갖춘 세그웨이 객체정의 -> CustomSegue Storyboard 에서 segue 클릭 후 StoryboardSegue 탭에 class 를 새로 정의한 클래스로 설정

custom segue 정의

```s
import UIKit

class NewSegue: UIStoryboardSegue{
    
override func perform() {
    //세그웨이의 출발지 뷰 컨트롤러
    let srcUVC = self.source
        
    //세그웨이의 목적지 뷰 컨트롤러
    let destUVC = self.destination
        
    //fromView 에서 toView 로 뷰를 전환한다
    UIView.transition(from: srcUVC.view,
                    to: destUVC.view,
                    duration: 2,
                    options: .transitionCurlDown,
                    completion: nil)
    }
}
```

3_2. 뒤로이동

Storyboard 에서 상단의 Exit 아이콘과 연결(Action Segue, Manual Segue, Custom Segue)

1
@IBAction func goBackSegue(_ sender: UIStoryboardSegue){}
3_3. Segue 전처리 메소드

Segue 실행하기 전에 값을 저장해둘 필요가 있거나, 경고창을 띄워주는 등의 처리를 해야 할 경우 전처리 메소드 사용 - Segue 실행되기 전에 자동으로 실행됨

```s
override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    if(segue.identifier == "ActionSegue"){
        NSLog("action segue 실행!")
    }else if(segue.identifier == "ManualSegue"){
        NSLog("Manual segue 실행!")
    }else if(segue.identifier == "CustomSegue"){
        NSLog("Custom segue 실행!")
    }else{
        NSLog("알수없는 segue 입니다.")
    }
}
```

https://junghun0.github.io/2019/05/20/ios-screen-change/