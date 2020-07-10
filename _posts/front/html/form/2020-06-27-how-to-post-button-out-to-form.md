---
layout:     post
title:      "html form바깥에서 submit하는 방법"
description: "form에id를 지정해주고 form바깥에 있는 type='submit'을 가진 element에 해당 form의id를 form태그에 넣어주면 된다."
author:     "negabaro" 
tags: html
---


보통 form안에 submit버튼이 있고 해당 submit을 클릭해서 어떤 액션을 실행하는 로직이 많다.
그런데 가끔 컴퍼넌트화등의 이유로 form바깥에 버튼이 있고 해당 버튼을 클릭하면 특정 form에 정의한 action을 실행하는
로직을 만들고 싶을때가 있다.

필자는 form바깥에 modal컴퍼넌트를 정의하고 해당 modal에서 특정 form에 정의된 액션을 실행시킬때 자주 사용한다.


방법은 간단한데 `form에id를 지정해주고 form바깥에 있는 type="submit"을 가진 element에 해당 form의id를 form태그에 넣어주면 된다.`

아래는 코드 예제이다.

```html
<form id="test" action="">
　<input type="text">
</form>

<div>
　<button type="submit" form="test">submit</button>
</div>
```