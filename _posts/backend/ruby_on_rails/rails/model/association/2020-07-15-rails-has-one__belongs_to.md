---
layout: post
title:  "rails6 has_one belongs_to관계에 대해  여러가지 실험"
author: negabaro kim
tags:	rails rails/model
---


# has_one 과 belongs_to

레일즈에서 아래와 같은 관계를 나타내고 싶을때 각각 사용


### has_one

부모 -> 자식관계 나타날때 사용

### belongs_to

자식 -> 부모관계 나타날때 사용

자식 클래스에 references(xx_id)를 정의해야함.


user(부모) -> user_profile(자식) 관계의 테이블에 데이터를 저장하는 방법에 대해서 알아보자.

필자가 아는 방법은 아래와 같다.


# 1. user -> save -> user_profile -> save　하는 예제

```ruby
uu = User.new(entity_id: 'test1').save
UserProfile.new(user: uu,title: 'xx').save
```

부모 -> 자식순으로 데이터를 저장하는 방식
user save후 user_profile이 실패해도 user.save는 rollback이 되지 않으므로 
transaction을 감아줘야 하는 수고가 생긴다.

# 2. user,user_profile 동시에 save하는 예제

```ruby
uu = User.new(entity_id: 'test2')
uu.user_profile = UserProfile.new(user: uu,title: 'xx')
uu.save
```

부모 model에 정의한 `has_one :user_profile` 부분에 자식의 인스턴스를 넘긴 후
save하는 방식 `uu.save`시 부모,자식의 레코드가 동시에 저장된다.


# 3. user에 after_build hook을 넣는 방법

따로 코드를 적진 않겠지만 
부모 모델에 hook을 넣고 실행하는 방식



# 4. accepts_nested_attributes_for를 이용하는 방법

2번과 유사한 방법인데 accepts_nested_attributes_for를 이용해서 nested한 params을 넘겨서
부모,자식 레코드를 동시에 저장하는 방식이다.

```ruby
  has_one :user_profile, dependent: :destroy
  accepts_nested_attributes_for :user_profile, allow_destroy: true
```

```ruby
def create
  User.new(user_params).save!
end

def user_params
    params.require(:user).permit(:xx
      user_profile_attributes:[:yy])
  end
```

## user_profile정보가 없을때 save안되게 하려면?

위에서 소개한 2,3,4 방법은 user,user_profile을 동시에 save하는 방법이었다.
그렇다면 user_profile 미정의시 validation error를 발생시키려면 어떻게 해야할까?

has_one 부분에 `validate: true`를 지정하고 
user_profile모델에 특정 컬럼에 대한 validation을 지정하면 
해당 컬럼 미정의시 validation error를 발생시킬 수 있다.

```ruby
#app/models/user.rb
has_one :user_profile, validate: true
```

```ruby
#app/models/user_profile.rb
validates :entity_id, presence: true
```



```ruby
uu = User.new(entity_id: 'test5')
uu.user_profile = UserProfile.new
uu.save!
=> false
ActiveRecord::RecordInvalid: Validation failed: User profile is invalid
```


당연한 얘길지도 모르지만 user_profile을 아예 지정하지 않으면 valdation error도 당연히 발생하지 않게된다.


```ruby
uu = User.new(entity_id: 'test6')
uu.save
```



# 메모1. 실패 예제

```ruby
uu = User.new(entity_id: 'test2').save # uu에 true가 들어가버림
uu.user_profile = UserProfile.new(user: uu,title: 'xx').save
```


# 메모2. has_one vs has_one은 되는가?

안됌.

위에서 말했듯이 has_one은 부모와 자식과의 관계를 나타내는건데

아래와 같이 서로의 xx_id를 가지게끔 하고 migrate을 실행하면

`xx.user_profiles`이 없다고 나옴.
이유는 user의 migrate실행시 user_profiles테이블이 작성되지 않아서인듯 하다.


```ruby
#user
t.references :user_profile, null: false, foreign_key: true

#user_profile
t.references :user, null: false, foreign_key: true
```

```ruby
Mysql2::Error: Table 'xx.user_profiles' doesn't exist
Caused by:
Mysql2::Error: Cannot add foreign key constraint
```



# 메모3. migrate지정할때 t.references 와 t.belongs_to의 차이는?

차이없음.

## t.belongs_to로 작성한 테이블

```ruby
  create_table "user_profiles", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.index ["user_id"], name: "index_user_profiles_on_user_id"
  end
```

## t.references로 작성한 테이블

```ruby
  create_table "user_profiles", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_user_profiles_on_user_id"
  end
```

### reference:

```
https://qiita.com/haazime/items/4d528f8d173d654ba394
```