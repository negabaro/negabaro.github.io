---
layout: post
title:  "rails default scope은 웬만하면 쓰지말자"
author: negabaro kim
tags:	rails/model
---


## 결론

그냥 안쓰는게 속편하다.

## default scope을 사용하고 싶어질떄

`default scope`을 선언하면 해당모델의 모든 쿼리에서 default scope에서 설정한 쿼리가 붙어서 실행된다.

예를들면 논리삭제한 부분을 모든 쿼리에서 보여주게 하고 싶지않을때 사용한다.

그러나 몇번의 프로젝트를 경험한 결과, 처음에 했던 생각에는 항상 예외가 찾아오기 마련이었다.

예를 들어 특정화면에서 보여주게 하고 싶다던가(관리화면) 이러한 요건이 들어왔을때 default scope해제할 필요가 있는데

코드 가독성이 떨어질 수 있으므로 default scope은 가능하면 사용하지 않는것이 좋은것같다.


## 그래도 default scope을 사용하고 싶다면

아래 내용을 참고

1. 특정 부분에서 `default scope`을 해제할때 `unscoped`이 아닌 `unscope`을 이용하자.(이유 길어지므로 생략)

2. 모델을 상속받아 다른 모델로 정의해주자.


---

[Railsのdefault_scopeをどうしても使いたい時]: https://qiita.com/qsona/items/2ca522675b27ed2ec5ba
[Railsのdefault_scopeは悪ではない。]: https://qiita.com/yokochi@github/items/730418b0c7f36ded5b5f