---
layout: post
title: "react HOC란?"
author: negabaro kim
categories: react
tags: react js
---

## Higher Order Components(HOC)란?

고차 컴포넌트 = Higher Order Components(HOC)
한마디로 말하면 HOC는 다른 컴포넌트를 감싸는 리액트 컴포넌트다.
HOC는 자바스크립트의 HOF(Higher Order Function)에서 F(Function) 대신 C(Component)를 리턴 하는 것
바꿔말하면 HOC는 리액트 컴포넌트를 인자로 받아서 새로운 리액트 컴포넌트를 리턴하는 함수

## example

HOC를 만드는 패턴은 2가지로 Class 기반 컴포넌트와 Function 기반 컴포넌트를 리턴 하는 방식이 있다.

### Functional Component를 리턴

```
const withHOC = WrappedComponent => {
  const newProps = {
    loading: false,
  };
  return props => {
    return <WrappedComponent {...props} {...newProps} />
  }
};
```

### Class Component를 리턴

```
const withHOC = WrappedComponent => {
  const newProps = {
    loading: false,
  };
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
};
```

## HOC를 사용시

```
export default withHOC(AnyComponent);
```

## HOC사용패턴

기본적으로 DRY한 코드를 짜기 위해 사용됨

### Container 컴포넌트와 Presentational 컴포넌트 분리

비지니스 로직을 담당하는 컴포넌트(Container 컴포넌트)와 디스플레이를 담당하는 컴포넌트(Presentational 컴포넌트)를 분리하여 사용 할 때,
컨테이너 컴포넌트를 HOC를 만들어서 사용

### 로딩 중 화면 표시

보통 SPA(Single Page App)에서 화면이 로딩 중일 때, Skeleton 화면을 보여주고, 로딩이 완료되면 데이터를 보여줄 때 사용

### 유저 인증 로직 처리

컴포넌트 내에서 권한 체크나 로그인 상태를 체크하기 보다는 인증 로직을 HOC로 분리하면 컴포넌트 재사용성도 높일 수 있고, 컴포넌트에서 역할 분리도 쉽게 할 수 있음.

### 에러 메세지 표시

컴포넌트 내에서 분기문(if/else 등)을 통해 처리 할 수도 있지만, 분기문을 HOC로 만들어 처리 하면 컴포넌트를 더욱 깔끔하게 사용 할 수 있음.

## 네이밍

Container HOC를 제외하고, 보통 HOC를 통해 새로운 prop을 주입 할 때 많이 사용 하는 규칙은 `with`로 시작하여 `withNewPropName` 식으로 네이밍함

ex) withLoading, withAuth

이렇게하면 실제로 HOC가 사용되는 컴포넌트에서 prop을 확인 할 때, 이 prop이 어디에서 왔는지 명확히 알 수 있음.

## 주의 사항

### render 메소드에 HOC를 사용하면 안된다

render 메소드에 HOC를 사용 하게 되면 매번 render 메소드가 실행 될 때마다 아래처럼 EnhancedComponent가 새로 만들어지게 된다. 그렇기 때문에 HOC는 컴포넌트 외부에 선언 되어야 한다.

### Reference Link:

```
https://meetup.toast.com/posts/137
https://velopert.com/3537
https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-4-higher-order-component
https://www.vobour.com/%EC%83%81%EC%84%B8%ED%95%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-higher-order-components-%EC%84%A4%EB%AA%85-react
```
