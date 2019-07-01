redux-thunk를 사용하면, 위의 시나리오처럼 action이 단순히 명령만 내리고, 재료를 전달하는 역할로 끝나지 않고 action 또한 뭔가 으쌰으쌰 일을 수행한다. 그리고 그 action이 하는 일은 Side-Effect(부수효과)를 만들어낸다.
예를 들어보면, redux-thunk가 없고 Side-Effect가 없는 상태를 먼저 보자.

그리고 redux-saga는 위의 문제를 해결해줄 뿐만 아니라 redux-saga만의 강점이 있는데
es6의 generator에서 착안한 라이브러리이기 때문에 비동기로 작동하는 코드를 동기적인 코드로 나타낼 수 있다.
동기적인 코드 구조를 지니기 때문에 디버깅과 테스트에 매우 용이하다.
callback에서 자유로워 지기 때문에 가독성이 높은 코드를 작성할 수 있다.
promise와 조합하여 사용할 경우 예외 처리를 하는데에도 좀 더 직관적으로 코드를 작성할 수 있다.
등등이 있다.

또한 redux-saga의 러닝 커브를 높이는 요소로 es6의 generator 개념을 이해해야 하고, 해당 라이브러리의 effect 메소드인 take나 fork, put, call, select 같은 메소드들을 이해해야 한다는 점이다.
사실 라이브러리의 주요 메소드들을 파악해야 하는 건 모든 라이브러리의 공통사항인데 굳이 이걸 지적한 이유는,

https://www.vobour.com/00-redux-saga-
