---
layout: post
title: "CSS vw,vh단위에 대해"
author: negabaro kim
tags: css
---

[css em,rem단위에 대해]에 이어서 vw,vh라는 단위에 대해 알아보자.


# em,rem과의 공통점

무언가를 기준으로 동적으로 정해지는 단위이다.

# em,rem과의 차이점

## 차이점1

em,rem이 font-size를 기준으로 단위를 정한다면 vw,vh는 
뷰포트(현재 실행중인 스크린 크기)에 맞춰 단위를 정한다.

## 차이점2

값을 지정하는 방식이다르다.
em,rem은 지정한 값에 font-size를 곱했다면
vw,vh는 100분율 계산이다.

100vh, 100vw면 전체 화면의 값을 나타낸다.

현재 뷰포트 크기가
`height = 1200px, width = 800px`라면

`1vh`는 `12px` `1vw`은 `8px`이 된다.

`50vh`면 `600px` `50vw`면 `400px`이다.




# % 와 차이

%와의 차이로는 vw,vh는 화면 전체의 상대길이 이므로 스크롤바까지 포함한 길이를 반환한다는 점이 있다.

반면, 부모 요소가 몇%를 쓰냐에 맞게 반환하므로 스크롤바의 크기는 제외된다.



# 메모

vw의 w은 weight vh의 h는 height을 의미한다.

---

[css em,rem단위에 대해]: https://negabaro.github.io/archive/css-unit-em-rem
