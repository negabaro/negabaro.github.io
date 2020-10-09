---
layout: post
title:  "Rails6 ancestry gem을 이용해 tree구조의 관계를 만들어보자"
author: negabaro kim
tags:	rails/gem
---

# 개요

이 포스트에서는 rails에서 tree구조 관계를 만들 수 있는 ancestry gem에 대해 알아보자.

# ancestry란?

ancestry는 선조,조상이라는 의미에서 알 수 있듯이

rails에서 간단히 tree구조 기능을 만들 수 있는 gem이다.

# 사용예제

많이 쓰는 패턴으로는 tree형 카테고리를 만들때 자주 사용한다.

그 외에도 조직간의 관계를 나타날때도 사용이 가능하다.


# 사용시 주의할점

필자는 부모가 복수인 케이스가 있었는데 조사결과
복수의 부모를 가질 수 는 없다고한다.


# 설정방법

```ruby
gem 'ancestry'
bundle install
rails g migration add_ancestry_to_[table] ancestry:string:index
rake db:migrate
```


```ruby
class Organization < ApplicationRecord
  has_ancestry
end
```

# 사용방법

A조직밑에 B조직을 위치 시키고 싶다면 

B조직 작성시 ancestry에 A조직의 id를 넣어주면 된다.

# 옵션

옵션은 아래와 같다.

![image](https://user-images.githubusercontent.com/4640346/95549415-33e99f00-0a42-11eb-9d48-203d4ea85c3c.png)

## 자주 사용하는 옵션

### descendants

![image](https://user-images.githubusercontent.com/4640346/95549586-84f99300-0a42-11eb-93c1-56d4a388ca21.png)


현재 조직 하위에 존재하는 모든 조직들을 가져오고 싶을때 사용할 수 있다.

### reference:


[공식도큐멘트](https://github.com/stefankroes/ancestry)

[link1](https://qiita.com/Sotq_17/items/120256209993fb05ebac)

[link2](https://techtechmedia.com/gem-ancestry-rails/)