# Reconciliation: The diffing algorithm

React의 Reconciliation은 어떤 변경에 대한 전/후 엘리먼트 트리를 비교(Diff)하여 갱신이 필요한 부분만을 찾아 업데이트하는 것을 의미한다. React는 렌더링에서 Reconciliation 작업을 선행하기 때문에 플랫폼 UI에 대한 제어를 최소화 시키는 것이다(보통 UI 제어 비용은 비싸기 때문이다). 즉 브라우저에서 DOM에 대한 제어를 최소화시키는 것이다.

다시 한번 정리해보면, React 컴포넌트는

render()에서 새로운 엘리먼트 트리를 생성하고,
이전 엘리먼트 트리와 비교하여 변경 점을 찾아 업데이트한다.
그런데 기존의 Diff 알고리즘은 O(n^3)의 시간복잡도를 가지고 있다. 그래서 React는 다음 두 가지 가정을 가지는 휴리스틱 알고리즘으로 O(n)에 근사할 수 있도록 구현하였다.

다른 타입의 두 엘리먼트는 다른 트리를 만들 것이다.
각 렌더링에서 유지되는 엘리먼트에 key 프로퍼티를 통해 같은 엘리먼트라는 것을 알린다. (같은 레벨에서만 유효하다.)
이제 Diff 방식을 조금 더 자세히 알아보자.

# Level By Level

트리를 비교할 때 기본적으로 서브트리들의 위치(level-by-level)를 기준으로 비교한다.

9e96aa72-1307-11e7-8c05-dfb7b33cd7be.png

Elements Of Different Types
같은 위치에서 엘리먼트의 타입이 다른 경우,

기존 트리를 제거 후 새로운 트리 만든다.
기존 트리 제거시 트리 내부의 엘리먼트/컴포넌트들은 모두 제거한다.
새로운 트리를 만들 때 내부 엘리먼트/컴포넌트들도 모두 새로 만든다.

# Avoid Reconciliation

앞서 설명한 대로 React는 Reconciliation에서 O(n)의 시간복잡도를 가지고 있으며, 필요 이상의 DOM 접근이나 업데이트를 피하기 때문에 일반적인 경우 성능에 대해 고민 하지 않아도 된다.

하지만 컴포넌트가 렌더링하는 엘리먼트가 수천 수만 개라면? O(n)도 느리다.

개발자는 일부 경우에 실제 렌더링이 필요 없는 상황을 알고 있다. 그래서 컴포넌트가 렌더링 전에 호출하는 라이프사이클 메서드 shouldComponentUpdate()를 오버라이드하여 성능을 향상시킬 수 있다. React의 shouldComponentUpdate 기본 구현은 return true이기 때문에, 오버라이드하지 않은 경우에는 항상 Reconciliation을 포함한 렌더링 작업을 수행한다. 개발자는 컴포넌트 렌더링이 필요 없는 때에만 return false를 통해 React의 불필요한 렌더링 작업을 방지할 수 있다.

# React-Addons-Perf

React는 일반적으로 reconciliation, avoid-reconciliation, production build 등의 기법을 통해 빠르게 동작한다. 하지만 일반적인 방식만으로는 복잡한 앱을 개발하기 어려울 때가 있고, 개발자가 실수할 수도 있고, 너무 많은 데이터 처리 등의 여러 상황에 따라 원하는 성능을 얻지 못할 수 있다.

앞서 살펴본 ShouldComponent In Action의 C8의 경우는 불필요한 성능 하락의 원인인데, 개발자는 이런 경우를 찾아 없애야 한다.

그런데 성능 문제가 있는 컴포넌트를 코드만 보고 찾기는 어렵다. 성능 측정 도구인 react-addons-perf를 통해 렌더링 성능을 정확히 측정하고, 성능 하락의 원인을 찾을 수 있다.

측정하기

```js
Perf.start();
// ....
Perf.stop();

const measurements = Perf.getLastMeasurements();
```

1. start(): 측정 시작
2. stop(): 측정 끝
3. getLastMeasurements(): 가장 마지막 측정 결과 가져오기
   결과 출력

```js
Perf.printInclusive(); // Last measurements
Perf.printInclusive(measurements);

Perf.printExclusive(); // Last measurements
Perf.printExclusive(measurements);

Perf.printWasted(); // Last measurements
Perf.printWasted(measurements);

Perf.printOperations(); // Last measurements
Perf.printOperations(measurements);
```
