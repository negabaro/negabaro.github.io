---
layout: post
title:  "rails new후에 프로젝트명 바꾸는 방법"
author: negabaro kim
categories: rails
tags:	rails tip
cover:  "/assets/twice3.jpg"
---

Rails new한후에 어플리케이션 명을 바꾸고 싶을때가 있다.

이때 「config/application.rb」,「config/initializers/session_store.rb」
이 두파일을 변경해주는걸로 프로젝트명 변경이 가능하다.




### test환경

```
ruby 2.4.1
rails 5.1.6
```


### 변경할 부분


#### config/application.rb

```
# config/application.rb
 
module Sample # <= 이부분을 변경
 
end
```

#### config/initializers/session_store.rb

```
# config/initializers/session_store.rb
 
Rails.application.config.session_store :cookie_store, key: '_sample_session' # <= _어플리케이션명_session으로 변경
```


### rename이라는 Gem을 사용해서 프로젝트명 변경

위 두 파일을 직접 변경하지 않고도 rename이라는 gem을 이용하는 방법이 있다.


#### install

```
Gemfile
gem 'rename'
```

#### Usuage

```
rails g rename:app_to NewName
```

※프로젝트 디렉토리명도 바뀌므로 주의


[참고]: https://qiita.com/colorrabbit/items/11e16f323ed36a0cb7ab

