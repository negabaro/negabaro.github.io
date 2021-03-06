---
layout: post
title: "Netlify Functions에 대해 알아보자"
author: negabaro kim
tags: devops/netlify
---


# Netlify Functions이란?


Netlify에서 제공하는 애드온중 하나

FaaS（Function as a service）기능을 제공해주는 서비스로 내부적으로 AWS Lambda를 실행함

Node.js 8.10가 디폴트 실행환경이라고 함.

10.x를 사용하고 싶은경우, AWS_LAMBDA_JS_RUNTIME환경변수를 지정함으로 버전변경이 가능
(해당환경변수는 AWS Lambda runtime에 기재된것)


# 비용

무료 플랜에서는 월 100시간 내에 12만5000리퀘스트까지는 무료라고 한다.

Lambda가 실행시간을 맥스인 10초로 잡으면 36000리퀘스트 커버가 가능하다고 보면된다.

![image](https://user-images.githubusercontent.com/4640346/99153748-fd144200-26ed-11eb-85e3-fb105ce2963f.png)

그 이상일 경우 월$25달러 플랜으로 변경해줘야한다.


# 써보고 느낀점

AWS에 로그인하지 않고 lambda기능이 사용한걸 큰 메릿인거 같다.

`SPA + Faas`환경구축시 Github Pages를 사용시 lambda를 따로 만들어주다 보면
Grouping이 안되서 카오스가 되는 경우가 많았는데 이런 부분이 깔끔해져서 대만족 하고 있다.

SPA 사이드 프로젝트 진행시 앞으로 자주 사용하게 될거 같다.

사원이 아직 97명이라는데 이정도 퀄리티가 나오다니.. IPO하면 얼른 주식사고싶다..


----

# 환경구축

Netlify Functions실행을 위한 환경구축 방법에 대해 알아보자.


먼저 Netlify와Github을 연결해준다.
자세한 방법은 [vue-cli를 사용해 Netlify에 정적페이지를 디플로이하는 방법]을 참고바란다.


## Netlify의 설정파일 작성

Netlify의 설정파일인netlify.toml파일을 루트디렉토리에 작성해주자.

이 설정은 Netlify관리페이지에서도 설정이 가능하지만 후술한 로컬에서 테스트를 위해 이 파일이 필요하다.

```js
#netlify.toml
[build]
  command = "npm run build"
  functions = "dist/functions"
```

command = Netlify디플로이시 실행된 커맨드
functions = Netlify Functions의 엔드포인트

---

### 로컬에서 테스트


`netlify-lambda`를 사용하면 로컬에서 Netlify Functions의 에뮬레이트가 가능하다.

이게 없으면 변경 -> 커밋 -> 디플로이 -> 동작확인이라는 플로우를 반복실행해야하므로 비효율적이다.

루트에서 아래 커맨드로 netlify-lambda인스톨 해주자.


### netlify-lambda install

```js
npm init
npm i netlify-lambda
```

### package.json변경

인스톨후 아래와 같이 package.json을 변경

소스 디렉토리가 src/functions 있다는 전제다.

```js
"scripts": {
  "dev": "netlify-lambda serve src/functions",
  "build": "netlify-lambda build src/functions"
}
```


`netlify-lambda serve <folder-name>` 커맨드로 `netlify.toml`에서 지정한 디렉토리로 빌드 & 로컬에서 확인가능한 서버를 실행해준다.

디폴트 포트는 9000번이고 --port로 포트변경이 가능

port지정예

```js
"dev": "netlify-lambda serve resources/api --port 9001"
```

---


### hello world작성

`src/functions/index.js`에 아래와 같은 js파일을 추가 해주자

```js
exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello World"
  });
};
```

### 동작확인

`npm run dev`로 `netlify-lambda`를 기동해주고

`http://localhost:9000/.netlify/functions/index`

에 억스세하면 `Hello World`가 표시되는걸 알 수 있다.

---

로컬에서의 동작확인은 여기까지다.


[vue-cli를 사용해 Netlify에 정적페이지를 디플로이하는 방법]가 설정된 전제에서 이제 실제 netlify functions에 동작하는지 확인해보자.

지금까지의 코드를 github에 commit & push 한뒤

netlify의 dashboard가 아래와 같이 표시된다면 정상적으로 디플로이가 끝난것이다.


![image](https://user-images.githubusercontent.com/4640346/100726016-bcb00600-3407-11eb-8e35-6934b62d00db.png)

해당 functions을 클릭해주고 endpoint에 표시된 url에 억세스해주면 Function log가 아래처럼 표시된다.(새로고침 필요)


![image](https://user-images.githubusercontent.com/4640346/100726277-17496200-3408-11eb-9a23-85fc7ab30666.png)

---



# 환경변수

API KEY와 같이 세큐어 하게 관리되는 정보는 환경변수에 넣어서 관리해야할 필요가 있다.


## netlify에서 환경변수 추가
 
netlify는 아래 캡쳐와 같이 dashboard에서 간단히 환경변수를 추가할 수 있다.

![image](https://user-images.githubusercontent.com/4640346/100727220-4b715280-3409-11eb-9d6b-d297d3ff241f.png)


## netlify.toml에 추가하는것도 가능

세큐어 하지 않다면 `netlify.toml`에 직접 넣어줘도 괜찮다.(코드에 포함되므로)

netlify.toml
```
[build.environment]
  NON_SECURE_KEY="test"
```

설정한 환경변수는 코드에서 `process.env.KEY`와 같은방법으로 가져올 수 있다.

## dotenv-webpack 인스톨

로컬에서 동작확인을 위해서는 `dotenv-webpack`를 이용한다.

`npm i dotenv-webpack`

## webpack.functions.js추가

```
const Dotenv = require('dotenv-webpack')

module.exports = {
  plugins: [new Dotenv()],
}
```

## .env추가

루트에 .env파일을 추가해서 필요한 환경변수를 추가해주자

.env

```
KEY=value
```

## command수정

추가해준 webpack설정을 적용하기 위해 아래와 같이 수정해주자

package.json
```js
"dev": "netlify-lambda serve resources/api --config ./webpack.functions.js",
```






```js
exports.handler = function(event, context, callback) {

  callback(null, {
    statusCode: 200,
    body: `Hello World X_RAPIDAPI_KEY: ${process.env.X_RAPIDAPI_KEY} | NON_SECURE_KEY: ${process.env.NON_SECURE_KEY}`
  });
};
```




---

# 메모


## Node.js6.10이 아닌 경우

async로 쓰면 더 간결하게 사용이 가능

실행환경이 Nodejs6.10인 경우는 사용못하므로 주의
```js
hello.js
exports.handler = async () => {
  return {
    statusCode: 200,
    body: 'Hello World',
  };
};
```

---


[vue-cli를 사용해 Netlify에 정적페이지를 디플로이하는 방법]: netlify-deploy-using-vue-cli

[Link](https://qiita.com/Sr_Bangs/items/7867853f5e71bd4ada56)
