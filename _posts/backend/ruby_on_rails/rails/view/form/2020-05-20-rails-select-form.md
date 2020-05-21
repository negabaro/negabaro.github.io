---
layout: post
title:  "rails select form을 알아보자"
author: negabaro kim
categories: rails
tags:	rails
---

rails view template에서 자주사용하는 select,select_tag에 대해 알아보자.

# select

기본문법은 이하와 같다.

```
form_with mode: xx, url: xx_path do |f|
  f.select( 프로퍼티명, 태그정보, {옵션}, {HTML옵션} )
```

## 프로퍼티명: 컬럼명

form_for에서는 프로퍼티명 = DB컬럼명으로 강제되어서
일치하지 않을시 에러가 나곤 했었는데 
form_with에서는 컬럼명을 자유롭게 지정할 수 있어서 자유도가 높아졌다.


## 태그정보: 셀렉트박스 표시에 사용하는 값을 넣는다 배열/해쉬 만 가능

실제 렌더링시 option값에 해당하는 부분

```
select
 option
```

태그정보의 문법은 배열일 경우와 해쉬일 경우 각각 아래와 같다.

#### 배열일 경우

```ruby
[[ 외부 값1, 내부 값1 ], [ 외부 값2, 내부 값2 ]]
```

#### 해쉬일 경우

```ruby
{ "외부값1" => "내부값1", "외부값2" => "외부값2" }
```

## 옵션: 셀렉트박스의 옵션(include_blank나selected등)

공식적인 select dom의 옵션등을 여기에 지정
include_blank,selected 외에 써본적은 없음


## HTML옵션: HTML의 옵션(id,class등)

id,class이외에도 제약없이 자유럽게 넣어줄 수 있음
vue template으로 rails의 view를 사용시 vue의 옵션들을 여기에서 지정해줌(v-model,v-on:change)

# 사용 예제

필자가 현업에서 사용한 예제를 몇개 살펴보자.


## 사용 예제1(프로퍼티명과 태그정보만 사용)

```ruby
#slim                         
= f.select :system_id, User.all.select(:system_id).map{|v|v.system_id}
```

옵션,HTML옵션은 필수가 아니라는걸 알 수 있다.

## 사용 예제2(옵션과 HTML옵션 사용)

HTML옵션에서는 vue에서 컨트롤하기 위한 옵션등을 넣었다.

```ruby
#slim
= f.select :year, @items.map{|a| ["#{a[:year]}年度", a[:year]] }, {selected: session[:ro_year]},  {'v-model': 'year', 'v-on:change': 'onChange'}
```

## 사용 예제3(자주 헤매는 부분)

#### 오류가나는 예제

```ruby
#slim
= f.select :game_master_id, @game_masters.map{|m| [m.name, m.id] }, {id: 'xx'}
```

오랜만에 select form사용시 항상 오류가 나는 부분인데 html,html옵션은 정의 순서로 판단하므로
html옵션만 쓰고 싶다고 그것만 정의하면 html옵션 부분을 옵션으로 인식해서 존재하지 않는 옵션이라 에러가 발생함


#### 알맞은 예제

```ruby
#slim
= f.select :game_master_id, @game_masters.map{|m| [m.name, m.id] }, {}, {id: 'xx'}
```

알맞은 예제는 사용하지 않는 옵션은 {}로 정의해줘야함.


### reference:
https://310nae.com/rails-selectbox/