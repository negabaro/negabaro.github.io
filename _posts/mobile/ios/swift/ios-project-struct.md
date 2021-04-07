
1. main함수 실행

2. main함수에서 AppDelegate를 통해 UIApplicationMain 함수를 호출

3. UIApplicationMain 함수에서는 UiApplication 객체를 생성

4. UIApplication 객체는 Info.plist 파일을 바탕으로 앱에 필요한 데이터와 객체를 로드

5. AppDelegate 객체를 생성하고 UIApplication객체와 연결한다.

6. 실행에 필요한 기타 코드를 구현한다.

7. 실행 완료 직전, AppDelegate의 application(_:didFinishLaunchingWithOptions:) 메소드를 호출한다.


1.2 앱의 상태 변화
앱의 상태는 시작, 종료, 화면으로부터 숨겨짐 등의 상태를 말합니다. 앱의 상태는 다음과 같이 5가지로 나뉩니다.

Not Running : 앱이 시작되지 않았거나 실행되었지만 시스템에 의해 종료된 상태
Inactive : 앱이 전면에서 실행중이지만 아무런 이벤트를 받지않고 있는 상태
Active : 앱이 전면에서 실행중이고 이벤트를 받고 있는 상태
Background : 앱이 백그라운드에 있지만 코드가 실행되고 있는 상태
Suspend :  앱이 메모리에 유지되지만 실행되는 코드가 없는 상태, 포그라운드에 있는 앱의 여유 메모리 공간을 확보하기위해 특별한 알림없이 정리됨


앱의 실행 상태가 변할때 마다 AppDelegate에 정의된 특정 메소드를 호출합니다. 
주요 메소드 몇가지를 살펴보면 다음과 같습니다.
application(_:willFinishLaunchingWithOptions:)
앱이 구동되어 필요한 초기 실행 과정이 완료되기 직전 호출
application(_:didFinishLaunchingWithOptions:)
앱이 사용자에게 화면으로 표시되기 직전에 호출
applicationDidBecomeActive(_:)
포그라운드, 화면 전면에 표시될 때 호출되는 메소드, Inactive 상태에 들어가 일시 중지된 작업이 있을 때 이를 재시작 하는 코드를 작성합니다.
applicationDidEnterBackground(_:)
앱이 백그라운드 상태에 진입했을 때 호출
applicationWillTerminate(_:)
앱이 종료되기 직전에 호출
이 외에도 다양한 상태 변화에 대응하는 메소드를 구현할 수 있고 자세한 내용은 UIAppDelegateProtocol의 공식 문서를 참고하면 됩니다.
1.3 View Controller 상태변화와 생명주기
 iOS에서 가장 기본이 되는 컨트롤러로써, iOS앱은 하나 이상의 뷰 컨트롤러로 구성됩니다.
View Controller 는 뷰가 사용자와 상호작용 할 수 있도록 필요한 코드를 구현하는 클래스입니다.

뷰 컨트롤러는 네가지 상태로 나눌 수 있습니다.
Appearing : 스크린에 등장하기 시작한 순간부터 등장을 완료하기 직전까지의 상태
Appeared : 뷰 컨트롤러가 스크린 전체에 완전히 등장한 상태
Disappearing : 스크린에서 가려지기 시작해 완전히 가려지기 직전까지의 상태
Disappeared : 스크린에서 완전히 가려졌거나 퇴장한 상태

---

https://yzzzzun.tistory.com/23?category=821187
