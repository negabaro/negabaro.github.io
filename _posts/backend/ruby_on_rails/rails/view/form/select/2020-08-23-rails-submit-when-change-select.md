---
layout: post
title:  "rails select선택시 form submit실행시키는 법"
author: negabaro kim
tags:	rails/view
---

rails에 국한된 얘기는 아니지만 select선택시 해당 form에 post를 하는 방법을 알아보자.


# 컨셉

select form에 `action_id`라는 id를 부여
submit할 form에 `submit_form`라는 id를 부여

select form에 해당하는 `action_id`를 가진 돔이 변경되면

`submit_form`을 가진 form에 `submit()`메소드를 실행시킴.

# enum작성

```ruby
#app/models/action.rbs
class Action < ApplicationRecord

  enum action_list: {
    'Question1': 1,
    'Question2': 2,
    'Question3': 3
  },  _prefix: true

end
```

# app/views/xx.slim

```ruby
.container
  = form_with(url: action_path, method: :post, id: :submit_form) do |f|
    .select.is-small
      = f.select :action_id, Action.action_lists, {'onchange': 'submit(this.form)'}

javascript:
  document.querySelector('#action_id').addEventListener('change',function(e){
    const submit_form = document.querySelector('#submit_form');
    submit_form.submit();
```


# 결과

[![Image from Gyazo](https://i.gyazo.com/4899cc05a550033d43c418bcb9b2c0d3.gif)](https://gyazo.com/4899cc05a550033d43c418bcb9b2c0d3)