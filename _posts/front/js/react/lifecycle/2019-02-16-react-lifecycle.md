---
layout: post
title: "react lifescyle정리"
author: negabaro kim
categories: react
tags: react js
---

UI를 구성하기 위해서는 화면에 컴포넌트를 그리고(Mounting), 갱신하고(Updating), 지워야(Unmounting) 함.
컴포넌트는 각 프로세스가 진행될 때에 따라 Lifecycle 함수로 불리는 특별한 함수가 실행되는데 개발자는 이를 재정의하여 컴포넌트를 제어함.

이 함수에는 최근 변화가 생겼는데 각 액션에 따른 변화는 이하와 같음.

# 마운트란?

컴포넌트가 처음 실행될 때 그것을 Mount라고 표현합니다. 컴포넌트가 시작되면 우선 context, defaultProps와 state를 저장합니다. 그 후에 componentWillMount 메소드를 호출합니다. 그리고 render로 컴포넌트를 DOM에 부착한 후 Mount가 완료된 후 componentDidMount가 호출됩니다.
https://www.zerocho.com/category/React/post/579b5ec26958781500ed9955

### 컴포넌트 생성시

#### before

Constructor -> ComponentWillMount -> render -> ComponentDidMount

#### after

Constructor -> getDerivedStateFromProps -> render -> ComponentDidMount

### prop변화시

#### before

componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

#### after

getDerivedStateFromProps -> shouldComponentUpdate -> render -> componentDidUpdate

### state변화시

#### before

shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

#### after

shouldComponentUpdate -> render -> componentDidUpdate

### 컴포넌트 제거

componentWillUnmount

안바뀜

## React.js component의LifeCycle Map

![image](https://user-images.githubusercontent.com/4640346/52930138-9fbd5680-338a-11e9-9374-f1b7aa7f8253.png)

![image](https://user-images.githubusercontent.com/4640346/52910220-ad65d400-32d7-11e9-865b-18dd551a72d5.png)

![image](https://user-images.githubusercontent.com/4640346/52909945-a5a43080-32d3-11e9-972a-574c22f5e5f7.png)

## 각 메소드의 의미

### constructor

처음에 실행됨
constructor(props)
초기화 처리등에 사용

### ComponentWillMount(React17이후에 삭제될 예정)

컴퍼넌트 마운트 직전에 한번 실행(render메소드 보다 먼저)되므로 초기화 처리에 사용
setState()하면 render시 한꺼번에 실행됨

통상적으로는 constructor에서 실행되므로 필요없음

### componentDidMount

마운트된후에 1번 실행되므로 DOM에 관계된 초기화처리에 사용
즉 render후에 실행됨.
메소드안에서 render된 DOM에 억세스함.

이 안에서 다른 JavaScript 프레임워크를 연동하거나,
setTimeout, setInterval 및 AJAX 처리 등을 기술

### componentWillReceiveProps(React17이후에 삭제될 예정)

컴포넌트가 프로퍼티값을 받을때(갱신했을때) 불려짐
부모 컴퍼넌트의 State가Props로서 넘겨지고 그변화를 표시이외의것으로 할때 사용

prop 에 따라 state 를 업데이트 해야 할 때 사용하면 유용
이 안에서 this.setState() 를 해도 추가적으로 렌더링 되지않음.

새로운 props는 취득하지 않기떄문에 변수로 받은 nextProps과 this.props를 비교후 어떤 처리를 하기도함

新しい props は取得していないので、引数の nextProps と this.props とで比較可能
setState も実行可能なので props の比較結果を state として扱う場合はこのメソッドで行う

컴포넌트 생성후에 첫 렌더링을 마친 후 호출되는 메서드다.
컴포넌트가 처음 마운트 되는 시점에서는 호출되지 않는다.
props를 받아서 state를 변경해야 하는 경우 유용하다.
이 메소드 내부에서 setState를 사용해도 추가적인 렌더링이 발생하지 않는다.

https://teratail.com/questions/175017?modal=q-comp
react17 以降から componentWillReceiveProp メッソドが削除される理由について

### getDerivedStateFromProps

componentWillReceiveProps과 같은 타이밍에 불려짐
componentWillReceiveProps과의 차이는 갱신할때 뿐만이 아니라 마운트시에도 불려진다는점

```
static getDerivedStateFromProps(nextProps, prevState)
```

현재 State값과 merge된후에 Props를 기준으로 State값을 갱신하고싶을때 사용하는

現在の State 値とマージされるので Props を元に State の値を更新したいような場面で使う
State を更新する必要がない時は、null を返す

### shouldComponentUpdate

コンポーネントを更新してもいいかの判断に使う
戻り値が False の場合は更新が行われないのでパフォーマンスで描画を抑制したいときに使う

prop 혹은 state 가 변경 되었을 때, 리렌더링을 할지 말지 정하는 메소드입니다.

위 예제에선 무조건 true 를 반환 하도록 하였지만, 실제로 사용 할 떄는 필요한 비교를 하고 값을 반환하도록 하시길 바랍니다.

예: return nextProps.id !== this.props.id;

JSON.stringify() 를 쓰면 여러 field 를 편하게 비교 할 수 있답니다.

引数に次の props と state を取得
shouldComponentUpdate(nextProps, nextState)
返り値として真偽値(true/false)を返す必要あり
props や state に変更があった際に実行され、返り値によって render を実行するか判断
デフォルトは true で常に render を実行する
主にパフォーマンスチューニングに使用
通常は React.PureComponent を継承して使用する

### componentWillUpdate(React17이후에 삭제될 예정)

컴포넌트가 업데이트 되기 전에 실행됩니다.

이 메소드 안에서는 this.setState() 를 사용하지 마세요 – 무한루프에 빠져들게 됩니다

引数に次の props と state を取得
componentWillUpdate(nextProps, nextState)
render 前に呼ばれる最後のライフサイクルメソッド
ここで setState などの再レンダリングを促す処理は行わない
shouldComponentUpdate で false を返した場合は実行されない
UNSAFE\_ componentWillUpdate

## getDerivedStateFromProps

componentWillUpdate と違い、更新前に必ず一度だけ呼ばれる
static getDerivedStateFromProps(nextProps, prevState)
DOM の更新前後の値を比較して何かしたい場合に使う

### componentDidUpdate

コンポーネントが更新された後に呼ばれる
メソッド内で再描画された DOM にアクセスできます

컴포넌트가 리렌더링을 마친 후 실행됩니다.

引数に前の props と state を取得
componentDidUpdate(prevProps, prevState, snapshot)
render 直後に実行される
アップデート後の DOM にアクセスするタイミングとして最適
API への変更完了通知にも利用可能
shouldComponentUpdate で false を返した場合は実行されない

### componentWillUnmount

컴포넌트가 DOM 에서 사라진 후 실행되는 메소드입니다.

コンポーネントがアンマウントされる前に呼ばれる
定期的に実行される処理や DOM のイベントを解除するために使う

コンポーネントがアンマウントされる直前に実行
各種コンポーネントに紐づいた処理のクリア等に使用

# エラーハンドリングに関するライフサイクルメソッド

### componentDidCatch

React v16 から実装
引数にスタックトレースが入った error とその他の情報が入った info を取得
componentDidCatch(error, info)
記述したコンポーネントのエラーは検知できないため、子コンポーネントで発生したエラーを検知するためのメソッド

### 라이프사이클 example

```
//コンポーネントの作成
class Component extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    console.log("컴퍼넌트 마운트 전에 실행됩니다.")
  }
  componentDidMount(){
    console.log("コンポーネントのマウント直後に呼ばれます")
  }
  componentWillReceiveProps(nextProps){
    console.log("コンポーネントが新しいpropsを受け取ったときに呼ばれます")
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log("コンポーネントがアップデートされる前1によばれます")
    return true;
  }
  componentWillUpdate(nextProps, nextState){
    console.log("コンポーネントがアップデートされる前2に呼ばれます")
  }
  componentDidUpdate(){
    console.log("コンポーネントがアップデートされた後に呼ばれます")
  }
  componentWillUnmount(){
    console.log("コンポーネントがアンマウントされる直前に呼ばれます")
  }
  render() {
    return (
      <div>Component</div>
    )
  }
};
```

outing: Creating 중인 componentWillMount()에서 Ajax 요청을 날리면 응답 시간만큼 컴포넌트를 그리는 것이 늦어짐을 알 수 있습니다. 따라서 일반적으로 componentDidMount()에서 Ajax 요청을 하는 게 낫다는 것을 알 수 있습니다.
Updating: Receiving State 중에 setState() API를 호출하면 프로세스가 끝난 후 또다시 Receiving State 할 것을 알 수 있습니다. 따라서 setState() API를 해당 Lifecycle 함수에서 호출하면 개념적으로 무한 루프에 빠질 수밖에 없다는 것을 알 수 있습니다. (물론 실제로도 무한 루프에 빠지게 됩니다.)

### 처음에 실행되는 라이프 사이클

サンプルを見ると一目瞭然だが、最初に実行されるライフサイクルは以下の 5 つである。

componentDidMount
render
componentWillMount
getInitialState
getDefaultProps
props は getDefaultProps ではなく ReactDOM.render で指定したほうが良いため、getDefaultProps はなるべく使用しないほうが良い。

getDefaultProps: function() {
return {name: 'foo'};
},

### 변경후의 라이프사이클

サンプルに a と入力すると以下の内容が表示される。

componentDidUpdate{"name":"foo"}{"len":0}
render
componentWillUpdate{"name":"foo"}{"len":1,"val":"a"}
shouldComponentUpdate{"name":"foo"}{"len":1,"val":"a"}

### Reference Link:

```
https://medium.com/@baphemot/understanding-react-react-16-3-component-life-cycle-23129bc7a705
https://iwb.jp/react-component-lifecycle-howto-sample/
https://qiita.com/f-a24/items/40b83d4c6c7d147cda9e
https://medium.com/little-big-programming/react%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-92c923011818
https://velopert.com/1130
https://morizyun.github.io/javascript/react-js-tips-lifecycle-outline.html
```
