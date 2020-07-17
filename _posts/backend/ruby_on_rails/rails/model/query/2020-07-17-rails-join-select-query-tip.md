---
layout: post
title: "rails joins 메소드 사용시 자동으로 select 지정하는 방법"
author: negabaro kim
tags: rails rails/model
---

[rails joins 메소드의 특징에 대해 알아보자]에서 소개한것처럼
joins메소드는 select로 지정하지 않으면 join대상의 레코드를 가져오지 않는다.


매번 `Owner.joins(:cats).select("cats.*")` 이렇게 지정해주는게 귀찮으므로
몇가지 팁을 이용해 select를 자동으로 지정하는 방법에 대해 소개해본다.


# 개선1

아래와 같은 scope을 이용하면 select를 지정할 필요가 없음

```ruby
scope :joins_get_all_columns, ->(*tables) {
    joins(*tables).select("*")
  }
```

문제점은 중복되는 컬럼이 있을 경우 한쪽만 보여지게 되는 문제가(ex: id,name등)

# 개선2

as 테이블명_컬럼 으로 지정해줘서 중복 컬럼명을 피할 수 있게 되었다.


```ruby
 scope :joins_get_all_columns, ->(*tables) {

    select_stmt = [%{"#{self.table_name}".*}]

    select_stmt << tables.map{|t|

      ar = ActiveRecord::Base.const_get(t.to_s.classify.singularize)

      table_name = ar.table_name

      table_name_single = table_name.singularize

      ar.attribute_names.map{|col|

        %{"#{table_name}".#{col} as #{table_name_single}_#{col}}

      }

    }

    joins(*tables).select(select_stmt.flatten.join(","))

  }
```

# 개선3

아래는 outer join옵션을 추가한 예제

```ruby
  scope :joins_get_all_columns, ->(*tables,outer) {

    outer_join= outer && []

    my_table = self.table_name

    select_stmt = [%{"#{my_table}".*}]

    select_stmt << tables.map{|t|

      ar = ActiveRecord::Base.const_get(t.to_s.classify.singularize)

      table_name = ar.table_name

      table_name_single = table_name.singularize

      outer_join << %{LEFT OUTER JOIN "#{table_name}" ON "#{table_name}"."#{my_table.singularize}_id" = "#{my_table}"."id"} if outer

      ar.attribute_names.map{|col|

        %{"#{table_name}"."#{col}" as "#{table_name_single}_#{col}"}

      }

    }

    joins(outer_join || tables).select(select_stmt.flatten.join(","))

  }

Blog.joins_get_all_columns(:article,false) #=> inner join

Blog.joins_get_all_columns(:article,true) #=> left outer join
```


[rails joins 메소드의 특징에 대해 알아보자]: https://negabaro.github.io/archive/rails-join-query-detail