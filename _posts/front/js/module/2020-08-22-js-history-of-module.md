---
layout: post
title:  "javascript 모듈의 역사"
author: negabaro kim
tags:	js
---

# 1996년 탄생한 javascript는 browser에서만 사용하는 언어

browser에서 사용하는 스크립트 언어
1996년 Javascript가 탄생


# Javascript를 브라우저에 이외에도 사용하기위한 시도


브라우저 이외에서도 Javascript를 사용하려는 시도가 일어남.

Helma, AppJet, Jaxer, Persever, Cappucino, Rhino 등이 있었지만 큰 성공을 거두진 못함.


# 2005년 Ajax의 부상

Ajax의 활성화와 함께 Javascript의 인기가 높아짐
그 수요에 따라 더 빠른 Javascript엔진이 필요하게됨

# 2008년 V8 Javascript엔진 등장

이러한 시대적 배경속에서 Google에서 개발한  V8 JavaScript 엔진은 많은 주목을 받음.

브라우저 이외에도 사용이 가능하고 기존의 JavaScript 엔진보다 월등히 빨랐음.


# 2009년 CommonJS그룹 탄생

2009년 1월 Kevin Dangoor는 자신의 블로그에 서버사이드 JavaScript에 대한 아이디어를 제시하고 함께할 동료를 모음.

서버사이드에서 Javascript가 성공하려면 공통적인 표준을 정하고 지켜나가는 활동이 필요하다고 판단

이렇게 시작해서 만들어진게 CommonJs그룹임.

자세한건 [Link1]를 참고

# 서버사이드에서 Javascript 성공의 키

Kevin은 js가 브라우저용 언어를 넘어 범용적으로 쓰이려면 Ruby,Python과 같은 체계가 필요하다고 주장했는데

이 체계를 만들기 위해서 모듈화라는 개념이 존재해야했다.

# CommonJS의 모듈화

크게 아래의 세가지 규칙으로 나뉘었다.

1. 모듈 정의는 exports라는 객체를 이용하자.
2. 모듈 사용은 require 함수를 이용하자.
3. 각 모듈은 자신만의 독립적인 실행 영역이 있게하자.(스코프를 가짐)

# 비동기 모듈로드 문제(모듈간의 의존성 문제)

CommonJS는 서버사이드에서 Javascript를 실행시키기 위해 탄생한 만큼
브라우저에서 동작할때 부족한 부분이 있었음.


# 모듈 전송 포맷(module transport format) 등장

이런 문제를 해결하려고 CommonJS는 서버 모듈을 비동기적으로 클라이언트에 전송할 수 있는 모듈 전송 포맷(module transport format)을 추가로 정의했다. 이 명세에 따라 서버사이드에서 사용하는 모듈을 다음 예의 브라우저에서 사용하는 모듈과 같이 전송 포맷으로 감싸면 서버 모듈을 비동기적으로 로드할 수 있게 된다.

```js
// complex-numbers/plus-two.js

require.define({"complex-numbers/plus-two": function(require, exports){

//콜백 함수 안에 모듈을 정의한다.
var sum = require("./complex-number").sum;  
exports.plusTwo = function(a){  
return sum(a, 2);  
};
},["complex-numbers/math"]);
//먼저 로드되어야 할 모듈을 기술한다.
```



HTML 파일내부에 <script> 태그를 삽입하여 모듈을 로드하고 있습니다. 하지만 이런 방식은 한가지 문제가 있는데, 자바스크립트 파일(또는 모듈)끼리 서로 모듈을 공유하는데 제약이 없다는점입니다. 그 이유는 script 태그로 로드된 모듈은 모두 window 객체의 속성이기 때문에 서로 다른 파일에 위치하면서도 모든 객체를 공유할 수 있기 때문입니다. 이처럼 각 자바스크립트 파일이 독립적으로 존재하지 못해 발생하는 여러 문제들(예를들어 다른 파일에서 같은 이름의 변수를 사용하는 경우) 때문에 하나의 모듈로 관리하기위한 다양한 패턴(모듈패턴, 즉시실행함수 등)을 사용하여 의존성을 관리할 수 밖에 없었습니다.

이를 해결하기 위한 수단으로 모듈이라는 개념을 도입하여 정의한 방법(또는 표준)이 CommonJs 와 AMD 입니다. 이 둘은 내부적으로 모듈 서로 간의 의존성(로드)이 지원되지 않는 상태로 만들어졌는데, ES6 에 이르러 언어 내부적으로 자바스크립트 모듈 의존성을 지원하게 되었습니다(import, export).


모듈화

# AMD

avaScript 표준 API 라이브러리 제작 그룹에는 CommonJS만 있는 것이 아니고, AMD(Asynchronous Module Definition)라는 그룹도 있다. AMD 그룹은 비동기 상황에서도 JavaScript 모듈을 쓰기 위해 CommonJS에서 함께 논의하다 합의점을 이루지 못하고 독립한 그룹이다.

본래 CommonJS가 JavaScript를 브라우저 밖으로 꺼내기 위한 노력의 일환으로 탄생했기 때문에 브라우저 내에서의 실행에 중점을 두었던 AMD와는 합의를 이끌어 내지 못하고 결국 둘이 분리되었다. CommonJS 공식 위키에도 AMD가 독립했다는 사실을 알리고 있다.


# ㅌㅌ
사실 두개 말고도 ES2016, ES6, System.register 등등의 모듈제공 방식도 있지만

# ECMA 6


# 번들링

여러분이 생각하는 1~20개의 자바스크립트 파일 로딩이 아니다.

몇 백개의 자바스크립트를 매 사용자가 페이지를 전환할 때마다 불러 온다고 생각해보자…

image
AMD, CommonJS 모두 비동기 통신을 통해 파일을 동적으로 불러오는 경우

성능의 이슈가 있기 때문에

보통 프로덕션 서버로 배포 할 때 번들링(Bundling) 작업을 진행하게 된다.


# UMD
우리의 아름다운 자바스크립트 프론트엔드 환경에서는

제공하는 라이브러리를 어떤식으로 호출 할지 모른다.



require([“], function(module) {})로 사용 할 수도 있고. (AMD)

var module = require(”)로 사용 할 수도 있다. (CommonJS)

심지어 import { module } from “; 형태로 사용 할 수도 있다. (ES6)



우리는 이런 모듈 방식을 모두 제공하는 팩토리 형태를 만들어야 한다.

심지어 이 팩토리 표현에 대해서는 마땅한 표준도 없다.



(세상에 마상에)

표준은 아니지만 UMD라는 친구가 있는데

Universal Module Definition의 약자이다.


모듈 시스템을 개발한 것 까지는 좋은데 문제는 다양한... 이라는 것이죠. AMD와 CommonJS를 쓰는 두 그룹으로 나누어지다보니 서로 호환이 안 되게 되었습니다. 그래서 나온 것이 UMD입니다. 어떤 모듈을 쓰든지 동작되게 하기 위한 것이죠.

UMD는 하나로 정해진 코드라기 보다는 디자인 패턴에 더 가깝습니다. AMD, CommonJS, 그리고 기존처럼 window에 추가하는 방식까지 모든 경우를 커버할 수 있는 모듈을 작성하는 것이죠.

AMD는 define을 쓰고, CommonJS는 module.exports를 씁니다. 이 차이를 활용하면 UMD를 만들 수 있습니다. 모듈을 아래와 같이 선언하면 됩니다.





---

[Link1]: http://www.commonjs.org/history/
[Link2]: https://d2.naver.com/helloworld/12864
