---
layout: post
title:  "Dart final과 const의 차이에 대해 알아보자."
author: negabaro kim
tags:	flutter/dart
---

Dart에서 final과 const의 차이에 대해 알아보자.


## 공통점

한번 할당한 변수는 재할당이 불가능(var와의 차이)

## 차이점

※전제로 `컴파일 타임`과 `런타임`의 차이를 이해할 필요가 있음.

### final

동적으로 메모리에 할당이라고 말한다.

즉 `컴파일 타임`에는 변수할당을 하지 않고 `런타임`시에 변수할당을 한다.

덕분에 `컴파일 타임`에서 확인할 수 없는 값들을 변수에 할당할 수 가 있게된다.


`컴파일 타임`에서 확인할 수 없는 값(`런타임`시 확인가능한것)으로는 `DateTime.now()`가 있다.

```dart
void main(){
    final d = DateTime.now();
}
```



### const

`컴파일 타임`에 변수선언이 이루어진다. 덕분에 런타임시 특별히 할것 없이 메모리에 할당되어 있는 값을 이용할 수 있어 효율적이다.

padding값과 같이 재사용을 많이 하는 케이스라면 const가 유용하다.


아래와 같이 `런타임`시에만 확인가능한 값을 const에 대입하면 const는 `컴파일 타임`에 변수할당을 하므로 에러가 발생한다.

```dart
void main(){
    const d = DateTime.now(); //error
}
```

#### 전체에러

```
Error: Cannot invoke a non-'const' constructor where a const expression is expected.
Try using a constructor or factory that is 'const'.
```