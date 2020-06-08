---
layout: post
title: "Terraform실행한 환경의 public ip를 변수화 시켜서 세큐리티그룹에 설정하는 방법"
tags: terraform
---

terraform으로 ec2를 만들고 해당 액션을 실행한 환경(예를 들면 우리집)에서는 해당 ec2에 접근이 가능하게 하고 싶었는데
이 일련의 동작을 자동화 하는 방법을 몰라서 항상 `curl ifconfig.co`을 실행해서 글로벌IP를 특정후
aws console에 들어가서 세큐리티 그룹 인바운드에 ip를 추가하곤 했다.

stack overflow에 질문해서 이방법을 자동화 시키는 방법을 찾게되어 이포스트에서 소개해본다.

## main.tf에서 특정 스크립트를 실행하는 방법

#### scripts/get_my_public_ip.sh

```sh
#!/bin/bash -xe
echo {\"ip\":\""`curl ipinfo.io/ip`"\"}
```

#### main.tf

```sh
data "external" "get_my_public_ip" {
  program = ["sh", "scripts/get_my_public_ip.sh"]
}

module "security-group" {
  source        = "./modules/aws/compute/security-group/"
  infra_name    = "${var.infra_name}"
  vpc_id        = "${module.network.vpc_id}"
  vpc_cidr      = "${module.network.vpc_cidr}"
  permitted_ips = "${var.permitted_ips}"
  my_public_ip  = "${data.external.get_my_public_ip.result.ip}/32"
}
```

## script없이 public ip를 특정하는 방법

최근에 더 심플한 방법을 발견했다.

#### main.tf

```ruby
data "http" "myip" {
  url = "http://ipv4.icanhazip.com"
}
```

And whenever you want to place your IP just use data.http.myip.body, example:

```ruby
ingress {
  from_port = 5432
  to_port = 5432
  protocol = "tcp"
  cidr_blocks = ["${chomp(data.http.myip.body)}/32"]
}
```

### Reference Link

```
https://stackoverflow.com/questions/46763287/i-want-to-identify-the-public-ip-of-the-terraform-execution-environment-and-add/53782560#53782560
```
