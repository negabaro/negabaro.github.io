---
layout: post
title:  "vue.js event핸들러 함수에 매개변수 넘기는 방법"
description: "매개변수를 넘기되 $event라는 특별한 인자도 같이 정의해줘야한다."
author: negabaro kim
tags:	vue.js
---

Vue에서 이벤트핸들링할때 함수에 넘겨줄 인자가 없을때 아래와 같이 사용한다.


### html

```html
<input type="text" @change="onChangeInput">
```

### js

```js
methods: {
  onChangeInput(event) {
    this.message = event.target.value
  }
}
```

인자에 event라는걸 넘겨주지 않아도 알아서 갖고 있다(?)

해당 이벤트 인자를 이용해 변경된 내용에 접근할 수 있다.(event.target.value)

그런데 특정 매개 변수를 따로 넘겨주고 싶을때 어떤식으로 정의해줘야할까.

공식 도큐멘트 [인라인 메소드 핸들러]에 기술되어있다.

넘겨줄 변수를 지정하되 `$event`라는 특별한 인자를 선언할 필요가 있다.

예제는 아래와 같다.

```html
<input type="text" @change="onChangeInput(item.id, $event)">
```

```js
methods: {
  onChangeInput(id, event) {
    this.message = event.target.value
  }
}
```


[인라인 메소드 핸들러]: https://kr.vuejs.org/v2/guide/events.html
