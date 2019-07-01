brwoserify가 등장한 배경에는
그당시 브라우저에서는 import,export를 사용할 수 없었다.ecma es2015부터 사용가능해짐
그래서 이당시는 script tag로 읽는 방법밖에 없었다.

그래서 브라우저에서도 require(commonJS)형식으로 읽어오고 싶은 일념에 탄생한게 brwoserify이다.

# browserify에는 치명적인 문제가 있는데

js의 의존성만 해결해준다는것이다.

browserify はいかができない
|
stylesheet - css
画像 base64 に変換して - 画像

webpack의 경우 css와 image조차(base64로 변환) 대응해줌

require をブラウザにさせたいから
browser でも require を使いたいから

Browserify를 문제없이 사용하던 중 Webpack 이란 도구를 알게 되었는데, `Webpack은 AMD와 CommonJS를 동시에 지원할 뿐 아니라` `기본적으로 부분을 캐싱하여 변경점만 번들링하는 방식이라 속도가 빠르고` Karma와 같은 `테스트 런너와의 연동도 훨씬 좋았다`. 무엇보다 제일 활발하게 진행되는 오픈소스 프로젝트였기에 발전 가능성이 제일 커 보였다. 결과적으로 앞으로 새로 시작하는 프로젝트는 물론 이미 Browserify로 작업된 프로젝트들도 단계적으로 Webpack을 사용할 예정이다

호리상이 말한 부분이랑 일맥상통한게 있다.

jquery の global variable 防ぐ

- ネットワークのアクセス回数が増える
  html に依存しないと外部の JS を読み込めないから

# 로더

Webpack은 로더라는 일종의 플러그인들을 이용해 기능을 확장할 수 있다. ES6와 ES7문법으로 작업하고 바벨 로더를 이용해 번들링 하는 과정에서 결과물을 ES5로 Transpile 할 수 있으며 Uglify 로더를 이용해 코드를 난독화도 할수 있다. 빌드하는 과정을 자동화 하는 도구로 Grunt나 Gulp가 많이 사용되는데 그런 도구들이 해주던 역할을 이 로더들을 이용해서 처리할 수 있다. 필요한 로더는 직접 만들 수 있지만 이미 많은 로더들이 구현되어 있어 바로 사용할 수가 있다. (로더목록)

# 장점

모듈 로드 및 디펜던시 관리도구로써의 Webpack의 장점은 아래와 같다.

관련 도구중 제일 핫하다.
AMD & CommonJS 코드 둘다 사용 가능
큰 어려움없이 RequireJS나 Browserify에서 전환이 가능하다.
Watch모드의 캐싱으로 개발시 변환속도가 매우 빠르다.
특별한 자동화도구 없이 로더를 이용해 기능을 확장할 수 있다.
Karma, Babel등 최신 자바스크립트 도구들과의 연동성이 좋다.
개발용 서버를 따로 구성할 필요 없이 바로 사용 가능한 webpack-dev-server가 있다.

また、browserify は webpack よりもシンプルで扱いやすいですが、最近登場した開発ツールは webpack 向けに実装されることが多く、browserify では対応できない場面が増えてきました

https://shiren.github.io/2016-02-15-Webpack%EC%9C%BC%EB%A1%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88%EA%B4%80%EB%A6%AC-%ED%95%98%EA%B8%B0/
https://texta.pixta.jp/entry/2017/05/10/123228
