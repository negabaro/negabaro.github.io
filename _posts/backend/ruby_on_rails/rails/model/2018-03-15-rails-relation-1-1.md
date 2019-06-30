---
layout: post
title:  "rails5.1에서 1:1 관계형 모델 만들기"
author: negabaro kim
categories: rails
tags:	rails handson
cover:  "/assets/twice.jpg"
---


### 1:1관계란

![image](https://user-images.githubusercontent.com/4640346/37501333-46be4884-2911-11e8-8ef6-7acb456e5d30.png)


주문1건당 하나의 청구서가 존재하는 사양일 경우,
청구서는 하나의 주문에 소속되어 있고
주문은 하나의 청구서를 가지게됩니다.
이러한 관계를 1:1관계라고 합니다.

Rails에서 1:1관계를 표현하는 방법에 대해서 알아봅시다.


### 프로젝트 작성 

{% highlight ruby %}
rails new rails-relation-1-1
cd rails-relation-1-1
{% endhighlight %}

### 모델&테이블 작성

Order모델과orders테이블을 작성해줍니다.

{% highlight ruby %}
rails g model Order order_date:date
rake db:migrate
{% endhighlight %}

Invoice모델과invoices테이블을 작성해줍니다.

{% highlight ruby %}
rails g model Invoice
rake db:migrate
{% endhighlight %}


### 참조키 추가해주기

청구서는 하나의 주문에 소속되어 있으므로 
청구서 테이블에 주문을 식별가능한 컬럼이 필요합니다.

디폴트로는 주문테이블명_id로 외부키를 추가해줍니다.


{% highlight ruby %}
rails g migration add_order_id_to_invoices order_id:integer
rake db:migrate
{% endhighlight %}

사실 이렇게 바로 모델과 같이 만들어줄수도 있습니다.

{% highlight ruby %}
rails g model Invoice order_id:integer
{% endhighlight %}

### has_oneとbelongs_to

주문테이블은 하나의 청구서를 가지므로
주문테이블의 모델설정에 `has_one :invoice`라는 설정을 넣어줘야합니다.

{% highlight ruby %}
# app/models/order.rb
class Order < ActiveRecord::Base
  has_one :invoice
  #has_one :invoice, dependent: :destroy #=> 이런식으로 dependent옵션을 넣어주면 order데이터 삭제시 관련되어있던 청구서 데이터도 삭제됩니다. 
end
{% endhighlight %}


청구서테이블은 하나의 주문에 종속되므로 `belongs_to :order`라는 옵션을 넣어줍니다.

{% highlight ruby %}
# app/models/invoice.rb
class Invoice < ActiveRecord::Base
  belongs_to :order
end
{% endhighlight %}



#### has_one의 옵션들

| Option name | Description | 
|-------|--------|---------|
| class_name | 관계되는 모델의 클래스명을 지정가능 관계명과 참조하는 모델의 클래스명을 달리 쓰고싶을때 사용가능  | 
| foreign_key | 외부키의 이름을 지정가능 default는 참조하는 모델명_id| 
| dependent | 부모 오브젝트가 삭제될때의 액션을 정의 destroy,delete_all등 지정가능 |
| as | polymorphic관계를 정의 |


#### belongs_to의 옵션들

| Option name | Description | 
|-------|--------|---------|
| class_name | 관계되는 모델의 클래스명을 지정가능 관계명과 참조하는 모델의 클래스명을 달리 쓰고싶을때 사용가능  | 
| foreign_key | 외부키의 이름을 지정가능 default는 참조하는 모델명_id | 
| dependent | 부모 오브젝트가 삭제될때의 액션을 정의 destroy,delete등을 지정가능 |
| polymorphic | polymorphic관계를 정의 |

옵션에 대해서는 다른 포스트로 상세히 다룰예정입니다. 


### 사용가능한 커맨드일람

위와 같은 설정을 해줌으로 인해 사용가능해진 설정들을 알아보겠습니다.

#### 오브젝트 작성/DB저장

{% highlight ruby %}
order = Order.create( order_date: Time.now ) # order오브젝트 작성후 orders테이블에 보존
invoice = Invoice.create # invoice오브젝트 작성후 invoices테이블에 보존(에러가남)

order.invoice # => nil
order.invoice.build # => 에러

invoice.order # => nil
invoice.order.build # => 에러
{% endhighlight %}

#### 릴레이션 만들기

{% highlight ruby %}
Order.create( order_date: Time.now ) #order테이블 작성/DB보존
order = Order.find_by(order_id: 1) #order_id가 1인 order데이터를 가져옴

invoice = Invoice.new #청구서 객체를 만듬
{% endhighlight %}


{% highlight ruby %}
order.invoice = invoice # 작성한 청구서 객체를 주문안의 청구서에다가 대입.  
{% endhighlight %}

위의 커맨드를 실행하면 이하와 같이 해당 주문id에다가 청구서를 insert하는것을 알 수있습니다.


```
   (0.2ms)  begin transaction
  SQL (0.6ms)  INSERT INTO "invoices" ("order_id", "created_at", "updated_at") VALUES (?, ?, ?)  [["order_id", 1], ["created_at", "2018-03-17 05:54:44.928426"], ["updated_at", "2018-03-17 05:54:44.928426"]]
   (120.9ms)  commit transaction
```

{% highlight ruby %}
order.invoice # => 해당주문의 청구서를 반환
invoice.order # => 해당 청구서의 주문을 반환
{% endhighlight %}


invoice2라는 새로운 청구서 객체를 만들어서 
order.invoice에 새로 대입하면 어떤 결과가 나올까요?

{% highlight ruby %}
invoice2 = Invoice.new
order.invoice = invoice2
{% endhighlight %}

이하와 같이 에러가 나옵니다.

```
   (0.3ms)  begin transaction
   (0.2ms)  rollback transaction
ActiveRecord::RecordNotSaved: Failed to remove the existing associated invoice. The record failed to save after its foreign key was set to nil.
        from (irb):30
```

#### 삭제관련

{% highlight ruby %}
Invoice.count # => 청구서 테이블의 숫자
order.destory # => dependent: :destroy가 지정되어있을시 관계된 invoice테이블도 삭제됨. 
{% endhighlight %}





[original]:      http://ruby-rails.hatenadiary.com/entry/20141205/1417779929