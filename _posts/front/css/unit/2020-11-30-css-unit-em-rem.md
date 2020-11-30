---
layout: post
title: "css em,rem단위에 대해"
author: negabaro kim
tags: css
---

# em rem 공통점

font-size의 크기를 기준으로 동적인 단위 지정이 가능하다.

# em rem의 차이점

## em

em은 부모의 font-size를 기준으로 한다.

## rem

rem의 r은 root를 의미한다.
root(html)의 font-size를 기준으로 단위를 정한다.

참고로 chrome기준 default html의 font-size는 16px이다.

# 예

먼저 `1em, 1rem`은 참조하는 font-size자체를 말한다.

2부터는 참조하는 font-size에 곱하기를 하는 방식이다.

font-size가 16px이라면 `1em,rem`은 16px와 같고 `2em,rem`은 32px과 같다.

# px와의 차이점

고정값으로 지정하는 px방식보다 훨씬 더 유연한 디자인 적용이 가능할것 같다.

절대 변하지 않는 값일 경우를 제외하면 px를 되도록 사용하지 않는게 좋을것 같다.


# 느낀점

font-size지정시 보통 웹사이트에서는 동일한 사이즈를 지정하는 경우가 많아

부모의 font-size를 보는 em보다는 root(html)의 font-size를 보는 rem이 더 사용빈도가 많을것 같다.

---


# 메모


## 연습

부모 font-size가 14px라면? 

```
font-size: 1.2em; // calculated at 14px * 1.2, or 16.8px
```


## em사용시 주의

```
<div>
    Test (14 * 1.2 = 16.8px)
    <div>
        Test (16.8 * 1.2 = 20.16px)
        <div>
            Test (20.16 * 1.2 = 24.192px)
        </div>
    </div>
</div>
```

부모 자식 구조가 깊을 경우 지정한 em단위가 점점 커질 수 있음. 
nested에 관계없이 값을 지정하고 싶을땐 rem을 사용하자.


## 언제 사용?

폰트 크기 지정시 많이 사용한다.

그 외에 폰트 사이트즈를 기반으로 만든 UI 스타일등에도 응용가능하다고

예제

```
.container {
    width: 70rem; /* 70 * 14px = 980px */
}
```

# rem을 잘 사용하는 방법

rem과 media query를 사용하면 편리

일정한 비율로 크기가 변해야하는 디자인을 구성할때 자주 사용하

다중 칼럼 레이아웃의 너비에는 em 혹은 rem 보다는 %를 사용하는 것이 좋음.


---

[참고]: https://webclub.tistory.com/356