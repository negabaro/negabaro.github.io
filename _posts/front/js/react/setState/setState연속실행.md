setState()는 오브젝트를 하나의 입력으로서 받아들이고, 우리는 count의 이전 값에 1만큼 증가시킵니다. 예상했던 대로 동작합니다. 그런데 한 가지 문제가 있습니다. state의 이전 값을 읽어 새 값을 작성하는 setState 호출이 여러 번 있을 때는 아마도 경합 조건(race condition)으로 끝나버릴 것입니다. 무슨 의미인가 하면, 최종 결과에서 예상했던 값이 안 나올 거라는 뜻입니다.
여기 명확히 이해할 수 있는 예제가 있습니다. 위의 Codesandbox 스니펫에서 적용해 보세요.

```js
// What is the expected output? Try it in the code sandbox.
handleCount(value) {
    this.setState({count: this.state.count+100});
    this.setState({count: this.state.count+value});
    this.setState({count: this.state.count-100});
}
```

100씩 셈이 더해지는 setState가 필요하고, 그 후에는 1씩 업데이트되며, 그러고 나서 이전에 더해진 100을 뺍니다. setState가 실제 순서대로 state 전환을 실행한다면, 예상된 동작을 볼 것입니다. 하지만 setState는 비동기식이라서 다수의 setState 호출은 더 나은 UI 경험과 실행을 위해 한꺼번에 배치될 것입니다. 고로 위의 코드는 우리의 예상과 다른 동작으로 동작하게 됩니다.

결과적으로 오브젝트를 직접 전달하는 것 대신에 특정한 업데이트 함수로 전달하게 됩니다.

(prevState, props) => stateChange
prevState는 이전 state를 레퍼런스하며 최신 상태로 값을 유지해줍니다. props는 컴포넌트의 props이며, 여기에서 state를 업데이트하는 데 props가 필요하진 않습니다. 고로 신경쓰지 않아도 됩니다. 그러니 우리는 이를 state 업데이트 용으로 사용해 경합 조건을 피할 수 있습니다.

```js
// The right way

handleCount(value) {

  this.setState((prevState) => {
    count: prevState.count +1
  });
}
```

setState()는 컴포넌트를 다시 렌더링하며, stateful component가 동작하게 됩니다.

https://code.tutsplus.com/ko/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541
