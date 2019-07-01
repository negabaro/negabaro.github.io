```js
this.setState({ basicInfo.name: e.target.value})
```

이렇게 적으면 에러 나는걸

```js
this.setState(prevState => ({
  ...prevState,
  basicInfo: {
    ...prevState.basicInfo,
    name: e.target.value
  }
}));
```

spread operator를 사용한건 불변성 유지 때문입니다.

or

```js
this.setState({
   basicinfo: {
         ...this.state.basicinfo,
         name: 'something'
   }
}) (
```

이렇게 해결?
