---
layout: post
title:  "Sass에서 배열에 어떤 값이 포함되어있는지 판별하는 방법"
author: negabaro kim
categories: sass
tags:	sass
---


sass에서 특정 배열에 어떤값이 포함되어있는지 판별하는 방법을 잘몰라서 
복수의 if문을 써야하나 하고 생각했는데

index를 이용하면 간단히 구현가능했으므로 소개

### sass의 index함수

Sass에는 배열중에 특정키가 몇번째에 있는지 판별해주는 index라는 함수가 존재함.

```
index(배열,판별할 키）;
```

실제로 테스트 해보자

```
$test_array: A, B, C, D;
$content: index($test_array, D);
.test {
    content: $content;
}
```


위와 같이 sass를 정의하면 아래와 같이 변환됨


```
.test {
    content: 4;
}
```


여기서 `index($test_array, E)` 이런식으로 존재하지 않는 값 `E`를 넘겨주면

index는 해당배열에 존재하지 않으므로 몇번째키에 해당값을 리턴할지 알지 못하고 null을 리턴하게됨

이 특징을 이용하면 배열에 어떤값이 포함되어있는지 판별하는 로직을 간단히 만들 수 있음

## ex1)

```
$condition: A, B, C;
$state: index($condition, $className);
   
@if $state == null {
    //null일 경우 className은 A,B,C가 아님 
} @else {
   //else일 경우 className은 A,B,C중 하나
}
```


## ex2)

```
li {
  @each $className, $property in $navList {
    &.#{$className} a span {
      background: map-get($property, backgroundUrl);
      background-size: map-get($property, backgroundSize);
      -webkit-background-size: map-get($property, backgroundSize);

      $state: index($condition, $className);

      @if $state == null {
        padding: 5px 0 2px 28px;
      } @else {
        display: block;
        text-indent: -9999px;
      }
    }
  }
}
```

### reference:

https://kiraba.jp/sass-has-value/
