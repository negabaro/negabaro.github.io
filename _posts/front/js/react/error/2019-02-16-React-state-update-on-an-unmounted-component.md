---
layout: post
title: "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method에러"
author: negabaro kim
categories: react
tags: react js
---

이거 최근에 쪼끔 핫했던 유돈노 자바스크립트 비동기 처리에 관한 소스코드가 있었는데요. 그부분이랑 연관이 많은거 같은데 ㅋㅋㅋ 저는 (조기) 포함된 유튜버 영상기준으로 말씀드리는건데, ajax request 호출하고 나서, response 받아서 데이타를 가지고 this.setState가 일어나야 하는데, 비동기 이슈 때문에 이게 제대로 안돌아가는거죠. 그래서 저님아는 this.setState를 isMounted가 true일때만, this.setState 가 발생하게 조건을 걸어준거예요.

index.js:2178 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

```
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in App (created by Connect(App))
    in Connect(App) (created by Index)
    in div (created by Layout__Main)
    in Layout__Main (created by _default)
    in div (created by Layout__GridBody)
    in Layout__GridBody (created by _default)
    in div (created by _default)
    in _default (created by Index)
    in Index (at withRoot.js:33)
    in MuiThemeProvider (at withRoot.js:29)
    in WithRoot (created by Connect(WithRoot))
    in Connect(WithRoot) (created by MyApp)
    in Provider (created by MyApp)
    in MuiThemeProviderOld (created by MyApp)
    in JssProvider (created by MyApp)
    in Container (created by MyApp)
```

Hi @josoroma,

I can not see all of your code so I am making a couple of assumptions, this looks like a login form and I'm assuming that you are redirecting on successful authentication? And after the redirect something within the component is setting state.

Kent C. Dodds recently did a video which shows you how to prevent this from happening here:
https://www.youtube.com/watch?v=8BNdxFzMeVg (Avoid setState warnings on unmounted React components)

The simplest way to prevent the warning would be to do the following:
componentDidMount() -> set a property \_isMounted to true
componentWillUnmount() -> set the \_isMounted to false

and before you call the setState wrap it in a conditional to make sure the component is mounted :)

Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.
Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
説明
マウントされていないコンポーネントで setState や replaceState を行ったので何もしなかったよ。という警告です。

メモリリークを引き起こす可能性があるので修正したほうがいい(らしい)です。

対応
コンポーネントがマウントされてから 更新メソッドをコールします。 多分コンポーネント間通信をしてるときに発生するんじゃないかな。

Reference Link:

```
http://note.crohaco.net/2018/react-errors-warnings/
https://qiita.com/shsssskn/items/2d8b28a2efbb1943d6c6
https://github.com/jaredpalmer/formik/issues/772
https://github.com/facebook/react/issues/5465
```
