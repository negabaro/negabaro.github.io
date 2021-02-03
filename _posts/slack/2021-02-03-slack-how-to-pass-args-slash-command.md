---
layout: post
title: "slack slash command의 인자를 lambda에 넘겨주는 방법"
author: negabaro kim
tags: slack
---

## slash command의 인자

slash 커맨드의 인자란 아래와 같은 커맨드 실행시 `test`를 말한다.

![image](https://user-images.githubusercontent.com/4640346/106696840-e8768480-6620-11eb-8cbc-6a88a6c5dc3a.png)


## 인자는 body안의 text안에 들어간다.

인자는 body안의 text에 들어간다.

그러므로 아래와 같은 lambda코드로 인자를 가져올 수 있다.

## lambda 코드


```js
exports.handler = async (event, context, callback) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = event["body"];
  const text = body.split("&text=")[1];
  const symbol = text.split("&")[0];
  console.log("symbol:", symbol); //result: test
}
```


## local에서 테스트하기

slack에서 slash 커맨드를 실행한것과 같은 결과를 얻기 위해서는 아래와 같이 --data-urlencode를 기술해줘야한다.

```
curl --show-error -X POST --data-urlencode 'token=xx&text=test' "https://xx"
```

실제 슬랙에서 실행시 맨 앞에 token이 들어오기 때문에

```
body.split("&text=")
```

실행시 0행에 token값이 들어온다. 

그것과 똑같이 구성해주기 위해 token값이 필요하다.(추출방법을 달리하면 없어도 가능)



## 메모

### key=value

slash커맨드는 key value방식으로도 값을 넘길 수 있는데

```
/fg test desu
```

이런식으로 실행하면 test가 key이고 desu가 value로 인식된다.
실제 body에서는 아래와 같이 `+`로 구분되어진다.

```
body: test+desu&is_enterprise_install=false&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%xxb
```


---

[Passing slash command parameters]: https://forum.mattermost.org/t/solved-passing-slash-command-parameters/1775/2