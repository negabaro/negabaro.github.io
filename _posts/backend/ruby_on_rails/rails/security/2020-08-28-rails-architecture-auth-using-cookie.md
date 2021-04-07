---
layout: post
title:  "rails6에서 웹 어플리케이션 구축시 cookie를 이용한 인증패턴에 대해"
tags: rails/security
---

# 개요

현대의 웹 어플리케이션은 여러가지 패턴으로 구축이 가능한데
그 패턴에 따라 cookie를 이용한 인증방법에 차이가 있다.

이 포스트에서는 rails 기반에서 각 패턴별 인증방법에 대해 알아본다.

# cookie란?

[cookie란 무엇인가?]를 참고 바란다.


# 웹 어플리케이션이란?

웹을 기반으로 실행되는 프로그램을 말한다. 페이스북,트위터,구글,airbnb가 전부 웹 어플리케이션이다.

# 웹 어플리케이션의 구성/패턴

웹 어플리케이션은 크게 백엔드와 프론트로 나뉜다.

백엔드는 화면 뒷단에서의 인증을 하거나 DB에서 값을 가져오는 등 처리로직을 담당하고
프론트는 사용자에게 보여지는 화면 부분을 담당한다.

웹에서 사용자에게 화면을 보여주게 하는 행위를 랜더링이라고도 말한다.

프론트에서는 이 랜더링의 방식에 따라 `서버 사이드 랜더링(SSR)`과 `클라이언트 사이드 랜더링(SPA)` 방식으로 나눠진다.

SSR은 백엔드(서버)에서 DOM을 만들어 프론트에 보내 렌더링 하는 방식이고
SPA은 백엔드(서버)가 관여하지 않고 브라우저에서 지지고 볶아 랜더링 하는 방식이다.


한편 레일즈에서는 MVC패턴으로 프론트와 백엔드가 유기적으로 돌아가는데 프론트의 SSR 까지는 rails 다운 
빠른 구현이 가능하다.

그러나 SPA 부분은 rails특혜(?)를 받을 수 없어 개발속도가 느려진다.

느려지는 포인트는 아래와 같다.

1. javascript를 사용한 개발을 해야한다.
2. 

왜냐면 브라우저에 실행되는 언어는 javascript 뿐이기 때문이다.

javascript가 빠른 개발이 가능한것이 장점이라고 하지만 rails세상에서 레일을 탄 개발 패턴은 

rails의 레일을 탄  비교하면 거북이 수준이다.



레일즈는 빠른 프로토타입 작성에 특화된 프레임워크로 레일즈 특혜를 받을 수 없는 SPA는 
가급적 사용안하는것이 좋다


예외적으로 모바일 앱도 


우선 javascript언어가 ruby에 비해 


 해야하는 부분의 구현이 까다로운 편이다.

여기서 까다롭다의 의미는 레일즈여서 까다롭다기 보다는 javascript를 이용하다 보니



 클라이언트 사이드에 대한 


# 패턴1

A. 프론트(SPA) = vue.js,react
B. 프론트(SSR) = rails
C. 백엔드 = rails

기존의 레일즈에 클라이언트 사이드 랜더링 할 부분만 vue.js나react로 처리하는 구성이다.


# 패턴2

레일즈를 api용도로만 쓰는 패턴이다.
SPA용 JS 프레임워크의 발달로 레일즈의 프론트 영역이 틀니 취급 당해 압수당하고
ActiveRecord만이 현자 대접을 받아서 api로서의 명맥만 유지한 구성이다.

요즘 많이들 사용하는것 같다.


A. 프론트(SPA)
B. 백엔드(레일즈)


## 패턴2-1

A가 xx:8000
B가 xx:3000 
이런식으로 포트가 다르거나



## 패턴2-2

A가 test.com
B가 api.test.com

이런식으로 서브도메인이 다른경우


# 패턴1의 장점으로

모놀리식한 구성이다. 

여기서는 cookie인증 관련한 특징에 대해만 설명한다.

vue.js에서 xhr통신시 cookie의 설정이 이용가능하다.

기존 레일즈에서 로그인하면 cookie에 해당 정보가 들어가게되고

아무것도 할 필요가 없다




프론트가 있고 

# js의 xhr에도 cookie정보가 담길까

착각했던 부분이 api에서는 cookie
헤멨던 부분인데 같은 도메인이면 js에서 axios통신할때도 cookie정보가 넘어가는거 같음.

서브도메인과 다르더라도 같은결과가 나올것으로 예상됨


というのも、ローカル開発中でSPAのdev serverがlocalhost:4200、APIサーバーがlocalhost:3000というように別ポートで動いていたり、本番環境でSPAをホスティングしてるサーバーのオリジンと、APIサーバーのオリジンが違うと(要はCORSになっている時)、cookieでの認証はできないという思い込んでいました。


# api와 spa포트가 다르면

Postmanからリクエストする分にはこれで動きますが、今回は4200番ポートで動いているAngularアプリケーションからリクエスト想定なので、CORSの設定をします。Railsではrack-corsが便利です。

Gemfileにrack-corsを追加し、config/application.rbを以下のように変更します。

config/application.rb
require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module RailsSpaCookieSessionSample
  class Application < Rails::Application
    config.load_defaults 6.0

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "http://localhost:4200"
        resource "*",
          headers: :any,
          methods: [:get, :post, :options, :head]
      end
    end
  end
end

# cors에서는 cookie set안됨

CORSでcookieを使えるようにするには、ブラウザからのリクエストにはXMLHttpRequest.withCredentialsを、サーバーからのレスポンスにはAccess-Control-Allow-Credentialsをそれぞれtrueにする必要があります。

그래서 SPA에서는 axios시 option에 

const requestOptions = {
      withCredentials: true
    };

를 넘겨주자


Rails側は、rack-corsのcredentialsオプションでAccess-Control-Allow-Credentialsを有効にすることができます。

config/application.rb
require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module RailsSpaCookieSessionSample
  class Application < Rails::Application
    config.load_defaults 6.0

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "http://localhost:4200"
        resource "*",
          headers: :any,
          methods: [:get, :post, :options, :head],
          credentials: true #この行を追加
      end
    end
  end
end

rails api작성시 디폴트로는 cookie 안들어감 
https://pocke.hatenablog.com/entry/2016/06/23/193232
https://daido.hatenablog.jp/entry/2020/05/06/143145

[cookie란 무엇인가?]: https://negabaro.github.io/archive/security-cookie