---
layout: post
title:  "rails6 has_many,has_one에서 바로 select컬럼 지정하는 법"
author: negabaro kim
tags:	rails rails/model
---


모델간의 관계를 설정후 특정 컬럼의 값만 가져오는 경우가 있다.
이럴때 has_many등으로 모델관계를 지정하고 
해당 컬럼의 값을 가져오는 method를 추가할때가 있는데
아래와 같이 모델간의 관계설정후 lambda식을 추가해주면 불필요한 method를 만들 필요가 없어 좋은것 같다.


# before

```ruby
has_many :university_major_organizations
has_many :university_majors, through: :university_major_organizations
```

```ruby
def with_university_majors
  self.university_majors.select('university_majors.name, university_major_organizations.k_code')
end
```


# after

```ruby
has_many :university_major_organizations
has_many :university_majors,->{ select('university_majors.name, university_major_organizations.k_code')}, through: :university_major_organizations
```



### reference:

```
https://qiita.com/yoshixj/items/da1947fb6c159cc28e20
```