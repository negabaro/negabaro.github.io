---
layout: post
title:  "rails5.1에서 1:N 관계형 모델 만들기"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice.jpg"
---


### 1:N관계란

![image](https://user-images.githubusercontent.com/4640346/37499349-813002f6-2906-11e8-8a09-18e7dfed9410.png)


고객(customer)1명이 복수의 주문(order)을 할 수 있고 주문은 반드시 어떤 한명의 고객에 의해 주문되어지므로
customer와order는 1:N관계라고 말할 수 있습니다.


### 프로젝트 작성 

{% highlight ruby %}
rails new rails-relation-1-n
cd rails-relation-1-n
{% endhighlight %}


### 모델&테이블 작성

Customer모델과customers테이블을 작성해줍니다.

{% highlight ruby %}
rails g model Customer name:string
rake db:migrate
{% endhighlight %}

Order모델과orders테이블을 작성해줍니다.

{% highlight ruby %}
rails g model Order order_date:date
rake db:migrate
{% endhighlight %}


### 참조키 추가해주기

N에 해당하는 테이블(현재는 order테이블)에 xxx_id라는 외부키를 추가해줍니다.
xxx는 1에 해당하는 테이블(customer)의 모델명을 넣어줄 필요가 있습니다.


기존의 모델이 있는 상태에서 컬럼을 추가해줄때는 이하와같은 방법으로 추가해줄 수 있습니다.

{% highlight ruby %}
rails g migration add_customer_id_to_orders customer_id:integer
rake db:migrate
{% endhighlight %}

사실 이전  Order모델 작성시 

{% highlight ruby %}
rails g model Order customer_id:integer order_date:date
{% endhighlight %}

이렇게 적어도 상관없습니다.


### 각모델에 has_many와belogns_to 설정해주기

각 모델간의 관계를 선언하는 방법인  has_many와 belongs_to 메소드를 사용방법을 배워보겠습니다.

has_many는 1에 해당하는 모델(customer)에다가 복수의order를 가진다는 의미로 has_many를 선언합니다.
반대로 belongs_to는 N에 해당하는 모델(order)에다가 특정 테이블에 종속된다는 의미로 belongs_to를 선언해줘야합니다.


{% highlight ruby %}
# app/models/customer.rb
class Customer < ActiveRecord::Base
  has_many :orders
end
{% endhighlight %}


{% highlight ruby %}
# app/models/order.rb
class Order < ActiveRecord::Base
  belongs_to :customer
end
{% endhighlight %}



has_many와belongs_to에는 각각 옵션을 지정할 수 있는데요. 다음과 같습니다.


#### has_many의 옵션들

| Option name | Description | 
|-------|--------|---------|
| class_name | 관계되는 모델의 클래스명을 지정가능 관계명과 참조하는 모델의 클래스명을 달리 쓰고싶을때 사용가능  | 
| foreign_key | 외부키의 이름을 지정가능 default는 참조하는 모델명_id| 
| dependent | 부모 오브젝트가 삭제될때의 액션을 정의 destroy,delete_all등 지정가능 |
| as | polymorphic관계를 정의 |
| through | 모델관계의 설정이가능 |


#### belongs_to의 옵션들

| Option name | Description | 
|-------|--------|---------|
| class_name | 관계되는 모델의 클래스명을 지정가능 관계명과 참조하는 모델의 클래스명을 달리 쓰고싶을때 사용가능  | 
| foreign_key | 외부키의 이름을 지정가능 default는 참조하는 모델명_id | 
| dependent | 부모 오브젝트가 삭제될때의 액션을 정의 destroy,delete등을 지정가능 |
| polymorphic | polymorphic관계를 정의 |




### 사용가능한 커맨드 일람

위의 옵션을 설정하면 아래와 같은 커맨드들을 자동으로 쓸 수 있게됩니다.


#### 생성,저장 관련
 

{% highlight ruby %}
sana = Customer.create(name: "minatozaki") # 미나토자키라는 이름을 가진 고객을 만들어서 DB저장후 sana객체에 대입
order1 = sana.orders.build(order_date: Time.now) # order1작성 （new대신에build를 사용）
order1.save # order1 DB저장

order2 = sana.orders.create(order_date: Time.now) # order2만들고 DB저장까지

order3 = sana.orders.new(order_date: Time.now)  #order3작성 (요번엔 build대신 new사용 둘이 똑같음)
order3.save # order3 DB저장
{% endhighlight %}

#### 릴레이션 관련

{% highlight ruby %}
sana.orders         # => order오브젝트의 배열을 리턴
sana.orders.exists? # => true (존재하는지 판별)
sana.orders.empty?  # => false (값이 있는지 판별)
order1.customer     # => customer오브젝트（해당 주문을 소유하고 있는 고객의 정보）
{% endhighlight %}

#### sana.orders안의 레코드에서 검색 

{% highlight ruby %}
sana.orders.find(...)
sana.orders.find_by(...)
sana.orders.where(...)
{% endhighlight %}

#### 삭제

{% highlight ruby %}
Order.count # => 사나가 구입한 주문갯수
sana.destory # => 모델의 옵션에 dependent: :destroy가 지정되 있으면 、sana가 주문한 내용도 다삭제됨.
Order.count # => dependent: :destroy
{% endhighlight %}



### belongs_to설정을 삭제하면 위에서 설명한 커맨드중 어느부분을 사용할 수 없을까


위에서 설명한 사용가능한 커맨드 일람을 만져 보면서
어느 부분이 has_many나 belongs_to에 의존된 설정인건지 둘이 무조건 셋트로 지정해야하는건지 궁금했기에 
설정을 삭제해보고 해당 커맨드를 다시 실행해봤습니다.

※설정 변경후  rails console재접속 해야합니다.

`app/models/customer.rb`
의

`has_many :orders`

를 삭제후 이하와 같은 커맨드를 실행하면 

{% highlight ruby %}
Customer.create(name: "dahyun")
dubu = Customer.find_by(id: 2)
dubu.orders.create(order_date: Time.now)
{% endhighlight %}

하기와 같은 에러가 발생합니다.

```
NoMethodError: undefined method `orders' for #<Customer:0x007f7b6ff89930>
        from (irb):5
```

고객 오브젝트에서 주문정보에 억세스할 수 없게 되었습니다.

`app/models/order.rb`

의 
`belongs_to :customer`
만 삭제하면 위와같은 에러가 나지 않았습니다.


{% highlight ruby %}
order4= dubu.orders.build(order_date: Time.now)
order4.save
{% endhighlight %}

문제없시 성공


`belongs_to :customer`을 삭제하게되면 


{% highlight ruby %}
order = Order.find_by(id: 1)
order.customer
{% endhighlight %}

실행결과(에러발생):

```
NoMethodError: undefined method `customer' for #<Order:0x007f7b702ffbc8>
Did you mean?  customer_id
        from (irb):2
```        

위와같이 주문 오브젝트에서 고객정보로 억세스가 안되게 됩니다.


### 정리

고객(1) -> 주문(N)
의 관계를 명시하기 위해

`app/models/customer.rb`에 
`has_many`를 정의

`has_many`를 정의해주지 않으면

고객 오브젝트를 통해서 주문정보에 악세스할 수없습니다.

```
예)  sana.orders.build(order_date: Time.now) # 이런게 안됨
```


고객(1) <- 주문(N)
의 관계를 명시하기 위해

`app/models/order.rb`에 
`belongs_to`를 정의

`belongs_to`를 정의해주지 않으면


주문 오브젝트를 통해서  고객정보에 악세스할 수 없게됩니다.

```
예) order1.customer # 이런게 안됨
```



[original]:      http://ruby-rails.hatenadiary.com/entry/20141203/1417601540