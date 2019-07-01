하지만, React.PureComponent를 확장해서 컴포넌트를 만들면, shouldComponentUpdate 메쏘드를 선언하지 않았다고 하더라도, PureComponent 내부에서 props와 state를 shallow level 안에서 비교 하여, 변경된 값이 있을 시에만 리렌더링 하도록 되어 있다.

이를 제외하곤 React.Component와 React.PureComponent의 다른 점은 없다. 그렇다면, 함수형 컴포넌트가 클래스 기반의 컴포넌트와 다른점은 무엇일까? 함수형 컴포넌트는 클래스 기반의 컴포넌트와 달리, state, 라이프 사이클 메소드(componetDidMount, shouldComponentUpdate 등등..)와 ref 콜백을 사용 할 수 없다는데 있다(context는 사용 할 수 있다). 언뜻 보면, 함수형 컴포넌트가 state도 없고, 라이프 사이클도 신경쓰지 않기 때문에, 클래스 기반의 컴포넌트 보다 퍼포먼스가 뛰어날 것이라고 예상 하지만 실제로는 그렇지 않다.

https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-%EA%B8%B0%EC%B4%88-component-vs-purecomp

그렇다면, 항상 React.PureComponent를 사용 하는게 좋다고 할 수 있을까? 대답은 당연히 아니다. 위에서도 언급 했지만, PureComponent는 shallow level로만 데이터를 비교하기 때문에, nested object 등의 변경된 데이터는 감지하지 못하기 때문에 React.Component의 shouldComponentUpdate 직접 다뤄야 한다. 또한, 퍼포먼스 적으로도 모든 컴포넌트에 PureComponent를 사용 하는 것은 오히려 앱을 더 느리게 할 수도 있다.

https://wonism.github.io/react-pure-component/

React.PureComponent는 React.Component와 매우 유사하다. 하지만 한 가지 다른 점이 있다면, React의 생명주기 메소드 중 하나인 shouldComponentUpdate를 다루는 방식이 다르다는 것이다.
React.PureComponent는 shouldComponentUpdate가 이미 구현되어 있는데, props와 state를 얕은 비교를 통해 비교한 뒤 변경된 것이 있을 때만 리렌더링한다.
즉, React.PureComponent를 사용하면 React애플리케이션 성능을 향상시키는 데 가장 중요한 것 중 하나인 shouldComponentUpdate를 신경쓰지 않아도 된다.
하지만 props나 state가 복잡한 데이터 구조를 포함하고 있다면, props와 state를 비교하는 과정에서 의도하지 않은 결과가 발생할 수 있다.
(얕은 비교(shallow comparison)와 깊은 비교(deep comparison)의 차이를 알면 무슨 의미인지 알 것이다.)

React에는 PureComponent가 존재하는데, Component와 유사하지만 라이프사이클의 shouldComponentUpdate에 얕은 비교(shallow comparison)를 하는 코드가 구현된 컴포넌트를 PureComponent라고 한다. React의 렌더링에서 shouldComponentUpdate가 true를 반환하면 재랜더링을 하는 구조인데, props와 state가 기존과 동일한 경우 불필요한 상황에서 재렌더링을 방지하여 성능을 향상시키려는 목적에서 만들어졌다.
PureComponent는 성능을 최적화하는데 활용되므로 성능상의 이슈에 맞닥뜨리지 않는 한 이 컴포넌트를 사용해야 하는지 고려할 필요는 없다.

https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EC%83%81%ED%83%9C-%EA%B0%9D%EC%B2%B4

https://teratail.com/questions/171633#reply-256816
