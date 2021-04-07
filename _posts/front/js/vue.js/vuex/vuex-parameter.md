
## 복수의 파라메터를 넘기는 방법


```js
const id = 1
const name = 'userA'
this.$store.dispatch('testAction', { userId: id, userName: name })
```

```js
testAction({ commit }, { userId, userName }) {
  const userData = 'userId:' + userId ', userName:' + userName
  commit('testMutation', userData)
}
```

引数に複数の値を渡したい場合は { userId: id, userName: name } のように、オブジェクトとして渡すとオッケーです！


# rootState

actions,getters에서 rootState접근이 가능



vuex store설정을 모듈을A,B로 나눴을때 B모듈 에서 이하와 같이 mutaion을 갱신하고

｀｀｀state.message = payload.message;｀｀｀
A모듈에서 B모듈의  ｀store.state.message｀에  접근할 수 있는 방법이 있나요?

mutation 말고 actions 에서 접근할수 있습니다

{ commit, rootState } ← rootState 를 참조하실 수 있어요


https://qiita.com/after666/items/7e94d61fed89406ae59a
https://qiita.com/after666/items/7e94d61fed89406ae59a