---
layout: post
title: "rails undefined method `xx' for nil:NilClass에러"
author: negabaro kim
categories: rails
tags: rails
---

binding.pry에서는

`Items.first.user.id`값이 존재하는데

jbuilder에서

```ruby
    json.array! @items do |t|
      json.id t.id #이 값은 가져옴
      #binding.pry
      json.user_original_img t.user.image_url(:original)
      json.user_id t.user.id


    end
```

이런식으로 설정하면 이하와 같은 에러가나옴.

```ruby
Rendered api/items/index.json.jbuilder (30.1ms)
Completed 500 Internal Server Error in 43ms (ActiveRecord: 2.4ms)

ActionView::Template::Error (undefined method `image_url' for nil:NilClass):
    4:       json.end_time t.end_time
    5:       json.video_id t.video_id
    6:       json.created_at t.created_at
    7:       json.user_original_img t.user.image_url(:original)
    8:       json.user_thumbnail_img t.user.image_url(:thumbnail)
```

에러가 나는 이유가 전혀 감이 안와서 헤맸는데 stackoverflow에 질문해서 흰트를 얻어서 해결!!

`Items.all`안에 일부행의 user_id가 nil이었음.

nil인 부분에 user정보를 연결해주니 해결되었다.

그런데 model에서`option: true`설정을 해준것도 아닌데 어떻게 user_id가 nil값으로 들어가 있지??

`option: true`설정이 없는 이상 user_id없이 insert하면 에러가 날터인데

찾아보니 관계 테이블을 만들기전에 테스트로 넣었던 데이터가 있었던것임..

에러를 다시보니

`undefined method 'image_url' for nil:NilClass`

`for nil:NilClass`

이라고 말하고 있었구나...

### Reference Link:

https://stackoverflow.com/questions/55337135/how-to-return-values-in-json-that-contain-models-to-be-associated-using-jbuilder?noredirect=1#comment97401193_55337135
