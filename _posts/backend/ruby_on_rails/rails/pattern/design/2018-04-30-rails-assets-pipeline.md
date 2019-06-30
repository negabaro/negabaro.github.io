---
layout: post
title:  "Rails assets:pipeline에대해서"
author: negabaro kim
categories: rails
tags:	css
cover:  "/assets/twice.jpg"
---

Rails Assets pipeline관련한 커맨드와 특징들,production환경에서는 어떤 설정을 해주는게 좋은지와  자주 삽질하는 포인트들을 정리해봤다.

### Rails Asset Pipeline이란

자바스크립트와 CSS를 합치고 압축할 수 있는 프레임웤을 제공한다
그리고 CoffeeScript, SASS, ERB와 같은 타 컴파일 언어를 이용할 수 있게 해준다. Rails 4에서는 더이상 기본으로 제공되지 않으며 
sprockets-rail gem에서 가져올 수 있다


#### 주요기능

##### 병합(concatenate)

js와css를 하나의 파일로 합쳐준다
production에서 레일즈는 MD5 지문(fingerprint)를 각 파일 이름에 넣어서 브라우저가 이 파일들을 캐시할 수 있게 한다
파일의 내용이 바뀔때마다 지문이 바뀌므로 내용이 바뀔때만 브라우저가 새로운 파일을 받아온다.

이것은 웹페이지를 렌더링하기 위해서 브라우저가 요청하는 수를 줄일 수 있고 이로서 로딩 시간을 줄여주는 효과를 갖게된다.

##### 압축(minify)

asset 파일내에서 불필요한 스페이스와 코멘트를 제거해 준다. 이것은 파일크기를 줄여주고 결과적으로 asset의 로딩 시간을 중려주는 효과를 가져온다.

##### 사전컴파일(precompile)


커피 스크립트, SASS 등과 같은 상위 레벨 언어를 CSS파일로 컴파일해 준다.

### Asset경로


| Option name | Description | 
|-------|--------|---------|
| app/assets  |개발자가 만든 image, Javascript, stylesheet 파일들이 위치하는 디렉토리  | 
| lib/assets | 어플리케이션에 국한되는 않는 라이브러리나 다수의 어플리케이션에서 함께 사용할 수 있는 라이브러리에서 사용하는 asset들이 위치하는 디렉토리| 
| vendor/assets | JavaScript 플러그인과 CSS 프레일워크에서 사용하는 asset들이 위치하는 디렉토리 |


### manifest 파일


asset pipeline의 핵심은 바로 manifest 파일이다. 
레일스는 디폴트로 stylesheet용 파일(app/assets/stylesheets/application.css) 하나와 
JavaScript용 파일(app/assets/javascripts/application.js) 하나를 만들어 준다

이하 링크 참고
http://tomkim.tistory.com/entry/%EB%A0%88%EC%9D%BC%EC%A6%88-Asset-Pipeline
https://rorlab.org/rblogs/152




### asset폴더에 중복된 파일이 존재하면?

예를 들어, 예를 다른 경로상에 동일한 이름을 가진 두개의 asset 파일이 있다고 가정해 보자. 
이 두개의 파일을 ```app/assets/stylesheets/style.css.scss``` 과 ```vendor/assets/stylesheets/style.css.scss``` 라고 하자.
asset이 컴파일될 때 asset 경로상에서 발견되는 첫번째 파일 이후의 모든 중복 파일들은 포함되지 않게 된다
rails console에서 asset 경로의 확인이가능하다

```
rails c 
Rails.application.config.assets.paths
```

### asset pipeline이 사용하지 않는 경로상에 있는 asset들은 사전컴파일 하는 방법은?

예를 들어, other/assets 폴더를 asset pipeline에 포함해서 사전 컴파일을 하고자 한다고 가정하자. 
application.rb 파일이나 환경 config 파일(config/environments/ 폴더 내의 development.rb, productionrb, test.rb 파일)에 아래의 코드라인을 간단히 추가하면 된다.


```
config.assets.paths << "#{Rails.root}/other/assets"
```


###  사전컴파일 대상을 추가하는 방법 

```config/initializers/assets.rb```에 이하와 같은 설정을 추가해주면 된다.

#### 예제1

```
Rails.application.config.assets.precompile << 'xx.js'
```

#### 예제2

```
Rails.application.config.assets.precompile += %w(
  application-pc.scss
  application-sp.scss
)
```



### 사전컴파일 대상에서 제외하는 방법

```config/initializers/assets.rb```에 이하와 같은 설정을 추가해주면 된다.

####  .js .css .html .json파일을 컴파일 대상에서 제외하는 예제


```
precompile_target = lambda do |filename, path|
  puts filename
  path =~ /app\/assets/ && !%w(.js .css .html .json).include?(File.extname(filename))
end
Rails.application.config.assets.precompile = [
  precompile_target,
  /(?:\/|\\|\A)application\.(css|js)$/
]
```



### Rails의CSS설정이 반영안될떄


development환경에서는 ```app/assets/stylesheets```하위의
모든 스타일파일은 디폴트로 전부 읽어오므로 ```app/assets/stylesheets``` 하위의 파일을 
수정하면 즉시 서비스에 반영된다.
development tool등을 통해서 사이트의 요소를 보면 스타일 파일의 갯수만큼 읽어오는걸 알 수 있다.

실제 서비스 운영시에는 복수의 스타일파일을 읽어올경우 퍼포먼스가 떨어지므로 복수의 파일들을 하나로 묶는 작업을 하는데
Rails에서는 그것을 ```assets:precompile``` 이 해준다.



```
bundle exec rake assets:precompile
```

위 커맨드를  실행하면 ```public/assets/``` 에 하나로 묶어진 ```application.css``` 가 생성되고 Rails에서는
한번 ```precompile```해서 ```public/assets```파일이 만들어지면 그것을 우선해서 읽어오게 된다.

즉 평소처럼  ```app/assets/stylesheets```을 수정해도 ```public/assets```하위의 스타일파일을 읽게되는것.

이러한 구조를 이해못하면 "어 왜 스타일설정이 왜 반영이 안되지??" 하고 얼탱이를 탈 수 있다.(필자가 그랬다)




### bin/rake assets:clobber

```assets:precompile```한 결과를 삭제해주는 커맨드


rails 4.0이전에는 
```
bundle exec rake assets:clean
```
이었다.


### bin/rake assets:precompile

위에서도  설명했지만 사전컴파일을 실행하는 커맨드

```
bundle exec rake assets:precompile RAILS_ENV=production
```





### config.assets.compile = true

```config.assets.compile = true```를 해주면

실행중에 컴파일을 실행하므로 assets:precompile커맨드를 일일이 실행하지 않아도 된다. 
다만 퍼포먼스가 떨어지는 단점이 있어 production에서는 절대 사용하지 않는게 좋다.

development에서도 ```app/assets/stylesheets```하위의 스타일파일을 자동으로 읽어오므로 
아직  ```asset:precompile```을 실행하지 않으면 안될 타이밍을 만나지 못했지만 
만약에 그럴경우 유용한 옵션이 될지도 모르겠다.


### config.assets.css_compressor = :sass

압축방법을 지정한다.

sass-rails gem을 사용하고 있는 경우

```
config.assets.css_compressor = :sass
```



이고 yui-compressor사용시에는 

```
config.assets.css_compressor = :yui
```

로 지정해준다.



### config.assets.debug 



```
config.assets.debug = true
```

assets are served individually, organized just as you see them in development. 
Preprocessed languages like SASS or CoffeeScript will still show up as their target languages (i.e., CSS and JS, respectively).

※application.css/js개별 파일의 이중으로 읽어집니다.


```
config.assets.debug = false
```

assets are bundled into files like application.css and application.js. 
Error stack traces will likely not have the correct line number any more and it is harder to map those back to your original code.

https://stackoverflow.com/questions/16357785/what-exactly-config-assets-debug-setting-does


### config.assets.enabled = false

을 이용하면 asset pipeline기능자체를 off할 수 있다.




###  config.serve_static_assets

Nginx등의 Web서버를 사용하지 않고 assets파일등을 읽어오게할때 설정 true설정을 해준다.


rails 4.1까지는 이하와같이 사용했는데 

```
#config/environments/production.rb
config.serve_static_assets = true
```  
  
rails5에서는 

```
#config/environments/production.rb
config.public_file_server.enabled = true
```

로 변경되었다.


#### 퍼포먼스를 생각한다면 true쓰면 안됨

true설정을 하면 nginx에서 정적 컨텐츠파일을 찾지 못하면  unicorn과 같은 레일즈 서버로 리퀘스트가 가는데
Unicorn은 아키텍쳐상 정적컨텐츠를 처리하는데 적합하지 않기때문에 효율이 굉장히 떨어진다.

그러므로 false설정해서 nginx에서 정적컨텐츠 파일에 접근할 수 있게하는것이 좋다.
가장 베스트는 CDN처리하는것이다.



```
config.serve_static_assets = false
```

를 추천!




### 결론

그래서 현재 프로젝트의  production환경 설정은 이하와 같이 설정하였다.


```
config.serve_static_assets = false
config.assets.compress = true
config.assets.compile = false
config.assets.digest = false
config.assets.debug = false
```



[참고1]:https://tamosblog.wordpress.com/2013/03/11/assets/
[참고2]: https://rorlab.org/rblogs/152
[참고3]: https://rorlab.org/rblogs/20
[참고4]:https://qiita.com/yuuna/items/9a2954300a130a9637b8
