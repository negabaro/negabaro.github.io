
---
layout: post
title:  "rails cancancan이란?"
description: 유저의 권한부여를 일괄적으로 관리가능한 gem
author: negabaro kim
tags:	rails/gem/cancancan
---

# cancancan이란?

유저의 권한부여를 일괄적으로 관리가능한 gem이다.

CanCan이 멘테넌스를 멈춘관계로 CanCanCan이라는 새로운 리포지토리가 만들어짐.


# 인스톨 방법


## bundle install

```ruby
gem 'cancancan'
bundle install
```

## Ability클래스 생성

CanCanCanでキモとなるAbilityクラスを作成します。
とはいえ、rails genereteを使用します。

```ruby
rails g cancan:ability
```

これで、app/models/ability.rbが作成されます。
デフォルトではinitializeがあるものの、特に記載がないため、今回の条件に合わせておきます。
なお、今回はadminとmemberの2つの権限を作り、adminは全て実行可能、memberはリードオンリーなイメージとします。

```ruby
class Ability
  include CanCan::Ability

  def initialize(user)
  end
end
```
を作成してくれます。

権限があるかはcan?メソッドで判定することが出来ますが、このとき暗黙的に

def current_ability
  @current_ability ||= Ability.new(current_user)
end
が呼び出されます。


# current_ability custom

필자의 경우 params값도 Ablity클래스에 넘기기 위해 current_ability메소드를 아래와 같이 오버라이드했다.

```ruby
class ApplicationController < ActionController::Base
  private
  def current_ability
    @current_ability ||= Ability.new(current_user, params)
  end
end
```

もし、権限を判定するユーザーにcurrent_userを使いたくない場合は、ApplicationControllerでcurrent_abilityをオーバーライドすることで、いろいろ弄くり回せます。（例えば、オペレーション権限を持つユーザーが、ログイン後に他のユーザーに成りすましてシステムを操作する場合があるなど）



# 사용방법

can?

# can에 들어가는 파라메터

基本の権限には

read ... 参照
create ... 登録
update ... 更新
destroy ... 削除
manage ... すべて
があります。注意したいのは「manage / すべて」というのは「read+crete+update+destroy」というわけではないことです。
上の例では「buy / 購入」という権限を独自に作っていますが、manage権限ではbuyも可能になります。
そこでデフォルトの権限付与で、製品の購入を禁じ、もしuser.customer? = trueならば購入可能になるようにしています。
あるモデルのある権限にcanとcannotが重なって付与された場合、最後に適応されたほうが有効になるようです。


## 파라메터에 동적 인스턴스(?)를 적용하는 방법

예제로 많이 등장하는데 필자는 아래 2가지 이유로 사용하지 않는다.

해당 인스턴스가 어떠한 이유로 바뀌었을때 제대로 동작하지 않을 가능성이 있다.

검색이 불편하다.

- if can? :read, org
하기싫은게 org값 조금 바꾸다보면 안움직이는 경우가 많음


# 기본적으로 controller,view에서만 사용이 가능

controller에서 current_ability변수를 넘겨주면 controller,view외에서도 사용이 가능하다

```ruby
OrganizationPresenters::ShowPresenter.new(@organization, current_ability)

class ShowPresenter
  def initialize(org, ability)
    ability.authorize! :org_show, @organization
  end
end
```

필자는 개인적으로 view에 `- if can? XX`과 같은 로직이 많아지는거
presenter층에서 권한을 판별후 view에 넘기는 방법을 선호한다.


# authorize_resource

class Organization::ConfigController
  authorize_resource 



  하면 우에됨??
      can :read, OrganizationConfig  << 이건 안먹힘
      can :read, Config  << 이게먹힘


고로 컨트롤러명만 먹힘..곤란하나ㅔ

https://qiita.com/umanoda/items/679419ce30d1996628ed






### reference:

```
https://qiita.com/betti/items/6807cc5a82b6d676c847
https://qiita.com/umanoda/items/679419ce30d1996628ed
https://qiita.com/naoki85/items/266c8d7ab469cc6ab1fe
```

[cancancan]: https://github.com/CanCanCommunity/cancancan
[cancancan使用時、controller,view以外でcan?メソッドを使う方法]: https://teratail.com/questions/282994?whotofollow=
