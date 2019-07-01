React 공식 문서에서는 stateless functional component라는 용어로 해당 컴포넌트를 설명하고 있습니다.

개발자들 사이에서는 `Pure Component`, `Dumb Component`, `Presential Component` 라고 불리기도 합니다.

UI를 구성하게 되는 Component 중 state가 없거나 LifeCycle API를 사용할 일이 없는 경우 함수를 사용하여 정의합니다. 즉, 렌더링의 역할만 수행하는 컴포넌트를 정의할 때 사용하는 방식이라고 할 수 있습니다.

https://jaeyeophan.github.io/2017/05/19/React-2-Elements-and-Component/

그말은 즉 함수형 오브젝트 =SFC？？

https://velopert.com/2994

React 0.14에서 Stateless Functional Components가 도입되었다. 바로 컴포넌트를 렌더링하는 함수들이다. 문법이 더 간단하다. 클래스 정의나 컨스트럭터는 존재하지 않는다. 그 이름이 뜻하는 바와 같이 상태 관리도 없다(setState를 쓰지 않는다).
