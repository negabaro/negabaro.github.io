---
layout: post
title: "Rails6.0 presenters영역이 필요한 이유"
author: negabaro kim
categories: rails
tags: rails
---

# presenter란?

특정 모델 인스턴스에 종속되는 뷰로직을 `decorator`에 정의하는데
복수의 모델인스턴스를 사용하는 뷰로직을 정의할때 presenter영역을 정의해 모아둔다.


# presenter 영역이 필요한 이유


컨트롤러에서 뷰로 넘기는 인스턴스는 항상 하나인것이 베스트프랙티스라고한다
필자는 잘모르나 `Sandi Metz`라고 레일즈계에서 잘나가는분이 하신 말씀이니 되도록 그대로 따르도록 하자

확실히 여러 인스턴스를 넘기면 컨트롤러 코드도 난잡해지고 가독성도 떨어졌다.
특히 콜백 + 과도한 module화로 해당 컨트롤러에 어떤 인스턴스를 넘기는지 일일이 파악하기 힘들때 프리젠터 영역에 집약되어 있으면
굉장히 도움이될거 같다.

사용빈도가 높아 application_cotroller등에서 정의한 인스턴스나 devise의 current_user같은 경우 필자는 예외처리 하고 있다.


그럼 실제 코드를 살펴보자

# app/presenters

무조건 presenters디렉토리에 만들 필요는 없긴하나 암묵적으로 presenters를 사용하는거 같다.
rails6.0부터는 autoload_path설정도 필요없이 바로 로드되었다.


```ruby
#app/presenters/organization_presenters/show_presenter.rb
module OrganizationPresenters
  class ShowPresenter
    def initialize(org)
      @@organization = org
      @@members = org.approved_members_with_profile
      @@organizations = org.related_org_list
    end

    def org
      @@organization
    end

    def more_info_status(items)
      items.count >= 6
    end

    def member_more_info_status?
      more_info_status(@@members)
    end

    def org_more_info_status?
      more_info_status(@@organizations)
    end

    def member_list
      @@members.first(5)
    end

    def org_list
      @@organizations.limit(5).decorate
    end

  end
end
```

# 컨트롤러 부분

app/decorators에서 작성한 모듈을 불러온다.

```ruby
  def show
    @items = OrganizationPresenters::ShowPresenter.new(@organization)
  end
```


# view부분

```ruby
= render partial: 'organization/show_members', locals: {members: @items.member_list, org: @items.org, more_info_status: @items.member_more_info_status? }
```

참고로 필자는 partial로 템플릿을 나눌때 해당 템플릿에 사용하는 변수만 일일이 locals에 담아보낸다.

이유는 크게 3가지이다.

1. 다른 뷰에서 사용하기 쉽다
2. 변수명 변경시 고칠 부분이 적어진다.
3. 해당 템플릿에서 사용하는 변수를 알기쉽게 확인하기 위해

### 참고할만한 github code

https://github.com/kpumuk/presenter-example



### reference:

```
https://qiita.com/Coolucky/items/6034f634c896662cba6a
https://github.com/kpumuk/presenter-example/blob/master/app/presenters/home_presenters/show_presenter.rb
```