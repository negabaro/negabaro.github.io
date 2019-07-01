---
layout: post
title: "이벤트 버블링과 캡쳐링"
author: negabaro kim
categories: js
tags: js
---

# 이벤트 버블링(Event Bubbling)

`거품이 밑에서 올라오듯`
이벤트 흐름이 밑에서 위로 향한다

# 캡쳐링

`x-ray를 찍으면 몸에서부터 몸안의 내부를 캡쳐해나가듯`
이벤트 흐름이 위에서 밑으로 향한다.

# 예제

```html
<div id="event-bubbling-example">
  <main>
    <section>
      <div>
        <button>Click!</button>
      </div>
    </section>
  </main>
</div>
```

위와 같은 html이 있고 button에 이벤트가 발생했을때


## 캡쳐링의 경우

```
main ▶ section ▶ div ▶ button
```

## 버블링의 경우

```
button ▶ div ▶ section ▶ main
```

같은 순서로 이벤트를 찾으러 간다
등록된 이벤트가 있으면 해당 이벤트를 실행하고 이벤트가 없으면 그냥 지나간다.

# IE일부 버전은 캡쳐링을 지원하지 않음

IE의 경우 위와 같은 탐색에서 캡션단계를 지원하지 않음으로 이벤트 핸들링은 버블링을 기준으로 작성되어야 한다.

# 버블링으로 인한 문제

예를들어 나는 button만 클릭해서 해당 이벤트를 동작시키고 싶은데 버블링으로 인해 의도치않게
상위에 있는 다른 이벤트가 동작해버리는 문제가 발생할 수 있다.

이럴때는 `stopPropagation()`를 이용하여 거품이 위로 올라오지 않게 차단해주어야 한다

# event

```js
const handleClick = e => {
  alert(e.currentTarget.tagName);
};
document
  .querySelector("#event-bubbling-example main")
  .addEventListener("click", handleClick);
document
  .querySelector("#event-bubbling-example section")
  .addEventListener("click", handleClick);
document
  .querySelector("#event-bubbling-example div")
  .addEventListener("click", handleClick);
document
  .querySelector("#event-bubbling-example button")
  .addEventListener("click", handleClick);
```

와 같은 이벤트가 있을경우 버튼을 클릭하면 버블링에 의해 이벤트가 존재하는지 체크를 하게되므로

```html
button ▶ div ▶ section ▶ main
```

순으로 alert가 발생하는걸 알 수 있다.

# ex2

addEventListener의 3번째 파라메터를 ture로 해주면(default: false)
캡쳐링에 의해 이벤트가 존재하는지 체크하게 된다.

그러므로 반대인

```html
main ▶ section ▶ div ▶ button
```

순으로 실행된다

# ex3

div부분만 3번째 파라메터를 ture로 해주면 어떻게 될까
main,section,button은 버블링으로 실행되고 div만 캡쳐링으로 실행되어

```html
div -> button -> section -> main
```

와 같은 순서로 alert가 발생한다

이벤트,버블링이 섞여 있을때는 버블링보다 `캡쳐링이 우선실행` 되는걸 알 수 있다.

# 리액트에서의 버블링과 캡쳐링

리액트의 이벤트 핸들러는 버블링 단계의 이벤트에 의해 트리거된다.
캡쳐링 단계에 대한 이벤트 핸들러를 등록하려면, Capture를 접미사로 붙인다.
예 : onClickCapture, onKeyPressCapture

### Reference Link:

https://codesandbox.io/s/2zlm2o41r
https://wonism.github.io/event-bubbling-capturing/
http://insanehong.kr/post/front-end-developer-interview-javascript/
