---
layout: post
title: "xx"
author: negabaro kim
categories: xx
tags: xx
---

# 콜백함수는 클로저다.

https://beomy.tistory.com/10

# CallBack 콜백함수란

CallBack 함수란 이름 그대로 나중에 호출되는 함수를 말한다.
콜백함수라고 해서 그 자체로 특별한 선언이나 문법적 특징을 가지고 있지는 않다.
콜백함수도 일반적인 자바스크립트 함수일 뿐이다.
콜백 함수는 코드를 통해 명시적으로 호출하는 함수가 아니라, 개발자는 단지 함수를 동록하기만 하고, 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출하는 함수를 말한다.
즉 콜백함수는 콜백함수라는 유니크한 문법적 특징을 가지고 있는 것이 아니라, 호출방식에 의한 구분이다.

대표적인 콜백 함수의 사용 예로는 자바스크립트에서 이벤트 핸들러 처리이다.

```
<button id="button1" onclick="button1_click();">버튼1</button>
<script>
function button1_click() {
	alert("버튼1을 누르셨습니다.");
}
</script>
```

Html에 onclick에 button1_click함수는 브라우저의 javascript API에서 DOM 이벤트 핸들러에 전달(등록)되고, 해당 버튼에 클릭이벤트가 발생했을 이벤트 핸들러가 콜백함수를 호출한다.

```
$( "#target" ).click(function() {
  alert( "Handler for .click() called." );
});
```

위처럼 Jquery에서도 콜백함수를 자주 사용하게 된다.

콜백함수란 특정함수에 전달되어 특정함수가 어떤조건에 의해 호출하는 함수라고 후려칠수 있겠다

https://blog.hanumoka.net/2018/10/24/javascript-20181024-javascript-callback/

# 콜백 함수란

콜백(Callback)이란 옵저버(Observer) 디자인 패턴에서 나온 개념으로 객체의 상태 변화(이벤트)가 발생하였을 경우에 이러한 사실을 함수를 통해 전달하게 되는데, 이를 콜백 함수라고 합니다.

콜백함수는 javascript 특히, ajax나 jQuery를 사용할 때, 알게 모르게 많이 사용하고 계셨을 것입니다.

출처: https://beomy.tistory.com/10 [beomy]

콜백함수는 클로저입니다

함수

하지만 Nodejs의 경우는 비동기 Non-blocking I/O가 기본 설계 원칙(Design Principle)로 제작된 javascript 런타임이고, 이를 이벤트 루프와 poll-큐를 통해서 구현했다. 그래서 위와 같은 코드를 실행할 경우, func1라는 I/O가 먼저 시도되고 func2라는 I/O가 시도되는 것은 보장이 되나, func1가 먼저 끝나라는 보장은 없고, func1가 끝나고 나서 func2가 시작한다는 보장은 더더욱 없다.

따라서 동기성이 보장되지 않게 되는 것이다. 그래서 이러한 동기성을 보장하기 위해서 Nodejs에서는 Callback을 이용하는 방식으로 동시성을 보장하게 만들 수 있다. 다음 코드를 보자.

```
func1(function() { func2(function() { func3(function() { func4(function() { func5(); }); }); }); });

```

출처: https://eine.tistory.com/entry/Nodejs-Async-이용하여-콜백-함수-풀어내기 [아인스트라세의 소프트웨어 블로그]

출처: https://eine.tistory.com/entry/Nodejs-Async-이용하여-콜백-함수-풀어내기 [아인스트라세의 소프트웨어 블로그]

### Reference Link:

```
https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
https://github.com/takahashiakira/tech_for_web/wiki/JS%E9%9D%9E%E5%90%8C%E6%9C%9F%E5%87%A6%E7%90%86
```

https://dalkomit.tistory.com/65

Non Block
