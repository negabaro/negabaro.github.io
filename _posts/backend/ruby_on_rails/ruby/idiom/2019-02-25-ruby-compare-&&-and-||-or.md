---
layout: post
title: "ruby &&,||과 and,or의 차이"
author: negabaro kim
categories: ruby
tags: ruby
---

# 빠른 결론

같은 의미이나 `and,or`보다 `&&,||`의 우선순위과 더 높음.

정확히는 `and와or`의 우선순위는 엄청나게 낮고 `&&,||`의 우선순위는 그보다 높음.

## 예제

예제를 통해서 둘의 차이를 확실히 이해해보자.

#### 선언부

```
cuty = :cuty
sexy = nil
```

#### and

```
sana = cuty and sexy
p sana
-> :cuty
```

#### &&

```
sana = cuty && sexy
p sana
-> nil
```

`sana = cuty and sexy`의 평가결과에는 :cuty가 대입되었음.
이것은 `sana = cuty`가 먼저 평가되고 우선순위가 낮은 and는 그 뒤에 평가되었기 때문
괄호를 사용하면 `(sana = cuty) and sexy`와 같은 의미가 됨.

한편`sana = cuty && sexy`에는 nil이 대입되었음. 이것은 `cuty && sexy`가 우선 평가되어서 sexy가 nil이므로 sana에 nil이 대입되었기 때문
괄호를 사용하면 `sana = (cuty && sexy)`와 같은 의미가 됨.

예제에서 알수있듯이 and,&&,or,||는 의미없이 쓰면 계산결과가 틀려지는 경우가 있으므로 주의가 필요함.
계산식에 괄호를 꼬박꼬박 붙여주면 딱히 신경쓸 필요 없을지도..?

### Reference Link:

```
https://www.xmisao.com/2014/03/05/ruby-difference-between-and-and-or-or.html
```
