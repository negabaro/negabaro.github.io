---
layout: post
title: "rails includes 메소드에 대해 자세히 알아보자"
author: negabaro kim
tags: rails/model
---


## 빠른 결론

includes는 `eager_load` 일수도 `preload` 수도 있다.


---

## 왜?

includes메소드는 특정조건에 부합하면 `eager_load`와 같은 동작을 하고

부합하지 않으면 `preload`와 같은 동작을 하기 때문이다.

## 조건은?

> 1. includes한 테이블에 where문을 추가해 필터를한 경우
> 2. includes한 association에 joins or references를 호출한 경우
> 3. 임의의 association에 eager_load를 호출한 경우

위에 세조건을 or조건으로 하나만 일치해도 true가 된다.


## 근거는?

[eager_loading?코드]를 보면 알 수 있는데

eager_loading?이 true면 LET JOIN을 시키고 false일 경우 쿼리를 나눠서 읽어온다.

```ruby
def eager_loading?
  @should_eager_load ||=
    eager_load_values.any? ||
    includes_values.any? && (joined_includes_values.any? || references_eager_loaded_tables?)
end
```

### 해설1

> 1. includes한 테이블에 where문을 추가해 필터를한 경우

[references_eager_loaded_tables?]는 JOIN대상 이외에 references가 실행되었을때 true가 된다.

where로 다른 테이블에 필터를 걸었을때 references가 실행되므로 `where문을 추가해 필터한 경우도 체크`할 수 있다.


### 해설2

> 2. includes한 association에 joins or references를 호출한 경우

 [joined_includes_values]는 includes한 association에다가 joins도 걸어버린 애들의 리스트이다.

 `joined_includes_values.any?`이므로 그런 쿼리가 있다면 true처리된다.


### 해설3

> 3. 임의의 association에 eager_load를 호출한 경우

`eager_load_values`나 `includes_values`는 eager_load했거나 includes했을때 추가되는 녀석들임




---

[references_eager_loaded_tables?]: https://github.com/rails/rails/blob/9c297ce93610bcd878f5a5ca8e737bf057fc2d85/activerecord/lib/active_record/relation.rb#L626-L641

[joined_includes_values]: https://github.com/rails/rails/blob/9c297ce93610bcd878f5a5ca8e737bf057fc2d85/activerecord/lib/active_record/relation.rb#L566-L568

[eager_loading?코드]: https://github.com/rails/rails/blob/9c297ce93610bcd878f5a5ca8e737bf057fc2d85/activerecord/lib/active_record/relation.rb#L556-L560

[ActiveRecordのjoinsとpreloadとincludesとeager_loadの違い]: https://qiita.com/k0kubun/items/80c5a5494f53bb88dc58

[Link1]: https://pikawaka.com/rails/includes

[rails joins 메소드의 특징에 대해 알아보자]: https://negabaro.github.io/archive/rails-join-query-detail