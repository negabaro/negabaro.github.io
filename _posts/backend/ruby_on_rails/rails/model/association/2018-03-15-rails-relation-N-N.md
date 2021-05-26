---
layout: post
title:  "rails5.1에서 N:N 관계형 모델 만들기"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice.jpg"
---



![image](https://user-images.githubusercontent.com/4640346/37501663-ba2aac30-2912-11e8-9c0a-44fa05e64914.png)

하나의 상품은 복수의 카테고리에 속하고 하나의 카테고리는 복수의 상품이 존재하므로 
상품과 카테고리의 관계는 N:N이라고 할 수 있습니다.

rails N:N을 구현하는 방법을 알아봅시다.

레일즈에서 N:N방식을 구현하는 방법은 ActiveRecord의`has_many`나 `has_and_belongs_to_many`를 사용하는 방법이 있습니다.


#### has_many와 has_and_belongs_to_many의 차이 


| Option name | Description | 
|-------|--------|---------|
| has_many | 중간테이블을 표현하는 클래스를 작성해야함, 확장성이 용이  | 
| has_and_belongs_to_many | 중간테이블을 표현하는 클래스를 작성하지 않아도됨, 확장성이 떨어짐 | 

has_many를 쓰든 has_and_belongs_to_many를 쓰든 레일즈에서 N:N구현을 위해서 중간테이블 작성은 필수 입니다. 
둘의차이는 중간테이블을 표현하는 클래스를 만드냐 안만드냐의 차이입니다.

특별한 이유가 없는한 확장성이 용이하는 has_many를 선택하는게 좋을듯 합니다.


### 프로젝트 작성 

#### has_many용 프로젝트 작성

{% highlight ruby %}
rails new rails-relation-n-n-has_many
cd rails-relation-n-n-has_many
{% endhighlight %}


#### has_and_belongs_to_many용 프로젝트 작성

{% highlight ruby %}
rails new rails-relation-n-n-has_and_belongs_to_many
cd rails-relation-n-n-has_and_belongs_to_many
{% endhighlight %}



### 모델&테이블 작성

Category모델과Categories테이블을 작성해줍니다.

{% highlight ruby %}
rails g model Category name:string
rake db:migrate
{% endhighlight %}

Product모델과Products테이블을 작성해줍니다.

{% highlight ruby %}
rails g model Product name:string price:integer
rake db:migrate
{% endhighlight %}


has_many인경우,CategoryProduct모델과 categories_products테이블을 작성해줍니다.

{% highlight ruby %}
rails g model CategoryProduct category_id:integer product_id:integer
rake db:migrate
{% endhighlight %}



has_and_belongs_to_many를 사용시에는 categories_products테이블만 작성해줍니다.

{% highlight ruby %}
rails g migration create_categories_products category_id:integer product_id:integer
rake db:migrate
{% endhighlight %}


### 모델에has_many와belongs_to을 추가

#### has_many의 경우


{% highlight ruby %}
# app/models/category.rb
class Category < ActiveRecord::Base
  has_many :category_products
  has_many :products, through: :category_products

  # through 옵션에 의해 category_products경유해서 products에 접근이 가능해짐
  # 정확히는 category.products로 상품 접근이 가능해짐
end

# app/models/category_product.rb
class CategoryProduct < ActiveRecord::Base
  belongs_to :category
  belongs_to :product
end

# app/models/product.rb
class Product < ActiveRecord::Base
  has_many :category_products
  has_many :categories, through: :category_products


  # through 옵션에 의해 category_products경유해서 categories에 접근이 가능해짐
  # 정확히는 product.categories로 카테고리 접근이 가능해짐
end
{% endhighlight %}


#### has_and_belongs_to_many인 경우


{% highlight ruby %}
# app/models/category.rb
class Category < ActiveRecord::Base
  has_and_belongs_to_many :products
end

# app/models/product.rb
class Product < ActiveRecord::Base
  has_and_belongs_to_many :categories
end
{% endhighlight %}


### 사용가능해지는 커맨드(has_many/has_and_belongs_to_many 공통)

#### 오브젝트 작성/db저장 관련

{% highlight ruby %}
category1 = Category.create(name: "카테고리1") # category작성/DB저장
category1.products.create(name: "상품2", price: 200) # category1에 관련된 상품 작성/DB저장
{% endhighlight %}

##### 실행결과

```
   (0.1ms)  begin transaction
  SQL (0.6ms)  INSERT INTO "products" ("name", "price", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["name", "상품2"], ["price", 200], ["created_at", "2018-03-22 09:27:54.376770"], ["updated_at", "2018-03-22 09:27:54.376770"]]
  SQL (0.3ms)  INSERT INTO "category_products" ("category_id", "product_id", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["category_id", 1], ["product_id", 2], ["created_at", "2018-03-22 09:27:54.393183"], ["updated_at", "2018-03-22 09:27:54.393183"]]
   (138.1ms)  commit transaction
=> #<Product id: 2, name: "상품2", price: 200, created_at: "2018-03-22 09:27:54", updated_at: "2018-03-22 09:27:54">
```

#### 릴레이션 관련

{% highlight ruby %}
product3 = Product.create(name: "상품3", price: 1000) # product작성/DB저장
category1.products << product3 # product3을 category1에 관계설정 
{% endhighlight %}

##### 실행결과

```
(0.3ms)  begin transaction
  SQL (1.1ms)  INSERT INTO "category_products" ("category_id", "product_id", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["category_id", 1], ["product_id", 3], ["created_at", "2018-03-22 09:36:57.731918"], ["updated_at", "2018-03-22 09:36:57.731918"]]
   (117.9ms)  commit transaction
  Product Load (0.4ms)  SELECT  "products".* FROM "products" INNER JOIN "category_products" ON "products"."id" = "category_products"."product_id" WHERE "category_products"."category_id" = ? LIMIT ?  [["category_id", 1], ["LIMIT", 11]]
=> #<ActiveRecord::Associations::CollectionProxy [#<Product id: 2, name: "상품2", price: 200, created_at: "2018-03-22 09:27:54", updated_at: "2018-03-22 09:27:54">, #<Product id: 3, name: "상품3", price: 1000, created_at: "2018-03-22 09:32:22", updated_at: "2018-03-22 09:32:22">]>
```


### has_many의 경우 사용가능한 커맨드
##### ※has_and_belongs_to_many는 모델이 없으므로 사용불가

#### 중간테이블

{% highlight ruby %}
CategoryProduct.all # category_products의 전레코드 표시
# CategoryProduct모델이 존재함으로 인해, 중간 테이블의 validation이나 속성 추가가 가능해짐
{% endhighlight %}




## 메모

### habtm

`has_and_belongs_to_many`는 길어서 `habtm`이라고 줄여서 사용함

---


[original]:      http://ruby-rails.hatenadiary.com/entry/20141204/1417688260
