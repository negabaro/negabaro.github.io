---
layout: post
title:  "vue.js 라이프사이클 created mounted의 차이"
author: negabaro kim
tags:	vue.js
---


vue.js에 created,mounted의 차이에 대해 알아보자.

# created

인스턴스가 작성된 후 동기적으로 호출됨.

부모,자식 관계의 컴퍼넌트가 렌더링 될때 mounted보다 먼저 호출되며 `부모,자식`순으로 실행한다.

데이터 초기화 선언을 created에서 많이 한다.

가상돔을 건드릴 수 없음($el 속성을 아직 사용할 수 없음)



# mounted

부모,자식 관계의 컴퍼넌트가 렌더링 될때 created다음으로 호출되며 
`자식,부모`순으로 실행한다.

el이 새로 생성된 vm.$el로 대체된 인스턴스가 마운트 된 직후 호출됨.(가상돔 조작이 가능)

돔조작관련을 mounted영역에 기술함.


# 컴퍼넌트간의 호출순서

예를들어 `App -> Cat -> CatChild`관계의 컴퍼넌트가 있다고 하면
created와mounted는 각각 아래와 같이 호출된다.

```
App created
Cat created
CatChild created
CatChild mounted
Cat mounted
App mounted
```


# 라이프 사이클에 따른 watch타이밍

라이프사이클에 따른 차이를 이해하기 위해 watch를 예로 들어보겠다.

Cat컴퍼넌트가 CatChild `cat-crying`이라는 props를 넘겨주고
CatChild는 cat-crying을 watch하면서 부모 컴퍼넌트에서 값이 변경되는걸
감시한다고 해보자.

이 때 Cat컴퍼넌트는 created,mounted 어디에서 cat-crying값을 변경하느냐에 따라 CatChild컴퍼넌트의 watch가 동작에 차이가 있다.

created일 경우 변경한 값을 그대로 catChild에게 넘겨준 것이므로
watch대상이 되지 않는다.

mounted일 경우는 일단 초기의 props값을 넘긴 후 
mounted가 실행될때 값이 바뀌는것이므로 watch가 정상적으로 동작한다.

### reference:

```
https://mygumi.tistory.com/201
```
