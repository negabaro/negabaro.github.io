---
layout: post
title: "Github Action에서 node.js로 Hello World Action 만들기"
author: negabaro kim
tags: ci_cd/github-action
---


전체코드는 [action-js-hello-world]를 참고



# 목표

1. `with`키워드로 input한 값을 node.js에서 받아오는지 확인

2. node.js에서 output한 값을 다른 step에서 받아오는지 확인

3. 환경변수,시크릿키를 넘겨서 정상적으로 받아오는지 확인

4. 배열로 output시 정상적으로 받아오는지 확인


# 1. `with`키워드로 input한 값을 node.js에서 받아오는지 확인

```yaml
uses: negabaro/action-js-hello-world@master
with:
  hello-text: 'Hello'
```

위와 같이 with에 hello-text라는 값을 넘겨주고 `negabaro/action-js-hello-world`에서 실행되는 node.js안에서 hello-text를 정상적으로 가져오는지 확인


node.js에서 `@actions/core`패키지의 getOutput을 이용하면 간단히 with에 설정한 값을 가져올 수 있다.

아래는 예제

```js
const core = require("@actions/core");
const helloText = core.getInput("hello-text");
console.log('helloText',helloText);
```

# 2. node.js에서 output한 값을 다른 step에서 받아오는지 확인

마찬가지로 `@actions/core`패키지의 setOutput을 이용하면 간단히 변수출력이 가능하다.

출력한 값을 사용할때는 `steps.스탭 고유의 ID.outputs.변수명` 문법으로 사용이 가능하다.

예를들어 hello-action이라는 스탭에서 textResponse라는 변수를 만들었다면 다른 스탭에서 아래와 같이 사용할 수 있다.

```
steps.hello-action.outputs.arrayResponse
```


# 3. 환경변수,시크릿키를 넘겨서 정상적으로 받아오는지 확인

환경변수는 아래와 같이 env를 이용해 설정이 가능하고

node.js에서는 `process.env.환경변수명`으로 사용이 가능하다.

```yml
- name: run hello action
  id: hello-action
  uses: negabaro/action-js-hello-world@master
  env:
    HELLO_ENV: 'Hello' #<<이 부분
```

시크릿키는 아래와 같이 환경변수에 매핑을 해줘서 사용한다.

```yml
env:
  HELLO_SECRET: ${{secrets.HELLO_SECRET}}
```

# 4. 배열로 output시 정상적으로 받아오는지 확인

테스트 결과 배열형태로 넘겨줘도 정상적으로 동작했다.

전체코드는 [action-js-hello-world]를 참고


---


# 메모


## setOutput에 하지않은 값을 output하려해도 에러는 나지않음.

node.js에서 변수셋팅(setOutput)하지 않은 키를 다른 스탭에서 사용해도 에러가 나지 않았다.

## with vs env의 차이

액션에서 with은 디폴트 값이 지정가능한데 env는 사용불가하다.

무슨말이냐면 내가 만든 액션에 with을 설정해놓으면 그것을 사용하는 사용자가 해당 값을 지정하지 않아도
내가 만든 with을 사용하는데 (유저가 지정하면 그 값으로 덮어씌움)
env는 내가 액션에 고정값으로 지정해도 사용하는 유저가 해당 고정값을 사용할 수 없다.



※ env에는 secret키를 사용가능(혹시 with에서도 가능한가??)

---

[action-js-hello-world]: https://github.com/negabaro/action-js-hello-world

[Creating a JavaScript action]: https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-javascript-action

[hello-world-javascript-action]: https://github.com/actions/hello-world-javascript-action