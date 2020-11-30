---
layout: post
title: "css 버튼 클릭시 생기는 파란색 테두리 없애는 법"
author: negabaro kim
tags: css
---

button클릭시 아주 경박한 파란색 테두리가 생긴다.

없애는 방법은?

# 빠른 결론

해당 돔에 outline설정을 none으로 해준다.

```css
outline: none;
```


# 원인

크롬에서 접근성에 대한 정책으로 input이나 textarea, button같은 폼요소에 포커싱 되었다는것을 알려주기 위해 outline 요소가 동작한다고 한다. 다른 브라우저에서는 발생하지 않는다고(ex IE)

# 프로젝트 시작전에 css 초기화 설정에 포함하자

디자이너 입장에서는 불필요한 설정이므로 

프로젝트 시작전에 css초기화 설정에 아래 설정을 포함하는게 좋을것 같다.

```
textarea:focus {
  outline: none;
}
button:focus {
  outline: none;
}
input:focus {
  outline: none;
}
```

[참고]글을 참고했습니다.

# 메모


## outline과 border의 차이

테두리에 대한 두께를 설정할때 둘다 사용이 가능하다고 하는데

현업에서는 압도적으로 border를 사용하는것 같다.

차이로는 border는 실제 컨텐츠의 크기에 영향을 끼치는데 outline은 크기에 영향을 끼치지 않는다고 함

기회가 되면 자세히 알아보자.


## 크롬에서만 발생?

크롬 외에 다른 브라우저에서는 발생하지 않는다고(ex IE)

## a태그 클릭후 텍스트가 파란색으로 변하는 현상

한편 a태그 클릭후 텍스트가 파란색으로 변하는 현상도 있다.

이건 `text-decoration: none;`으로 해결가능하다.

---

[참고]: https://junistory.blogspot.com/2017/06/input-textarea-button.html