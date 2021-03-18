---
layout: post
title:  "Rails routing constraints란"
author: negabaro kim
tags:	rails/routing
---

## constraints란?

rails routing에서 ```constraints```라는 기능을 이용하면 루팅에 특정 조건을 걸 수 있다.


다음은 constraints을 이용한 조건의 예이다.

### get,post제한

```ruby
match 'users', to: 'users#index', via: [:get, :post]
```

GET、POST이외의 억세스가 오면 `ActionController::RoutingError`에서 예외에러가 발생


### Segment Constraints

dynamic segment포맷을 이용해 특정 문자만 접근 가능하게 하는법

```ruby
get 'users/:id', to: 'users#show', constraints: { id: /[A-Z]\d{5}/ }
```

이 경우, `/users/A12345`는 억세스 가능하지만 `/users/893` 일 경우 에러가 발생


### 탭 만들때 사용하는 패턴

같은 페이지에 3개의 탭이 있고 해당탭을 클릭시 url을 변경(SSR)하고 싶은데, 공통처리 부분이 많아 하나의 컨트롤러에서
처리하고 싶을때 아래와 같은 패턴을 자주 사용

```ruby
get '/:attendance_status', to: 'notice#attendance_list', as: 'attendance_list', defaults: {attendance_status: "attendants"}, constraints: { attendance_status: /attendants|absentees|undecideds/ }
```

아래와 같이 status를 넘겨주면 하나의 컨트롤러에서 `params[:attendance_status]`을 받아서 조건분기 처리가 가능

```ruby
attendance_list_organization_notice_path(attendance_status: 'attendants')
attendance_list_organization_notice_path(attendance_status: 'absentees')
attendance_list_organization_notice_path(attendance_status: 'undecideds')
```
---


[참고]: https://y-yagi.tumblr.com/post/92386974040/rails-routing-constraints%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
