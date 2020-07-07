---
layout: post
title:  "ruby에서 array안에 특정 array값이 포함되어 있는지 체크하는 방법"
description: "array1.any? {|i| array2.include?(i)}"
tags: ruby
---



# 특정 문자/숫자가 배열에 포함 되어있는지 확인하는 방법

`include?`를 사용

```ruby
ary = [1, 3, 5, 6, 8]
p ary.include?(2)
```

`include?` 인자안에 체크할 문자열을 넣어줘야함.

# array안에 특정 array값이 포함되어 있는지 확인하는 방법

위에서 언급한 include?는 인자에 문자열만 넣을 수 있으므로
아래와 같이 확인해야한다.

```ruby
ary = [1, 3, 5, 6, 8]
# 2, 5중 하나라도 존재하는지
[2, 5].any? {|i| ary.include?(i)}

# 2, 5양쪽 존재하는지
[2, 5].all? {|i| ary.include?(i)}
```


### reference:

```
https://qiita.com/takaram/items/fdc2b1897d68b3f2d848
```