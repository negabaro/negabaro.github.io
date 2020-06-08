---
layout: post
title: "Rails6.0 collection_check_box란?"
author: negabaro kim
categories: rails
tags: view
---

# collection_check_box란?

activeModel에서 관리하는 데이터와 연결해
checkbox리스트 DOM을 작성하는 레일즈의 view::helpers의 메소드

# 장점

빠르게 코딩이 가능(적응하면)
특히 웹에서 자주 있는 복수의 체크박스를 선택하는 폼 작성시 효율적
(ex. 경험해본 언어를 체크하시오. 복수의 카테고리를 선택할때)

# 단점

학습코스트가 필요(개인적으로 얻어지는 메릿보다 학습코스트가 더큰듯..)
규율이 심해서 엔지니어의 자율성을 침해
이게 코딩인지 암기과목인지 현타가 찾아옴

체크박스를 선택하는 페이지가 얼마나 많냐에 따라 학습코스트에 따른 메릿의 비율이 달라질듯

# 문법

formbuilder의 레시버로 사용할경우(form에 의존하는)와 아닌경우 2가지로 나뉜다.

## form에 의존하는경우

```ruby
f.collection_check_boxes(method, collection, value_method, text_method, options = {}, html_options = {}, &block)
```

첫번째 인자인 object를 생략가능하다.

## 아닌경우

```ruby
collection_check_boxes(object, method, collection, value_method, text_method, options = {}, html_options = {}, &block)
```

첫번째 인자인 object를 지정해줘야한다.


# argument설명

각 argument에 대한 설명

## 첫번째 인자 object(생략가능)

데이터를 저장할 테이블명
form에 의존하는 collection_check_box를 사용시 생략가능하다.

object인자에 넣어준값이 아래 결과의 xx부분이된다.

```html
<input type="checkbox" name="xx[yy] />
```

formbuilder를 사용할경우 아래의 `form_with scope:`에 지정한 부분이 선택된다.

```ruby
- form_name = :xx
= form_with(scope: form_name, url: create_xx_path, method: :post do |f|
  = f.collection_check_boxes(생략)
```

## 두번째 인자 method(생략가능)

데이터를 저장할 컬럼명을 지정
지정하지 않으면 check_box돔의 name값이 사용됨

`object.method`의 값이 후술할 value_method의 결과와 일치하면 checked상태가 됨.


method인자에 `:yy`나`"yy"`라고 지정해주면 아래와 같은 폼이 만들어진다.

```html
<input type="checkbox" name="xx[yy] />
```

사용하지 않을 경우 `nil`을 적어주면된다.


## 세번째 인자 collection(필수)

collection_check_box의 핵심 옵션..!

여기에 지정한 데이터의 수만큼 check_box가 생성됨
이름에서 나오듯 collection형태만을 받을 수 있음. 단순 배열을 넘기면 에러가나므로 주의
1,2번째 인자와 관계없이 동작이 가능


※배열혹은 ActiveRecord::Relation형태면 가능하다는 문구도 발견 
배열이 들어가지나??



## 4번째 인자 value_method(필수)

input tag의 value속성에 들어갈 값
주의해야될게 collection안의 요소에 존재하는 컬럼을 지정해야한다.(이부분 주의가 필요)

예를들어 collection안에 pp라는 요소가 있고 해당값이  zz라면
아래와 같이 렌더링된다.


```ruby
collection.pp = "zz"
# => <input type="checkbox" value="zz" />
```

value적기 싫다고(value가 없으면 의미가 없는 form이지만) 안적어주고 싶어도
rails의 규약에서는 그것을 기만으로 판단하고 허용하지 않는다.
nil도 안먹힘. 무조건 collection안에 있는 요소를 하나 지정해줘야한다..(ㅎㄷㄷ)

## 5번째 인자 text_method(필수)

input tag안의 텍스트에 들어갈 값
value_method와 마찬가지로 collection안의 요소에 존재하는 컬럼을 지정해야한다.

그런데 text가 필요없을땐 어떻게 해야하나??
그딴건 고려하지 않음..무조건 collection안의 요소중 하나를 지정해야한다. (쓰지도 않지만)
text없이 check_box만드는 케이스도 많은데 이걸 강제하는 이유를 모르겠음..


## 6번째 인자 options,7번째 이후 인자는 html_options(생략가능)

초기선택값이나 id,class를 지정할때 사용
필수옵션이 아님.

## &block(생략가능..)

아래 코드의 do ~end사이에 들어가는 내용
```
collection_check_box(...) do
end
```


생성되는 체크박스의 형태나 라벨을 변경할때 사용

생략한적은 아직 한번도 없지만 생략이 가능하다. 생략하면 collection.text가 라벨에 자동으로 추가됨

## block의 사용예제

```
= f.collection_check_boxes(nil, @list, :entity_id, :entity_id) do |b|
  = b.check_box class: 'is-checkradio'
```


# DB에 존재하지 않는 값을 collection에 넣고 싶을때는?

단순배열이 가능하다는 글도 봤는데 필자가 테스트한 결과 동작하지 않음.
DB에 존재하는 값을 checkbox리스트에 두고 싶을때는

ActiveModel을 만들어서 ActiveRecord와 같은 클래스를 만드는게 편함

```ruby
class Prefecture
  include ActiveModel::Model
  attr_accessor :id, :name
  ALL = %w[서울 대전 대구 부산].map.with_index(1) {|name, index| new(id: index, name: name)}.freeze
end
```

# collection_check_box를 사용하지 않고 check_box리스트를 구현하는법

collection_check_box를 사용하지않고 다른 rails문법으로 check_box리스트를 구현하는법
each로 loop해서 만드는 수밖에 ^^;

```ruby
@configs = [{name: '111', value: oc.status1, dom_id: 'status1'},
              {name: '222', value: oc.status2, dom_id: 'status2'},
              {name: '222', value: oc.status3, dom_id: 'status3'}]
= form_with(url: organization_config_path, method: :put, local: true, data: { confirm: "are you sure?" } ) do |f|
  .border-list
    - @configs.each do |b|
      .border-list-item
        .border-list_title
          label
            = b[:name]
        .border-list_check
          .field
            = check_box_tag("config[#{b[:dom_id]}]",true, b[:valueid: b[:dom_id], class: 'switch')
            = label_tag(b[:dom_id], '')
```


### reference:

```
https://qiita.com/tanutanu/items/b86c4adc26ae464c71fd
https://qiita.com/RaimuEr/items/58971510735c6b906c50
```