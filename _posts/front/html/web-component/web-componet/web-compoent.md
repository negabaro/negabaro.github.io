---
layout: post
title: "xx"
author: negabaro kim
categories: xx
tags: xx
---

# WebComponents란

Web컨텐츠에 포함되는 여러가지 파츠를 컴퍼넌트로 정의해 재이용가능한 형태로 공개하기위한 사양

예를들어 Web브라우저에서 재생가능한 `<video>`태그는 GoogleChrome에서는WebComponet로서 실행되고 있음.

정의된 웹컴퍼넌트는 그 태그를 기술하는것만으로 이용이 가능하다.

컴퍼넌트 내부는 `Shadow DOM`이라는 기술로 은폐되어있어 Web페이지와 컴퍼넌트가 의도하지 않은 간섭을 막도록 설계되어 있다.

---

HTML이 기본으로 제공하는 엘리먼트는 브라우저와 운영체에제 따라 다르게 보이는 경우도 있고, 더 발전하는 웹 환경에 대응하기에 한계가 있습니다. 이런 한계를 JavaScript 컴포넌트로 보완하고 있습니다. 그러나 JavaScript 컴포넌트는 사용이 어려울 뿐만 아니라 크기가 커서 실행 속도가 느립니다. W3C(World Wide Web Consortium)에서는 이러한 문제를 개선하고자 웹 컴포넌트(Web Component)라는 명세(Specification)를 만들었습니다.

# WebComponents의 4가지 요소

WebComponents는ShadowDOM을 포함해서 이하 4개의 Web표준으로 구성되어있다

Custom Elements
Shadow DOM
HTML Templates
HTML Imports

템플릿(Templates)
데코레이터(Decorators)
커스텀 엘리먼트(Custom Element)
섀도 DOM(Shadow DOM)
웹 컴포넌트 구성요소

웹 컴포넌트는 다음과 같은 4가지 구성요소를 가집니다.

# 1. Custom Elements

HTML에 새로운 HTML/DOM 요소를 정의하는 것입니다.

# 2. Templates

컴포넌트의 골격이 사용되기 전까지 비활성화된 상태로 관리되도록 합니다.

3. Shadow DOM

DOM과 스타일을 캡슐화 하여 처리할 수 있도록 해줍니다.

# 4. HTML Imports

위의 요소들을 포함한 Resource를 로딩할 수 있도록 합니다.

출처: https://cocomo.tistory.com/488 [Cocomo Coding]

출처: https://cocomo.tistory.com/488 [Cocomo Coding]

# 1. shadow DOM

- DOM과 Style을 인캡슐레이션 해준다.

- 예전에는 iframe등을 통해 위의 효과를 얻었다.

- shadow dom 외부의 js는 접근이 안된다.

- shadow boundary의 style은 외부로 영향을 미치지 않는다.

- polyfill : 지원되지 않는 브라우저에서도 지원될 수 있게 도와주는 스크립트 파일이라고 보면된다.

webcomponents.js 파일 같은 경우가 polyfill 파일이고 이것을 <script src="webcomponents.js"> 하면 Shadow DOM에 대해 모든 브라우져에서 사용할 수 있다.

# 2. HTML Templates

- <template id="name"> ... </template> 형태로 DOM에서 작용할 태그를 정의한다.

- <template> 태그에 있는 것은 DOM에 들어가지 않는다.

- 스크립트를 통해 DOM에 포함되는 구조이다.

- <template> 태그는 크롬과 몇개 브라우져만 지원하고 있다. 그러나 이것 역시 polyfill을 설치하면 모든 브라우져에서 수행가능함.

# 3. Custom Elements

- HTML에 새로운 태그를 정의하는 것이다. 마치 Angular의 Directive(지시자)와 유사하다.

- <element name="x-dowon"> ...</element> 으로 하면 <x-dowon> 태그를 사용할 수 있다.

- 엘리먼트의 lifecycle 콜백이 존재한다.

- 사용자 정의 엘리먼트를 만들기 위해 Shadow DOM, HTML Template 등이 필요한 것이다.

- document에 register(<custom elements>)를 등록한다.

# 4.HTML Imports

- <link rel="import" href="x-dowon.html"> 설정을 <head> 태그안에 둔다.

- 사용하려는 웹 컴포넌트의 확장자 .html을 import 타입으로 link 태그를 사용한다.

출처: https://hjzzin.tistory.com/169 [말랑말랑하게 살아요.]

출처: https://hjzzin.tistory.com/169 [말랑말랑하게 살아요.]

# web components 장점

iframe と比較した際の WebComponents の長所・短所
長所
埋め込みコンテンツを操作できる。
iframe 要素のソースが別ドメインだった場合、クロスドメイン制約に抵触するため、iframe 要素内のコンテンツを操作することは出来ません。 しかし WebComponents を用いた実装の場合、カスタム要素よりも下層は Shadow DOM によって隠蔽されているが、 埋め込んだカスタム要素そのものは DocumentTree 内の要素としてフルアクセス可能なので、ここに予め Event を定義しておく事で、限定的に要素内コンテンツを操作することが可能です。

### Reference Link:

https://tech.speee.jp/entry/2016/08/05/154253

https://tech.speee.jp/entry/2016/08/05/154253
