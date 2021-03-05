---
layout: post
title:  "rails6 collection_radio_buttons 사용시 디폴트 값 설정하는 방법"
author: negabaro kim
tags:	rails/view
---

collection_radio_buttons사용시 디폴트 값을 설정해주지 않으면 아래와 같이 표시된다.

![image](https://user-images.githubusercontent.com/4640346/110094386-1b0dcb80-7ddf-11eb-8c10-e997b921dd4f.png)

선택없음이 유효하다면 이대로 좋지만 무조건 하나를 선택해야 하는 경우 디폴트 값을 설정해줘야 하는데 매번 까먹으니 이 포스트에 정리해본다.


## 결론

```collection_radio_buttons(오브젝트명, 콜랙션명, 메소드명, 밸류값 [, 옵션])```

의 옵션부분에 `{ checked: 디폴트로 지정하고 싶은 밸류값 }`을 지정해주면 된다.

아래는 실제 코드 예이다.

```ruby
= f.collection_radio_buttons :attendance_state, Test.attendance_states, :first , :first, { checked: Test.attendance_states.first[0] } do |b|
  = b.radio_button(class: "is-checkradio")
  = b.label
```


```ruby
#app/models/test.rb
ATTENDANCE_STATE0 = 'なし'
ATTENDANCE_STATE1   = 'あり'
enum attendance_state: { "#{ATTENDANCE_STATE0}": 0, "#{ATTENDANCE_STATE1}": 1 }.freeze
```

### 주의사항

구현시 주의사항에 대해 정리해본다.

#### 주의사항1. checked안에 밸류값을 넣어주자

[StackOverflow]에서도 같은 착각을 한 사람이 있었는데 밸류값을 지정하지 않고 object를 넘겨주면 정상작동하지 않는다.

> Test.attendance_states.first -> NG

> Test.attendance_states.first[0] = 'なし' -> OK


#### 주의사항2. 옵션은 4번째 인자에 위치한다. 

> :attendance_state, Test.attendance_states, :first , :first, {}, { checked: 'なし' } -> NG

> :attendance_state, Test.attendance_states, :first , :first, { checked: 'なし' } -> OK


#### 주의사항3. enum사용시 enum의 밸류값을 적용해주자.

디비값이 0이라고 0을 그대로 넘겨주면 정상동작하지 않는다. 

#### 주의사항4. 스키마 정의시 디폴트값 지정해주자

DOM형식을 변경해서 선택을 하지않고 POST했더라도 자동으로 디폴트값이 들어가게 스키마에 디폴트값을 선언해주자(+ null false도)

```ruby
  def change
    create_table :test do |t|
      t.integer :attendance_state, null: false, default: 0

    end
```

성공적으로 디폴트 설정이 되었다면 아래와 같이 표시됨

![image](https://user-images.githubusercontent.com/4640346/110095598-6d9bb780-7de0-11eb-9acc-cac0a61f371f.png)



---

[StackOverflow]: https://stackoverflow.com/questions/24276478/how-do-i-set-a-default-checked-option-with-rails-collection-radio-buttons


