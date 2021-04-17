---
layout: post
title:  "Flutter Dio의 LogInterceptor란?(Flutter에서 서버 통신 디버깅시 사용) "
author: negabaro kim
tags:	rails/factorybot
---

## LogInterceptor

dio에서 제공하는 클래스로 dio로 통신한 `request -> response`정보를 인터셉터해서 로그에 표시해준다.

외부 서버와의 통신(ex API)관련한 디버깅 작업 할때 유용하게 쓰인다.

자세한 내용은[LogInterceptor Class]를 참고


## 사용방법

사용방법은 아래와 같이 `interceptors.add`해서 LogInterceptor오브젝트를 넘겨주면 된다.

```dart
import 'package:dio/dio.dart';
Dio _dio;
_dio = dio ?? Dio();

_dio.interceptors.add(LogInterceptor(
          responseBody: true,
          error: true,
          requestHeader: false,
          responseHeader: false,
          request: false,
          requestBody: false));
```

## responseBody: true

다른 옵션은 다 필요없고 `responseBody: true` 만 기억하자. 이게 없으면 통신에러가 발생해도 레스폰스 결과를 표시해주지 않으므로 디버깅시 매우 귀찮음.


```dart
interceptors.add(LogInterceptor(responseBody: true));
```

[LogInterceptor Class]: https://pub.dev/documentation/dio/latest/dio/LogInterceptor-class.html