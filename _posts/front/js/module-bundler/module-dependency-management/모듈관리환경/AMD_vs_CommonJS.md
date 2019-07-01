기존에는AMD는 거의 사장되었고 commonJS조차 import,export로 바뀌는 추세라
딱히 신경쓸 부분은 없다s

디펜던시 모듈 관리
기존의 프론트엔드 자바스크립트는 특별히 모듈화나 디펜던시관리에 대한 방법이 없어 필요한 자바스크립트 파일을 정해진 순서에 맞게 직접 스크립트 태그로 로드하고 각각 약속된 네임스페이스에 담아 공유했었다. 이런 방식은 프로젝트가 커질수록 그리고 참여 개발자가 많을수록 문제를 일으켰다.

이후 개발자들에 의해 AMD와 CommonJS 두가지 방법으로 모듈 관리 환경이 발전하게 되었는데, AMD 방식은 RequireJS가 많이 사용되고 있고 CommonJS는 Browserify가 인기가 많았다. 그리고 CommonJS는 NodeJS에서 사용하고 있는 방식이다.

# AMD style

```js
define([
     ‘module1’,
     ‘module2’,
     ‘module3’
],
function(
     module1,
     module2,
     module3
) {
     //using modules
});
```

# CommonJS style

```
var module1 = require(‘module1’);
var module2 = require(‘module2’);
var module3 = require(‘module3’);

//using modules
```
