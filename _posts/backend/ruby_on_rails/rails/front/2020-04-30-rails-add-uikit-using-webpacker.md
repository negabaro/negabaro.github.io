---
layout: post
title: "rails6.0 uikit 설정방법"
author: negabaro kim
categories: rails
tags: rails js scss uikit
---

### uikit css framework 설정방법


#### yarn add

```
yarn add uikit(npm install uikit)
```

#### uikit설정

`app/javascript/stylesheets/application.scss`에
이하 설정을 추가(패스는 어디든 상관없음)

```
$global-link-color: #DA7D02;

// 2. Import default variables and available mixins.

@import "uikit/src/scss/variables-theme.scss";
@import "uikit/src/scss/mixins-theme.scss";

// 3. Your custom mixin overwrites.

@mixin hook-card() { color: #000; }

// 4. Import UIkit.

@import "uikit/src/scss/uikit-theme.scss";
```

#### uikit설정을 js에서 import

`app/javascript/packs/application.js`에 이하 설정을 추가

```
import "../stylesheets/application.scss";
```

#### webpacker재기동

`bin/webpack-dev-server`재실행

localhost:3000에서 uikit이 적용된것 확인

### 메모1

`/Users/sehwakim/docker/bloring/config/initializers/assets.rb`에

`Rails.application.config.assets.paths << Rails.root.join('node_modules')`

레일즈의 위 설정에 의해 npm/yarn으로 설치된 패키지파일들을 읽어올 수 있음.


### 메모2

참고한 글을 보면 

`app/view/layout/application.html.erb`에 stylesheet_link_tag를 지우고

```ruby
<%= stylesheet_pack_tag 'stylesheets/application' %>
```

추가하라는 내용도 있었지만 위 설정 없이도 uikit가 적용된것을 화면에서 확인


#### 참고

```
https://www.tbn.co.jp/posts/technology/2018/04/05/uikit_custom_theme_sass.html
https://blog.office-aship.info/rails-webpacker-%E3%81%A7%E3%81%AE-css-%E8%AA%AD%E3%81%BF%E8%BE%BC%E3%81%BF/
```