---
layout: post
title: "정적 컨텐츠 호스팅 서비스 Netlify에 대해 알아보자."
description: 
author: negabaro kim
tags: devops
---

# Netlify란?

넷리파이라고 읽는다.(넷플릭스를 너무 많이봐서 그런지 처음엔 넷플라이 인줄..)

정적 컨텐츠를 호스팅해주는 웹서비스이다.

GitHub・GitLab ・Bitbucket의 리포지토리와 연계가 가능해 오토 디플로이가 가능

전체적인 컨셉은 Github pages랑 비슷하고 AWS의 S3,cloud front,lambda만 따로 사용하기 편하게 빼논 느낌이다.

개인적으로는 prerendering을 서포트해주는게 엄청난 메릿이었다.

작게 시작해서 크게 확장가능하기에 좋은 솔루션이라고 생각한다.

# 사용방법

[vue-cli를 사용해 Netlify에 정적페이지를 디플로이하는 방법]를 참조

# 무료플랜 특징

무료플랜은 아래와 같은 기능이 있다.

무료SSL
CDN서포트
전송량: 월100GB
스토리지: 100GB
리퀘스트제한: 분당 500회

더 자세한 내용은 [전송량] 링크를 참조


---

# Github pages와의 비교

## 결론

별 다른 이유가 없으면 Netlify를 사용하는게 좋다.

## 도메인

각 프로젝트마다 데모사이트를 넣을때

Github의 경우

`https://아카운트.gitub.io/프로젝트명`

이런식으로 서브 디렉토리명이 추가되는 반면

Netlify는 독자적인 아래와 같이 독자적인 도메인이 만들어진다

`https://프로젝트명.netlify.app/`

또한 github의 경우 github의 리포지토리명에 의존되지만
netlify의 경우 github리포지토에 의존하지 않고 자유롭게 도메인 변경이 가능한게 메릿

## 퍼포먼스

체감상 속도도 netlify가 빠르게 느껴진다(이건 착각일지도?)

## 디플로이

디플로이 속도는 GithubPages에 비해 조금느리거나 비슷한 수준인거 같다

## 비용

Github pages는 영원이 무료인반면 Netlify의 무료플랜에는 제한이 있음.

## 그 외

Firebase나Lambda와 같은 기능을 추가해주기 편하다.
문의사항 폼도 간단히 추가 가능하고 간단한 인증서비스도 구현가능


----
그 외 Netlify에서 제공하는 애드온들에 대해 알아보자.

# Functions

Aws에 로그인하지 않고 AWS Lambda 사용이 가능하다.

더 자세한건 [Netlify Functions에 대해 알아보자] 를 참조

# Form

문의사항과 같은 폼작성시 <form>태그에 netlify속성을 추가해주기만 하면 Netlify의 대쉬보드에 해당 폼으로 부터 전송된 내용을 확인할 수가 있다.

```html
<form name="contact" netlify>
  <p>
    <label>Name <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email <input type="email" name="email" /></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
```

### 요금

![image](https://user-images.githubusercontent.com/4640346/99154196-4a45e300-26f1-11eb-81d7-af8bd8bf5354.png)

무료 플랜에서 월 100건까지 가능(이 정도면 충분하지!!)

100건이 넘으면 월$19 플랜을 사용하든지 다른 솔루션을 도입


# Identity

Identity는GoTrue라는 API를 이용해서 인증기능을 제공해주는 서비스이다.

유저등록을 필요로 하는 서비스나 특징 유저만 접속가능한 회원제 서비스 구현을 간단히 해준다.

![image](https://user-images.githubusercontent.com/4640346/99154260-c2aca400-26f1-11eb-84d7-eb0df62c0bd7.png)

등록자수는 1000명까지 무료. 회원제 서비스일 경우 5명까지 밖에 안된다고

5명을 넘길경우 월 $99과금 부터 시작하므로 이 기능은 다소 비싼편인거 같다.


# 그 외

무료 플랜에서는 1명만 관리화면에 억세스가 가능 복수의 어카운트에서 관리시 유료플랜을 사용해야한다.


### reference:

[vue-cli를 사용해 Netlify에 정적페이지를 디플로이하는 방법]: netlify-deploy-using-vue-cli
[Netlify Functions에 대해 알아보자]: netlify-functions
[전송량]: https://www.netlify.com/tos/
