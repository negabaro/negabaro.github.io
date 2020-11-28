---
layout: post
title: "Node.js에서 binding.pry같이 디버깅하는 방법"
author: negabaro kim
tags: node.js
---

Node.js에서 ruby의 binding.pry와 비슷한 방식으로 디버깅하는 방법에 대해 알아보자.

[Node.js v7.7.2 Documentation Debugger]부터 추가된 debugger을 이용하면 된다.


# 사용방법

debugger의 사용방법은 아래와 같다.

## debugger;추가

```js
Array.from(Array(3).keys()).forEach(function(key){
 debugger; // 브레이킹 해줄 부분에 추가
 console.log(key)
})
```

## node실행

node 실행시 debug옵션을 붙여서 실행해준다.

`node debug debugger.js`


## cont커맨드 실행


cont커맨드를 이용해 브레이킹 포인트로 이동이 가능

```js
debug> cont
break in test.js:2
  1 Array.from(Array(3).keys()).forEach(function(key){
> 2   debugger;
  3   console.log(key)
  4  })
```

## repl커맨드 실행

repl커맨드를 실행하면 대화모드로 들어가 해당 코드에 있는 메소드들의 상태를 확인할 수 있다.

```js
debug> repl
Press Ctrl + C to leave debug repl
> key
0
debug> cont
< 0
break in test.js:2
  1 Array.from(Array(3).keys()).forEach(function(key){
> 2   debugger;
  3    console.log(key)
  4  })
debug> repl
Press Ctrl + C to leave debug repl
> key
1
```

빠져나올때는 `Ctrl + C`나 `.exit`

# 느낀점

binding.pry에 비해서는 아직 많이 불편해보이지만 디버깅시 유용하게 쓸 수 있을거 같다.

# 메모

## 브라우저에서도 가능

chrome에서 
window: `Ctrl+Shift+I` mac: `cmd + opt + i` 로 dev tools을 띄어줌

그 후에 특정 액션 실행하면 해당 액션에 기술된 debugger코드로 브레이킹 포인트 됨

정확히는 source탭의 해당 코드가 있는 js코드로 이동





## 테스트시

테스트시에도 사용이 가능하다고
mocha의 경우 아래와 같이 실행해주면 된다.

```js
mocha debug <file-name>
```



---

[Node.js v7.7.2 Documentation Debugger]: https://nodejs.org/api/debugger.html

[Link]: https://qiita.com/murata0705/items/272579bc6bbaffad6292

[binding-pry-for-javascript-console]: https://stackoverflow.com/questions/17096263/binding-pry-for-javascript-console
