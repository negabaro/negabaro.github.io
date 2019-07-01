하위, 상위 컴포넌트에 데이터를 props로 넘겨주는게 너무 관리하기 힘들어서 선택한다. 하나의 Store(Object)에 SPA의 모든 데이터를 보관한다. 대안으로는 Event Bus Component를 만들면 되는데, 하나의 스토어를 갖는게 그게 그거라 거의 강제된다.

Saga는 제너레이터 함수이기 때문에, 비동기처리를 간단히 다룰 수 있습니다.

yield take(ACTION_TYPE)으로 지정한 action의 발생을 감시한다
가져온 action을 구워먹고 삶아먹고 마음대로 할 수 있다
yield put(action)의 결과를 다른 action으로 내보낼 수 있다
https://medium.com/@whatauseless/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6

saga란 action에 대한 listener이다.
음.. 액션 리스너구나. 이벤트 리스너같은 것이군.
