---
layout: post
title:  rails 특정 컨트롤러에서 before_action skip하는 방법
description: skip_before_action을 사용하면 skip가능
tags: rails
---


# 개요

rails에서는 복수 컨트롤러에서 사용하는 로직이 있을경우, DRY원칙에 맞게
하나의 컨트롤러에 공통으로 사용될 로직을 before_action에 넣고 해당 컨트롤러를 상속받는 구성을 많이 이용한다.

이때 특정 컨트롤러에서는 상속받은 before_action을 실행시키고 싶지 않을때가 있는데 
이 포스트에서는 그 방법에 대해 알아보도록 한다.


# 방법1 - if statement를 사용

첫번째 방법은 before_action의 if statement를 이용하는 방법이다.
부모 컨트롤러에 특정 조건의 메소드를 넣고, 하위 컨트롤러안에서 skip하고 싶을때 해당조건의 값을 false로 만드는 방식이다.

아래 코드는 use_before_action? 메소드를 부모 컨트롤러에 정의하고 skip할 컨트롤러에서 use_before_action?를 false로 재정의하는 예제이다.

#### 부모 컨트롤러


```ruby
class ApplicationController < ActionController::Base
  before_action :before_first, :before_second, if: :use_before_action?
 
  private
 
  def before_first
  end
 
  def use_before_action?
    true
  end
end
```

#### 자식 컨트롤러

```ruby
class TestController < ApplicationController
  def index
  end

  def show
  end
 
  private

  def use_before_action?
    false
  end
end
```

이 방법의 문제점으로는 하위 컨트롤러 전체가 대상이 된다는 점이다.

index만 skip하고 show 메소드는 skip하고 싶지 않을때 이 방법은 유효하지 않다.


# 방법2 - skip_before_action사용


두번째 방법은 skip_before_action을 사용하는 방법이다.

skil_before_action은 before_action과 같이 only옵션이 사용가능해
방법1의 문제점이었던 컨트롤러 내부에서 특정 메소드만 skip하는것이 가능하다.

아래 코드에서는 skil_before_action을 이용해서 TestController의 index메소드만 before_action을 skip하고 있다.

#### 부모 컨트롤러


```ruby
class ApplicationController < ActionController::Base
  before_action :before_first
 
  private
  def before_first
  end
end
```

#### 자식 컨트롤러

```ruby
class TestController < ApplicationController
  skip_before_action :before_first, only: :index

  def index
  end

  def show
  end

end
```

# skip_before_action사용시 주의사항

굉장히 유용한 skip_before_action이지만 많아지면 전체구조를 쫓기 어려울 수 있으므로 
과도한 사용은 자제하도록 하자.
