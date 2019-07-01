Redux-Form
보편적으로 Redux와 함게 가장 많이 사용하는 라이브러리, 기능과 성숙도가 높으나 러닝커브가 조금 있습니다.

결론적으로는 Redux-Form 개발하다가 React-Redux-Form을 따로 적용 해보았고 2% 부족함을 느껴 결론적으로는 Redux-Form을 사용했습니다.(Redux로 개발 시)

React-Redux-Form
일단 문서가 깔끔하고 redux-form에 비하여 깔끔한 설정 때문에 코드를 구현 해보았습니다. 하지만 최종적로 몇가지 기능의 코드 패턴이 매우 번잡스러워 결국은 Redux-Form으로 돌아 왔습니다.

편의성 3/5
문서 4/5
커스텀 스타일 : 가능
코드구성 복잡도 : 3/5

Redux-Form 과 비교
장점
Redux 와 연결 작업 코드 구분은 Redux-Form에 비해 약간 깔끔, 기본적으로 Field에 설정하는 prop들이 Redux-Form에 비해 약간 간결한 느낌이였습니다. 문서는 Redux-Form보다 훨씬 잘되어 있다고 느겼습니다.

단점
Validation 구현 아주 깔끔하지 않고 번잡 스러움 (함수로 바로 구현 하거나 , 오류 메시지 부분도 따로 명시적으로 구현), Redux-Form이 더 깔끔, redux-form 은 validation 관련 boolean 과 메시지를 prop으로 제공해줘서 그냥 명시하면되는데 React-Redux-Form은 validation 이후 error 메시지, error class 처리를 하기 위한 자유도가 낮고 구현 하려면 번잡스럽게 구현(제일 큰단점), redux store에 저장된 form state 접근이 redux-form 이 제공하는 것 보다 엄청 복잡, state에 form의 값만 있는게 아니라 엄청 많은 값들이 들어 가 있는데 그걸 보고 작업자가 직접 추려야 ,됨 반면 redux-form은 다양한 selector를 제공해서 원하는 값을 딱 추려서 가져올수 있습니다.

총평
React-Redux-Form이 Redux-Form을 불편한 기능을 해결해 줄 것을 기대 하였으나 redux와 연결, fileld의 설청 prop들 몇가지 선언 구문은 깔끔해 졌지만 validation 처리를 깔끔하게 처리하는 기본 방법이 제공 되지 않는 것이 제일 큰 단점으로 작용하고 오히려 자동화된 기능이 redux-form보다 더 부족함다는 느낌을 받았습니다. (많은 기대를 했는데 ㅠㅠ).

Formik
가벼운 라이브러리라고 표방하지만 validation이 각필드에 정의 되는 방식이 아니라 모든 필드의 validation을 한꺼번에 따로 설정하는 방식이라 너저분한 방식의 느낌이 강함하고 문서가 가독성이 떨어지는 스타일로 제공되고 있습니다.

편의성 3/5
문서 2/5
커스텀 스타일 : 가능
코드구성 복잡도 : 4/5
redux-form 과 비교 : 장점이 낮음

Formsy-React
Validation을 각필드에 선언 할수 있지만 그외 error 메시지 표시, 필수여부 onClick onChange, onSumit같은 조작들은 한땀 한땀 해줘야 하는 방식이라 library에서 제공하는 것이 많이 없음, 문서가 github 문서 뿐입니다.

편의성 2/5
문서 2/5
커스텀 스타일 : 가능
코드구성 복잡도 : 3/5
redux-form 과 비교 : 장점이 낮음

React-Form
Validation을 각필드에 구성하는 방식이지만, 나머지 event 및 오류 표시는 직접 해야됨 코스 스타일 복잡도도 그렇게 낮은 편은 아닙니다.

편의성 2/5
문서 3/5
커스텀 스타일 : 가능
코드구성 복잡도 : 3/5
Redux-Form 과 비교 : 장점이 낮음
http://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html
