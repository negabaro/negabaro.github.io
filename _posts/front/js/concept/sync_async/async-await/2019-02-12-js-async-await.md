`await (() => new Promise(res => window.daum.maps.load(res)))();`
아 promise 만세에여! ㅠㅠ
callback을 promise로 변환할 수 있더라고요! 이제야 알아가지고 마구 써먹고 있습니다ㅎㅎ

`await (() => new Promise(res => window.daum.maps.load(res)))();`
아 promise 만세에여! ㅠㅠ
callback을 promise로 변환할 수 있더라고요! 이제야 알아가지고 마구 써먹고 있습니다ㅎㅎ

moondaddi ムヌデディ [10:36 PM]
요렇게 작성하시면 unnamed arrow function이 new Promise를 return하고 그걸 await하는 방식으로 작동하는게 되는거 같습니다.
res로 값이 받아와지나요?
굳이 이런 형태로 작성한다면 이렇게 하면 어떤가 싶습니다
`await (() => new Promise(resolve => resolve(값)))`

await (() => new Promise( (resolve, reject) => { ...값을 받아와서...; resolve(값) } ) )

```
componentWillMount() {
    (async () => {
      const token = cookie.load("jwt");
      if (token) {
        const user = await currentUser(token)
        this.props.onLoad(user, token);
      }
    })();
  }
```

```
  componentWillMount() {
    this.onLoad();
  }

  async onLoad() {
    const token = cookie.load("jwt");
    if (token) {
      const user = await currentUser(token)
      this.props.onLoad(user, token);
    }
  }
```

```
componentWillMount() {
    const token = cookie.load("jwt");
    if (token) {
      currentUser(token).then((user) => {
        this.props.onLoad(user, token);
      })
    }

  }
```
