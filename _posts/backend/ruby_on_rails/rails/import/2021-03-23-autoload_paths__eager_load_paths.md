---
layout: post
title: "rails autoload_paths와 eager_load_paths의 차이"
author: negabaro kim
categories: rails
tags: rails
---

## 공통점

양쪽다 rails에서 선언한 클래스를 읽어오는 설정

## 차이점

클래스를 로드하는 타이밍에 차이가 있다.

차이점은 아래와 같다.

### autoload_paths

선언한 클래스가 처음 호출되었을때 해당 디렉토리에 가서 클래스를 로드함.

### eager_load_paths

Rails기동시 지정된 디렉토리 이하에 있는 스크립트를 미리 로드해놈.


## autoload_paths(deprecated)

Rails5부터 autoload는 deprecated되었기 때문에 autoload_paths를 사용할 경우는 거의 없어졌다.

> But using autoload_paths on its own in the past (before Rails 5) developers might configure autoload_paths to add in extra locations (e.g. lib which used to be an autoload path list years ago, but no longer is). However this is now discouraged for most purposes, as it is likely to lead to production-only errors. It is possible to add new locations to both config.eager_load_paths and config.autoload_paths but use at your own risk.
> 「Rails5より前ではlib/以下をautoload_pathsに含めることがよく行われていたが、現在はappフォルダ以外の場所にコードを置いてautoload対象にするのは勧めない」となっています。本番特有のエラーが起こる可能性があるから、やるなら自己責任でな、という話です。



---

[eager_loadとeager_load_pathsそしてautoload_paths]: https://teratail.com/questions/175077