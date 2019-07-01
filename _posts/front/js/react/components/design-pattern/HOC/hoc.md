# HOC를 왜 알아야할까?

# HOC로 가능한것들

1. 코드 재사용, 로직 및 부트스트랩 추상화
2. Render Highjacking
3. 상태 추상화 및 조작(manipulation)
4. props 조작(manipulation)

HOC를 활용 할 수 있는 방법은 다양한데, 빈번히 사용 되는 때는 아래와 같다:
Container 컴포넌트와 Presentational 컴포넌트 분리: 비지니스 로직을 담당하는 컴포넌트(Container 컴포넌트)와 디스플레이를 담당하는 컴포넌트(Presentational 컴포넌트)를 분리하여 사용 할 때, 컨테이너 컴포넌트를 HOC를 만들어서 사용 할 수 있다.

로딩 중 화면 표시: 보통 SPA(Single Page App)에서 화면이 로딩 중일 때, Skeleton 화면을 보여주고, 로딩이 완료되면 데이터를 보여줄 때 사용 할 수 있다.
유저 인증 로직 처리: 컴포넌트 내에서 권한 체크나 로그인 상태를 체크하기 보다는 인증 로직을 HOC로 분리하면 컴포넌트 재사용성도 높일 수 있고, 컴포넌트에서 역할 분리도 쉽게 할 수 있다.
에러 메세지 표시: 컴포넌트 내에서 분기문(if/else 등)을 통해 처리 할 수도 있지만, 분기문을 HOC로 만들어 처리 하면 컴포넌트를 더욱 깔끔하게 사용 할 수 있다.
당연히 이 외에도 다양한 방법으로 HOC를 활용 할 수 있겠지만 여기선 이정도만 다뤄보자.
HOC를 만들 때 지키면 좋은 규칙

# 네이밍

Container HOC를 제외하고, 보통 HOC를 통해 새로운 prop을 주입 할 때 많이 사용 하는 규칙은 `with`로 시작하여 `withNewPropName` 식으로 네이밍하는게 좋다. 예를들면, withLoading, withAuth 등으로 주입 될 prop 명을 적어주는 식으로 말이다. 이렇게하면 실제로 HOC가 사용되는 컴포넌트에서 prop을 확인 할 때, 이 prop이 어디에서 왔는지 명확히 알 수 있기 때문이다.

# Display Name

React Dev Tool 등의 툴에서 디버깅을 위해 displayName을 명시 해주자.

# Higher-Order Components HOC란

가장 많이 쓰이는 형태가 아마 스토어와 컴포넌트를 연결시켜 주는 HOC일 것이다. 최근 가장 널리 쓰이는 react-redux의 connect 함수도 이런 역할을 하는데, 엄밀히 말해 HOC를 생성해주는 헬퍼 함수라고 할 수 있다. connect 함수는 스토어의 상태를 props로 주입시켜주는 mapStateToProps 와 액션 생성 함수를 스토어의 dispatch와 연결시켜 props로 주입시켜주는 mapDispatchToProps 를 인자로 받아서 새로운 HOC를 반환한다.

# hoc란

고차 컴포넌트 (HOC, higher-order component)는 컴포넌트 로직을 재사용하기 위한 React의 고급 기술입니다. 고차 컴포넌트는 그 자체로는 React API의 일부분이 아닙니다. 고차 컴포넌트는 React의 컴포넌트적 성격에서 나타나는 패턴입니다.

체적으로 고차 컴포넌트는 컴포넌트를 취하여 새로운 컴포넌트를 반환하는 함수입니다.

const EnhancedComponent = higherOrderComponent(WrappedComponent);
컴포넌트가 UI를 props로 변환하는 반면, 고차 컴포넌트는 컴포넌트를 다른 컴포넌트로 변환합니다.

고차 컴포넌트는 Redux의 connect 나 Relay의 createContainer 같은 타사 React 라이브러리에서 흔히 쓰입니다.

이 문서에서 고차 컴포넌트가 왜 유용한 지 이야기하고 어떻게 작성하는 지 설명합니다.

https://reactjs-kr.firebaseapp.com/docs/higher-order-components.html

# render 메소드에 HOC를 사용하면 안된다

render 메소드에 HOC를 사용 하게 되면 매번 render 메소드가 실행 될 때마다 아래처럼 EnhancedComponent가 새로 만들어지게 된다. 그렇기 때문에 HOC는 컴포넌트 외부에 선언 되어야 한다.

```js
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```

### Reference Link:

https://reactjs-kr.firebaseapp.com/docs/higher-order-components.html
https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-4-higher-order-component
https://medium.com/@shlee1353/higher-order-components-hoc-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EB%B2%95-9b4e21d5248b
https://meetup.toast.com/posts/137
