---
layout: post
title:  "Terraform IF문안에 IF문 넣기"
author: negabaro kim
categories: terraform
---


Terraform안에서 IF문을 사용하려면 이하와 같은 삼항연산자를 이용하는 수 밖에 없다.

```ruby
 ${var.kawaii == "" ? "dog" : "cat"}
```

그렇다면 복수의 IF문 분기를 사용하려면 어떻게 해야할까.
찾아본 결과, 삼항연산자안에 삼항연산자를 넣는식으로 구현하는 방법외엔 없는듯하다.

# 구현 예1)

```ruby
output "test" {
  value = "${var.static_vpc == "" ? join(",", aws_subnet.main.*.id) : var.static_vpc == "vpc-xx" ? join(",",var.static_subnets) : join(",",data.aws_subnet_ids.static_vpc.ids) }"
}
```

# 구현 예2)

```ruby
provisioner "remote-exec" {
    inline = [
      "docker stack deploy --compose-file ${var.environment}${var.reservation_mode == 1 ? "-reservation" : ""}-${var.mount_status == 1 ? "mount" : "default"}.yml blue --with-registry-auth",
    ]
}
```


참고로 output안에서는 String형 데이터 밖에 넣을 수 없다.
예를들어 List형인 `aws_subnet.main.*.id`을 그대로 적으면 Null값을 뱉어낸다(..차라리 에러가나든지)

요런식으로 적으면 test output값을 얻지 못한다.

# 잘못된 예)

```ruby
output "test" {
  value = "${var.static_vpc == "" ? aws_subnet.main.*.id : var.static_vpc == "vpc-xx" ? join(",",var.static_subnets) : join(",",data.aws_subnet_ids.static_vpc.ids) }"
}
```



  