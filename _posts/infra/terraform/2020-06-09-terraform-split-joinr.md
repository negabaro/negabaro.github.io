---
layout: post
title:  "Terraform의join,split메소드에 대해서"
author: negabaro kim
tags: terraform
---

테라폼에서 자주 사용되는 메소드중 join과split이 있습니다.
join은 list형 데이터를 String으로 바꿔줄때 자주 사용하고
split은 반대로 String형 데이터를 List로 바꿔줄때 자주 사용합니다.


# join사용 예.

`aws_subnet.xx.*.id`같은 값은 보통 list형식인데 terraform 실행후 해당 변수의값을 확인하려면 output을 사용합니다.
그런데 그 output에서는 String형 데이터 밖에 다루지 못하므로 list형식의 `aws_subnet.xx.*.id`값을 String로 바꿔줘야합니다.




이럴때 바로 join을 이용해서 list형값을 string형으로 바꿔주면 output에서 값을 확인할 수 있습니다.

```ruby
output "subnet_ids" {
  value = "${join(",", aws_subnet.main.*.id)}"
}
```



### 결과

```ruby
subnet_ids = subnet-xx,subnet-xx,subnet-xx,subnet-xx,subnet-xx,subnet-xx
```





### split사용예.

모든 테라폼 설정의subnet,subnet_ids안에는 list형식의 값을 넣어줘야 합니다.
그러므로 다른 모듈의 output을 참조할때 split을 이용해서 string형에서 list형으로 값을 변환시킬 수 있습니다.

#### 다른 모듈의 output결과를 list형으로 변환해주는 예)

```ruby
subnets             = "${split(",",module.network.subnet_ids)}"
```

#### ec2의 subnet_id 설정예)

```ruby
subnet_id = "${element(split(",", var.subnet_ids), count.index)}"
```



#### 정해진 subnet값을 변수에넣어서 적용하는 예)

```ruby
variable static_subnets {
  description = ""
  type        = "list"

  default = [
    "subnet-xx",
    "subnet-xx",
  ]
}
```


```ruby
subnets             = "${var.static_subnets}"
```




```ruby
${element(split(",", join(",", aws_db_parameter_group.main.*.id)), 0)}"
```


```ruby
${element(aws_db_parameter_group.main.*.id), 0)}"
```


## 팁.

재사용성을 높히기 위해 테라폼을 모듈화시킬때 다른 모듈의 실행결과 값을 받아야하는 경우가 있습니다.
(에를들면 vpc모듈에서 만든 subnet_id값)
그때 output값(자료형 string)을 이용해서 다른 모듈의 결과값을 얻을 수 있는데요.

처음에 필자는 모든 설정에는 list형을 쓰니까 다른 모듈값을 넘겨줄때 전부 List형으로 변환해서 넘겨줬었습니다만 이하와 같은 이유로
output값(string값)을 그대로 넘겨주는것을 추천드립니다.


### 이유1.

  해당 모듈안에서 데이터 값을 확인할때나 스크립트에서 사용하기 위해 list형을 string으로 다시 바꾸는 경우가 허다함

### 이유2.

  모듈이 늘어날때마다 list -> string 변환로직을 넣어주는 작업이 귀찮음.

### 이유3.

  다른 모듈에서 받은값은 전부 어떠한 형식이다라고 명시해 놓는게 작업하기 편함.

  다른 모듈에서 받은값중에 list형과string형이 섞여있는것만은 피하는게 좋습니다.
  자료형 확인하려고 테라폼 재실행을 해야한다든지 이게 무슨 자료형인지 생각해야할 코스트가 높아지기 때문입니다.


