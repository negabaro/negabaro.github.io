---
layout: post
title:  "rails6.0에서 refinements 활용법"
author: negabaro kim
categories: rails ruby
tags:	rails ruby
---

# refinements란?

리파이맨트..

refinement 미국∙영국 [rɪˈfaɪnmənt] 듣기 영국식 듣기 어휘등급별 3개 단어장 저장
1. 명사 (작은 변화를 통한) 개선[개량] (=enhancement)
2. 명사 (이전의 비슷한 것보다) 개선[개량]된 것
3. 명사 정제, 제련


# 역사

ruby 2.1.0에서 시험적으로 사용되다가 2.3부터 정식으로 추가됨



# rails에서의 refinements활용법

처음 생각한게 특정 컨트롤러에서만 사용하는 model관련 로직을
해당 컨트롤러 스코프에서만 refinements로 정의후 사용하면 어떨까

그렇게 하면 좋은점
특정 모델 용도별로 나눌 수 있음

모델에다 정의하면 해당 모델에서는 무조건 사용하는게 마음에 안듬

그런데 스팩

### reference:

```
http://kamelog.hatenablog.com/entry/2014/01/26/232213
https://github.com/kmdsbng/refinements_rails_presenter_test/tree/daf5ce418b3310a96410e68be64fcb12a915b297
https://qiita.com/scivola/items/dc49d56c90fd0cb6d4d3
```