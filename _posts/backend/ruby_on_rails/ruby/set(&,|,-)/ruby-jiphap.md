---
layout: post
title: "ruby 합집합(|),교집합(&),여집합(-)"
author: negabaro kim
tags: ruby
---

ruby에서 합집합,교집합,여집합을 구현하고 싶을때 각각 `|`,`&`,`-`를 사용해 구현할 수 있다.

## 합집합(|)

```ruby
[1,1,2,3,3] | [3,4,5]
# => [1, 2, 3, 4, 5]
```

양쪽에 중복되는 요소를 제외


## 교집합(&)

```ruby
[1,1,2,3,3] & [3,4,5]
# => [3]
```

univas_users = univas_users.filter{|user|
        (user_attributes(user.roles, org) & @attributes).present?
      }

양쪽다 존재하는 값만 추출

## 여집합(-)

```ruby
[1,1,2,3,3] - [3,4,5]
=> [1, 1, 2]
```

```ruby
  def attribute_invalid?
     @attributes.present? && (@attributes.to_a - UnivasUser.roles.keys).present?
  end

  def role_invalid?
    @roles.present? && (@roles.to_a - UnivasUser.permit_roles.values.map{ |role| role.to_s.gsub("Permit", "") }.push("Unknown")).present?
  end

  def school_year_invalid?
    @school_years.present? && (@school_years.to_a - UnivasUser.school_year_lists.keys).present?
  end
```

왼쪽배열에 존재하지만 오른쪽배열에 존재하면 제외하고
왼쪽배열에 있고 오른쪽배열에 없으면 제외되지 않음.

## 메모

교집합 = せきしゅうごう(積集合) = ∩

여집합 = よしゅうごう(余集合) = -

합집합 = わしゅうごう(和集合) = ∪

⊂, ∈



```
∈	∋	⊆	⊇	⊂	⊃	∪	∩	∧	∨
```