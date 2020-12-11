---
layout: post
title: "act를 이용해 Github Action의 Workflow를 로컬환경에서 실행해보자"
author: negabaro kim
tags: ci_cd/github-action
---

# act란?


[act]를 이용하면 로컬에서 `Github Action`의 `workflow`를 실행할 수 있다.


# 써보고 느낀점

약간의 버그가 있긴한데 체감상 85%이상은 실제동작과 동일하게 움직이는것 같다.

반복작업시 git push해서 조금 기다렸다 동작확인해야하는 과정이 굉장히 귀찮은데 act를 이용하면 빠르게 동작확인을 할 수 있으므로 꼭 사용하기를 권한다.


act를 사용해보고 몇가지 느낀 주의사항을 적어본다.

# 주의사항

## 완벽하게 실제 Github Action과 호환하지 않음

위에서 얘기했듯이 실제동작과 완벽히 일치하지 않는다.

조금 의심스러운 동작일경우 실제 git push해보면 Github Action상에서는 잘 동작하는 부분이 있었다.

## 스케줄러 이벤트는 동작하지 않음

아래 이벤트는 동작하지 않는다.

```yml
on:
  schedule:
    - cron: '0 0-23/1 * * 1-5'
```

로컬에서 테스트하기위해 아래와 같이 임시로 변경해서 사용하자

```yml
name: For Test
on: [push]
```

## Github Action의 Action을 로컬에서 확인하기 위해


오해하지 말아야할게 act는 `Github Action`의 `Workflow`를 실행해줄뿐 `Action`을 실행해주는것은 아니다.

action.yml이 로컬에서 제대로 동작하는지 확인하는 방법은 내가알기론 없다.
보통 결과물을 실행해주기만 해서(ex node index.js) 딱히 문제없기도 한데 env,with이나 다른 action에 의존하는 action을 실행해줘야할때는 아래와 같이 사용이 가능하다.


```yml
name: For Hellow World
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    name: Hello
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: run hello action
        id: hello-action
        run: node index.js
```

이 방법 외에도 action자체는 git push한 후 로컬에서 uses로 해당 리포지토리를 사용하게 하고
로컬에서 반복해서 동작확인을 하는 방법도 차선책으로 괜찮을듯

# 설치방법

mac기준으로 아래 커맨드로 인스톨이 가능했다.

```
brew install nektos/tap/act
```

다른OS는 [act]를 참고

# 사용방법

루트 디렉토리에서 `act -l`을 해주면 실행가능한 Workflow리스트가 뜬다.

`act`해주면 해당 Workflow를 전체실행한다.

Github -> Settings에서 설정하는 Secret값이 로컬에서 필요할땐

`my.secrets`파일을 만들어서 Secret값을 넣어준 후 아래와 같이 실행해주자.

ex)

```
#my.secrets
SLACK_WEBHOOK_URL=xx
```

`act --secret-file my.secrets`

설정한 Secret값은 Workflow에서 아래와 같이 env에 매핑해서 사용하게된다.


```yml
env:
  SLACK_WEBHOOK_URL: ${{secrets.SLACK_WEBHOOK_URL}}
```

node.js코드에서는 

`process.env.SLACK_WEBHOOK_URL`로 사용이 가능하다.




---

[act]: https://github.com/nektos/act
[GitHub Actionsのローカル実行ツール「act」を使う事でCI/CDコンフィグとローカルでのタスクランナーを1つにする]: https://dev.classmethod.jp/articles/act-for-github-actions-local-execution-tool/