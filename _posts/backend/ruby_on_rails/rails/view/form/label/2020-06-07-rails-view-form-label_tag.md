
---
layout: post
title: "Rails6.0 label_tag에 대해서"
author: negabaro kim
categories: rails
tags: view
---

# label_tag란?

rails에서 form에 의존하지 않고 label dom을 작성하는 문법


아래 장/단점은 필자가 사용해보고 느낀 주관적인 해석이다.

# 장점

기존 dom으로 작성하는것보다 조금 심플하게 작성 가능하다.
(후술하지만 label_tag에 관해서는 그냥 dom작성하는거에 비해서 많이 심플해지는건 아닌 느낌)


# 단점

rails form에 대한 이해가 없는사람들은 이해하기 어렵고 구현하기위해 다소 시간이걸림

유연성이 떨어진다고 해야할까.
어떤 돔을 만들려면 label_tag로 어떻게 만들어야돼지? 하고 해당 dom을 만들기 위한 방법을 구글링 해야함



# label vs label_tag

form에 의존하느냐 안하느냐의 차이 label의 경우 form에 의존함.


# 문법

```ruby
label_tag(name = nil, content_or_options = nil, options = nil, &block) public
```

첫번째 인자 name
두번째 인자 content_or_options
세번째 인자 options

에 대해 알아보자


# 첫번째 인자 name

```ruby
label_tag 'name'
# => <label for="name">Name</label>
```

첫번째 인자가 for안의 값으로 들어가고
capitalize해서 tag안에 문자까지 넣음.

일본이나 한국 같은경우는 for안은 영어 tag안에 문자는 일본어/한국어/영어 다양하게 들어가므로
거의 쓰지않을듯.
아주 그냥 영어권을 고려한 규약이구만..


# 두번째 인자 content_or_options

```ruby
label_tag 'name', 'Your name'
# => <label for="name">Your name</label>
```

2번째 인자에 영어/일본어/한국어를 넣을 수 있음.
비영어권을 고려한 규약..!


# 여기서 의문.. tag안 값은 넣지않고 for안에만 넣어주고 싶을때는?

아래와 같은 dom을 만들어줄때

```html
<label for="xx" />
```

check_box나radio_button의 id명이랑 맞춰서 자주쓰는 패턴인데
label_tag로 어떻게 구현해야할까?

몇가지 실험해본 결과 2번째 인자에 공백을 넣어주면 되었다.

```ruby
label_tag 'switch1', nil
# => <label for="switch1">switch1</label> #실패

label_tag 'switch1', ''
# => <label for="switch1"/> #오 성공!!
```

2번째 인자에 nil을 넘기면 실패했음.


# 세번째 인자 options

class,id등을 지정가능
3번째 인자 뒤에 다른 인자를 넘겨줘도 options로서 처리됨.


```ruby
label_tag 'name', nil, class: 'small_label'
# => <label for="name" class="small_label">Name</label>
```

3번째 인자를 사용하기 위해서는 2번째 인자를 사용하지 않더라도 nil을 넘겨줘야한다.
(안그러면 3번째 인자가 뭔지 판단 불가)


# label_tag는 써야할까?

필자가 이때까지 경험한 프로젝트에서 label_tag를 거의 사용하지 않았다.


label_tag를 사용한 예제들과 그냥 dom으로 작성한 문법을 비교해보면 심플해졌다고는 보기힘들었다.

```ruby
= label_tag "filter[user]", User.model_name.human
label(for="filter[user]", User.model_name.human)
```

```ruby
label(for="switch1")
= label_tag("switch1", '')
```

label_tag문법을 알고 있는 사람이라면 rails문법에 맞추고 싶은 충동에 label_tag를 사용할지도 모르겠지만 굳이 이걸 써야하나 라는 생각이 들긴함



### reference:

```
https://apidock.com/rails/ActionView/Helpers/FormTagHelper/label_tag
```