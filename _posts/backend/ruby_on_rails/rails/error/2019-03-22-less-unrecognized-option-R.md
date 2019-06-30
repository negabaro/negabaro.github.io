---
layout: post
title: "docker alpine rails환경에서 발생하는 less: unrecognized option: R 에러"
author: negabaro kim
categories: docker
tags: docker,rails
---

# 현상

docker환경으로 rails구축후 `bundle exec rails c`이나`binding.pry`로 pry console로 들어와서
특정 커맨드를 실행했을때

```
less: unrecognized option: R
```

이라는 에러가 발생함.

모든 커맨드에서 발생하는건 아니고 가끔 이런 에러가 발생
예를 들어

`gem 'kaminari'`를 사용해서

```ruby
@items = Item.includes(:user).page(params[:page] ||= 1).per(8).order('created_at DESC')
```

이런 커맨드를 실행할때 발생함(in thie case using binding.pry)

# 해결 방법

alpine환경에 `apk add less` 를 설치해서 해결

전에 구축했을때는 발생하지 않았던것 같은데..환경변수 유무에 따라 발생하는 에러일지도..?

### Reference Link:

https://github.com/wp-cli/wp-cli/issues/3840
https://qiita.com/youkyll/items/0f5914e13a85265e8119
