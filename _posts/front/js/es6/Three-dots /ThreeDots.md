3사실 위의 … 즉 Three dots 표기법은 ES6에서 제안된 문법인데요.
특성에 따라 `Rest Operator`와 와 `Spread Operator`로 나뉩니다. 한번 알아보도록 하죠

# Rest Operator

# Spread Operator

# 트러블

```
    case SET_ITEM_TO_RDX:
      //return { ...state, item: action.item };  //이면 remove childe에러 발생.
      return { ...state, item: { ...state.item, ...action.item } }; //정상적으로 움직임
```

https://ddalpange.github.io/2018/01/11/js-es6-three-dots/
https://krksap.tistory.com/1381
https://m.blog.naver.com/PostView.nhn?blogId=jdub7138&logNo=221075419249&proxyReferer=https%3A%2F%2Fwww.google.com%2F
