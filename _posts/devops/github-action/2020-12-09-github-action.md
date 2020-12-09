---
layout: post
title: "Github Action이란"
author: negabaro kim
tags: ci_cd/github-action
---


# 용어정리

시작하기 앞서 아래와 같은 용어가 자주 등장할텐데

- Github Action

- Workflow

- Action

`Github Action`과 `Action`은 전혀 다른 의미임을 기억하자.


# Github Action이란

Github에서 제공하는 CI/CD이다.

Github상에서 동작하는 서버리스 실행환경이라고도 말할 수 있을것 같다.

Github Action은 Workflow라는 단위로 작업을 관리 한다.

# Workflow란

`Github Action`의 부하격(?)에 위치한다.

Workflow는 Github에서 발생하는 다양한 이벤트(pull request,push,스케줄러) 발생시 특정 동작을 어떤 순서대로 실행할지를 지정해준다.

이러한 Workflow는 Runners라고 불리는 호스팅 머신에서 실행되는데
Linux, macOS, Windows 환경 그리고 컨테이너에서 실행가능 하다고한다.(필자는 only ubuntu:latest만 사용)


# Action이란

위에서 특정 동작을 어떤 순서대로 실행할지 지정해준다고 했는데

`특정동작`을 하나의 라이브러리 처럼 만들어서 재사용이 가능하게끔 구성되어 있다.

이것을 `Action`이라고 부른다.

해당 액션은 다른 이용자들에게도 재사용 하게끔 유도하기 위해 [MarketPlace]에 등록하는것도 가능하다.

Workflow안에서 복수의 `Action`을 사용할 수 있다.


## 액션 만드는 방법

액션은 Docker로 만들 수도 있고 node.js로 만들 수도 있는데
node.js쪽이 실행속도가 더 빠르다고 하니 가능한 node.js를 사용하는게 좋다.

root에 `action.yml, action.yaml`만 있으면 action으로 인식된다.
`action.yml`작성 방법은 다른 포스트에서 다루기로


## 액션 사용하는법

workflow에서 동작 순서를 기술하는 step이라는 항목이하에 
`uses`안에 Action을 작성한 리포지토리명을 지정해준다.

이때 브렌치명도 꼭 기술해줘야한다.

아래는 master브랜치의 `actions/checkout`라는 액션을 실행하는 예제이다.

ex)

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    name: Hello
    steps:
      - name: Checkout
        uses: actions/checkout@master
```


## 액션을 marketplace에 등록하는 법

루트에 action.yml, action.yaml이 있으면
github페이지에서 아래와 같은 팝업이 뜨게 된다.

해당 팝업을 클릭하면 marketplace에 등록하기 위한 설정이 나온다.


---

# 제한

Workflow는 저장소마다 최대 20개까지 등록할 수 있다고한다.

Workflow안에 있는 Job이라는 단위마다 최대 6시간 실행이 가능하고 초과하면 자동으로 중지된다고 한다.

또한 Github 계정 플랜에 따라 전체 Git저장소 통틀어 실행가능한 Job개수가 정해져 있다고한다.(이 부분은 디테일한 조사가 필요)

Job 안에서 Github API를 호출한다면 1시간 동안 최대 1,000번까지만 가능하다고

# 비용

공개 저장소는 무료!!

비공개 저장소는 해당 계정에 부여된 무료 사용량 이후에 과금된다고

Github 무료 계정의 전체 비공개 저장소를 기준으로 한달에 500MB 스토리지와 실행 시간 2,000분(minute)까지 제공된다고 한다.

# 사용용도

## crontab대체

Workflow의 스케줄러 기능이 정말 대박인것 같다.

웬만한 crontab은 Github Action으로 대체가 가능할것 같다.

## 비동기 실행

비동기 실행도 가능할것 같고.. 예를들면 5분에 한번 특정 테이블을 보고 특정 컬럼이 있으면 메일을 송신한다든지

## 주식 stock

5분에 한번씩 주가 정보를 알려주는..?

필자가 운영중인 strong-gemi슬랙에 미국주가 정보를 정기적으로 전송해주는 역할로 사용하려고 한다.

## docker파일 갱신

코드 merge시 docker build -> push하는 hook을 동작시킬때

Docker와 관련 없는 파일 갱신시에도 Docker가 빌드가 되는 문제가 있었는데
path를 지정이 가능해져 효율적인 hook을 만들기가 쉬울거 같다.
(이 문제를 해결하기 위해 git diff + 반복문으로 특정파일시 hook을 제외하는 shell script를 만드는 등 귀찮은 작업이 필요했음)


# 메모

## Workflow문법

예전 Workflow는 HashiCorp에서 개발한 HCL （HashiCorp Configuration Language）문법으로 기술가능 했던것 같다.(즉 terraform과 같은 문법)

혹시 지금도 가능한건가..? 필자는 yml형식으로 사용함

---
[Github Action 빠르게 시작하기]를 참고했습니다.

[MarketPlace]: https://github.com/marketplace
[Github Action 빠르게 시작하기]: https://jonnung.dev/devops/2020/01/31/github_action_getting_started/
