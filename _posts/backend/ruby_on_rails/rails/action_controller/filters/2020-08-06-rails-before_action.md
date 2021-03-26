---
layout: post
title:  rails before_action이란
description: 컨트롤러에 정의된 메소드가 실행되기전에 특정 처리를 할때 사용 
description: skip_before_action을 사용하면 skip가능
tags: rails
---


# before_action이란?

컨트롤러에 정의된 메소드가 실행되기전에 특정 처리를 할때 사용
action controller의 filters안에 분류되는 기능이다.(rails4 이전에는 before_filter라는 이름이었다.)

문법은 아래와 같다.

```ruby
before_action :메소드명
```

관습적으로 컨트롤러의 상단에 정의한다.

`before_action :authenticate_user!`

`authenticate_user!`은 devise에서 로그인이 되었는지 판별하는 헬퍼 메소드이다.
위 코드를 실행하면 각 액션이 실행되기전에 로그인이 되었는지 판별후, true면 액션을 실행하고 false라면 로그인 페이지로 리다이렉트하게 된다.


# 문법

기본적으로 `before_action :authenticate_user!`와 같이 기술하면 해당 컨트롤러에 있는 모든 메소드(액션)가 타깃이된다.

index,show메소드가 있고 show에서만 실행하고 싶을때는 except나 only와 같은 옵션을 사용한다.

```ruby
before_action :authenticate_user!, except: :index # index빼고 실행
before_action :authenticate_user!, only: :show # show만 실행
```

## 복수의 메소드를 지정하고 싶을때

index,show일때만 실행하게하고 싶을때는 아래와 같이 사용한다.
심볼,문자열 둘다 가능하다.


```ruby
before_action :authenticate_user!, only: [:index, :show]
before_action :authenticate_user!, only: ["index", "show"]

#퍼센트 기법을 사용하면 아래와 같이도 가능
before_action :authenticate_user!, only: %i[index show]
before_action :authenticate_user!, only: %w[index show]
```

# if,unless statement

특정 조건일 경우 해당 액션을 실행하고 싶을때 if,unless 옵션이 사용가능하다.

```js
before_action :authenticate_user!, if: :메소드명
```


## proc

proc을 지정하는것도 가능
proc을 사용하면 메소드가 아닌 하나의 코드를 지정가능하므로 짦은 로직이라면 proc을 이용하는게 코드의 가독성을 높일 수 있다.


```ruby
before_action :methodA, if: proc { user_signed_in? && current_user.id == 1 } 
```


## lambda

lambda를 사용하는것도 가능

```ruby
before_action :methodA, if: -> { user_signed_in? && current_user.id == 1 } 
```

```ruby
before_action :methodA, if: proc { user_signed_in? && current_user.id == 1 } 
```

이렇게도 가능


# 복수의 메소드를 지정하는 방법

복수의 메소드를 지정하는 방법은 2가지 있다.

```ruby
before_action :메소드A, 메소드B, 메소드C
```

```ruby
before_action :메소드A
before_action :메소드B
before_action :메소드C
```

개인적으로는 액션의 역할별로 나누는것을 선호하는 편

```ruby
before_action :set_user, :set_message #인스턴스에 set하는 메소드만 1열
before_action :check_user, :check_published_time # 판정로직 메소드만 1열
```

# 파라메터가 있는 메소드를 지정하고 싶을 경우

파라메터를 가지는 메소드를 지정하고 싶을때는 기술방법이 틀리므로 주의가 필요하다.

```ruby
before_action -> { 메소드(파라메터) }
```


### reference:

```
https://pikawaka.com/rails/before_action
```