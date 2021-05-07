---
layout: post
title: "Dart collection패키지란?"
author: negabaro kim
tags: dart
---

## Dart collection패키지란?

Dart의 collection패키지를 이용하면 `DeepCollectionEquality()`나 `ListEquality()`와 같은 유용한 메소드를 사용할 수 있다.

## 사용방법

### pubspec.yaml

```dart
name: my_app
environment:
  sdk: ">=2.7.0 <3.0.0"
dependencies:
  collection:
```

하고 `dart pub get`

### import

```dart
import 'package:collection/collection.dart';
```


### 코드예제

```dart
import 'package:collection/collection.dart';

void main(){
  Function eq = const ListEquality().equals;
  Function deepEq = const DeepCollectionEquality().equals;
  List list1 = [1, ['a',[]], 3];
  List list2 = [1, ['a',[]], 3];
  print(eq(list1, list2)); //false
  print(deepEq(list1, list2)); //true


  //There are other Equality classes that can be combined in many ways,
  //including equality for Maps.
  //You can even perform an unordered (deep) comparison of collections:
  Function unOrdDeepEq = const DeepCollectionEquality.unordered().equals;
  List list3 = [3, [[],'a'], 1];
  print(unOrdDeepEq(list2, list3));  //true
}
```


## 코드 해석

### ListEquality().equals

`first level of equality`만을 비교해준다.


### DeepCollectionEquality().equals

`limitless-level equality` 비교가능

list에 존재하는 계층을 전부 비교해준다.

### DeepCollectionEquality.unordered().equals

List의 순서에 관계없이 비교해준다.