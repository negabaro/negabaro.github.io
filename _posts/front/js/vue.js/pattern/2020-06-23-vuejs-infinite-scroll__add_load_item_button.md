---
layout: post
title:  "rails && vue.js 무한스크롤 vs 버튼클릭시 아이템을 로드"
author: negabaro kim
tags:	vue.js
---

# 무한 스크롤 

스크롤시 추가적으로 표시할 아이템을 가져오는 방식


# 버튼클릭시 아이템을 로드

아이템 하단에 버튼이 있고 해당 버튼을 클릭하면 새로운 아이템을 추가 하는 방식


# UI관점에서의 차이


## 무한 스크롤

하단에 다른 기능이 없다는게 전제되어 있음(UI적으로)

만약 하단에 클릭해야할 버튼이 있다면 
스크롤 해도 계속 아이템이 추가되므로 전체 아이템을 로드할때까지 
해당 버튼을 클릭할 수 없게됨..ㅋ


해당 버튼을 고정해서 상시 표시하는 방법으로 회피할 수 있으나
하단에 버튼이 있다면 무한 스크롤은 사용하지 않는게 좋을 수 있음.


## 버튼클릭시 아이템을 로드

이 방식은 버튼을 클릭하지 않으면 아이템이 추가되지 않으므로 스크롤 하단에
클릭할 버튼(혹은 다른 기능)이 있어도 문제없음



# 구현

무한 스크롤보다는 버튼클릭시 아이템을 로드하는 방법이 훨씬 쉬움. 라이브러리를 쓸 필요도 없을 정도

## 무한 스크롤

여러가지 방법이 있는데 vue.js에서는 `vue-infinite-loading`라이브러리를 이용해서 많이들 구현하는 것 같다.

[![Image from Gyazo](https://i.gyazo.com/f93fe76c28dd078bea0af231365f572a.gif)](https://gyazo.com/f93fe76c28dd078bea0af231365f572a)

## 버튼클릭시 아이템을 로드

loading 이라는 status를 두고
false일때는 아이템을 추가하는 버튼을 렌더링하고 true일때 loading아이콘을 렌더링


버튼 클릭시 loading=ture하고 axios통신이 정상적으로 끝나면 loading=false로 바꿔주면 끝

[![Image from Gyazo](https://i.gyazo.com/f874fd8450629709410a3cd41e597900.gif)](https://gyazo.com/f874fd8450629709410a3cd41e597900)





