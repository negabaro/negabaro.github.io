---
layout: post
title: "Github Action의 step을 반복해서 실행하는 방법"
author: negabaro kim
tags: ci_cd/github-action
---

## 선결론

`strategy.matrix`이하에 지정한 값을 이용하면 반복실행이 가능하다.



---

필자는 주식관련 데일리 레포트를 송신하는 api를 개발하고 있는데 종목 마다 일일이 step을 작성하는게 번거러웠다.


```yml
jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      - name: tsla
        run: curl --show-error -X POST -d {} https://xx?symbol=TSLA"
      - name: pltr
        run: curl --show-error -X POST -d {} https://xx?symbol=PLTR"
      - name: nkla
        run: curl --show-error -X POST -d {} https://xx?symbol=NKLA"
      - name: snow
        run: curl --show-error -X POST -d {} "https://xx?symbol=SNOW"
```

종목이 100개가 넘으면 위 행도  100행이 되어버리므로 관리가 어렵다.

Github Actions에서 step을 반복실행하기 위해서 아래와 같이 shell의 for기능을 사용하는것이 가능하지만

```yml
steps:
  - name: run loop
    env:
      FILES: a.scss b.scss
    run: for f in $FILES; do [YOUR COMMAND HERE]; done
```

`strategy.matrix`를 이용하면 더 간단하고 확실하게 반복하는 step을 생성할 수 있다.

방법은 간단한데 `strategy.matrix`하위에 배열로 값을 선언하고 해당 값을 step에서 사용하기만 하면된다.

아래는 예제

```yml
jobs:
  build:
    strategy:
      matrix:
       symbol-list: [LMND,FUBO,LAZR,VLDR,TSLA,PLTR,NKLA,SNOW,SHOP,SPLK]
    name: build
    runs-on: ubuntu-latest
    steps:
      - name: ${{matrix.symbol-list}}
        run: |
          curl --show-error -X POST -d {} "https://xx?symbol=${{matrix.symbol-list}}"
```

`symbol-list`의 배열값만큼 반복실행해준다.

shell에서 반복해주면 하나의 step안에서 반복문이 실행되지만 `strategy.matrix`를 이용하면 반복할 step이 나눠져 Dashboard에서 보기도 편하다.

![image](https://user-images.githubusercontent.com/4640346/103162582-bb6ecf00-4835-11eb-83b2-665e2a372e53.png)


---

[Link]: https://github.community/t/loop-through-list-of-files/17545