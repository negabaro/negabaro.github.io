---
layout: post
title:  "rails6 references 컬럼에 null허용 하는법"
author: negabaro kim
tags:	rails gem
---

# migrate파일 변경

`null: false` -> `null: true`로 변경


```ruby
def change
  create_table :questions do |t|
    t.references :item, null: true, foreign_key: true # << null: true로 변경
  end
end
```

`null: false` 인데 `item_id`가 null이면

`ActiveRecord::NotNullViolation: Mysql2::Error: Field ‘item_id’ doesn’t have a default value`
에러가 발생함


# 모델에 optinal: ture추가


Rails 5이후부터 추가된 기능인데

`belongs_to :item`이라고 기술하면 item_id는 presence: true가 디폴트로 들어감.(null NG)

아래와 같이 `optional: true`를 추가해주자.

```
belongs_to :item, optional: true
```


# 메모1. 

references를 사용하지 않고
`xx_id:integer`형태로 만들어도 가능한데
특별한 이유가 없다면 관계를 나타내는 컬럼은 references형태로 작성하자.
