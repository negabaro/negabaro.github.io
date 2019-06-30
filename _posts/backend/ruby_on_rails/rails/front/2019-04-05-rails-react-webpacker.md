---
layout: post
title: "react-rails와 webpacker를 사용해서 Rails어플리케이션에서 React실행"
author: negabaro kim
categories: rails
tags: rails js
---

# 프로젝트 생성

```ruby
$ rails new react-rails-example
$ cd react-rails-example
```

# bundle install실행

```ruby
bundle install --path=vendor/bundle
```

# webpacker Gemfile추가

```ruby
gem 'webpacker'
```

※ 직접Gemfile에 추가하지 않고 rails 프로젝트 생성시 `rails new xx --webpack`해줘도 됨

# rails webpacker:install 실행

#### 하는일

webpacker관련 설정추가

yarn add실행해서 node_modules디렉토리 생성

```ruby
      create  config/webpacker.yml
Copying webpack core config
      create  config/webpack
      create  config/webpack/development.js
      create  config/webpack/environment.js
      create  config/webpack/production.js
      create  config/webpack/test.js
Copying postcss.config.js to app root directory
      create  postcss.config.js
Copying babel.config.js to app root directory
      create  babel.config.js
Copying .browserslistrc to app root directory
      create  .browserslistrc
Creating JavaScript app source directory
      create  app/javascript
      create  app/javascript/packs/application.js
  Copying binstubs
       exist    bin
      create    bin/webpack
      create    bin/webpack-dev-server
```

# rails webpacker:install:react

webpacker관리하에 React.js를 인스톨

package.json에 react.js관련 설정이 추가된후 yarn add

```js
{
  "name": "react-rails-example",
  "private": true,
  "dependencies": {
    "@babel/preset-react": "^7.0.0",
    "@rails/webpacker": "^4.0.2",
    "babel-plugin-transform-react-remove-prop-types": "^0.4.24",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  },
  "devDependencies": {
    "webpack-dev-server": "^3.2.1"
  }
}
```

react뿐만 아니라 babel설정도 추가됨 야사시이!!

# react-rails

다음은 Gemfile에 react-rails를 추가하고 `bundle install`해주자

```ruby
gem 'react-rails'
```

react-rails로 인해 `react_component`라는 헬퍼와
rails g커맨드로 초기설정과 컴퍼넌트 생성등이 가능해진다.

# react-rails 초기설정(rails generate react:install)

```ruby
rails generate react:install
```

을 실행하면 React의 컴퍼넌트를 읽어들일 패스등 초기설정파일이 생성된다.

```ruby
Running via Spring preloader in process 5750
      create  app/javascript/components
      create  app/javascript/components/.keep
      append  app/javascript/packs/application.js
      create  app/javascript/packs/server_rendering.js
```

# 컴퍼넌트 생성

이하 커맨드로 컴퍼넌트 생성이 가능(직접 적어도 무방함)

```ruby
rails g react:component HelloWorld greeting:string
  Running via Spring preloader in process 5787
  create app/javascript/components/HelloWorld.js
```

생성된 js파일

```js
import React from "react";
import PropTypes from "prop-types";
class HelloWorld extends React.Component {
  render() {
    return <React.Fragment>Greeting: {this.props.greeting}</React.Fragment>;
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld;
```

# 컨트롤러/뷰 생성

```ruby
rails generate controller Welcomes
```

# 뷰에 react_component 추가

vim app/views/welcomes/index.html.erb

위에서 작성한 react_component라는 헬퍼를 이용해서 Helloworld Component를 지정해줌
props지정도 가능하다

```ruby
<%= react_component("HelloWorld", { greeting: "Hello" }) %>
```

# 루팅 설정

vim config/routes.rb

```ruby
Rails.application.routes.draw do
  root 'welcomes#index'
end
```

# javascript_pack_tag설정

Rails가 웹펙에 의해 트랜스파일된 JS파일을 읽어올 수 있도록 javascript_pack_tag helper를 지정
이 설정에 의해서 샘플로 만든 React component파일을 레일즈에서도 읽어올 수 있게 된다.

app/views/layouts/application.html.erb

```ruby
<%= javascript_pack_tag 'application' %>
```

# webpack-dev-server 기동(bin/webpack-dev-server)

이제 설정은 끝났고

webpack-dev-server를 기동한다

webpack-dev-server는webpack의 개발용서버로 JS파일을 webpack으로 트랜스파일도 하고 파일 변경을 캐치해서 트랜스파일을 재실행해주는등 편리한 툴이다.

webpacker를 인스톨한 시점에서 같이 설치된다.

```ruby
bin/webpack-dev-server
```

# rails 기동

Rails기동

`bin/webpack-dev-server`를 기동한 상태에서 레일즈도 기동해준다.(순서는 상관없음)

```ruby
rails s
```

# 동작확인

localhost:3000에 억세스해서

`Greeting: Hello`라고 표시되면 성공!

# 코드

위에서 설명한 코드는

https://github.com/negabaro/react-rails-example

를 참조

### Reference Link:

https://qiita.com/gotchane/items/6027cc07d757e64bd8bc
