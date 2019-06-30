---
layout: post
title: "xx"
author: negabaro kim
categories: xx
tags: xx
---

# 프로젝트 생성

```ruby
rails new react-rails-hypernova-example
cd react-rails-hypernova-example
```

# bundle install실행

bundle install --path=vendor/bundle

# hypernova서버 설정

npm init -y
npm install hypernova --save

```js
var hypernova = require("hypernova/server");

hypernova({
  devMode: true,

  getComponent(name) {
    if (name === "MyComponent.js") {
      return require("./app/assets/javascripts/MyComponent.js");
    }
    return null;
  },

  port: 3038
});
```

app/assets/javascripts/MyComponent.js

```js
const React = require("react");
const renderReact = require("hypernova-react").renderReact;

function MyComponent(props) {
  return <div>Hello, {props.name}!</div>;
}

module.exports = renderReact("MyComponent.js", MyComponent);
```

## 기동

node hypernova.js

2019-04-06T02:24:58.224Z - info: Connected
{ listen: [ 3038, '0.0.0.0' ] }

# hypernova 레일즈 설정

gem 'hypernova'
bundle

vim config/initializers/hypernova_initializer.rb

```ruby
Hypernova.configure do |config|
  config.host = "localhost"
  config.port = 3038            # The port where the node service is listening
end
```

rails generate controller Welcomes

```
vim app/controllers/welcomes_controller.rb
class WelcomesController < ApplicationController
around_filter :hypernova_render_support
  def index
  end
end
```

잉 안되는데??

```
around_action :hypernova_render_support
```

라고 바꿈

app/views/welcomes/index.html.erb
<%= render_react_component('MyComponent.js', :name => 'Hypernova The Renderer') %>

루팅 설정
vim config/routes.rb

Rails.application.routes.draw do
root 'welcomes#index'
end

# error

## Uncaught SyntaxError: Unexpected token <

npm install --save hypernova-react

## BrowserifyRails::BrowserifyError in Welcomes#index

<%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>

```js
Error while running `/Users/sehwakim/docker/react-rails-hypernova-example/node_modules/.bin/browserifyinc --list --cachefile=/Users/sehwakim/docker/react-rails-hypernova-example/tmp/cache/browserify-rails/browserifyinc-cache.json -o "/Users/sehwakim/docker/react-rails-hypernova-example/tmp/cache/browserify-rails/output20190407-9951-1cday1f" -`:

/Users/sehwakim/docker/react-rails-hypernova-example/node_modules/module-deps/index.js:510
        throw new Error(
```

### Reference Link:

https://qiita.com/fk_2000/items/e8d6709e3a846be9ce1f
https://github.com/airbnb/hypernova
