---
layout: post
title:  "WebdriverIO란"
author: negabaro kim
categories: webdriverio
tags:	webdriverio node e2e
---


### WebdriverIO란


WebdriverIO란Node.js에서 Selenium WebDriver를 조작할 수 있는 npm package입니다.
WebdriverIO를 사용하면 Node.js상에서 웹브라우저를 조작이 가능합니다.


### 인스톨 방법


#### WebdriverIO의npm을 이용해서 인스톨

```
mkdir -p webdriverio-test
cd webdriverio-test
npm install webdriverio --save-dev
```

#### Selenium WebDriver2기동&selenium-standalone 인스톨

Selenium을 사용하기 위해서는 Selenium WebDriver2기동을 할필요가 있습니다.
WebdriverIO와 각종 브라우저를 연결해주는 편리한 라이브러리입니다.
그리고 npm패키지,Selenium인스톨,기동까지 간단히 실행가능한 selenium-standalone라는 wrapper가 있습니다.


selenium-standalone을이용해서 Selenium을standalone mode로 기동합니다.


```
npm install selenium-standalone@latest -g
selenium-standalone install
```

```
selenium-standalone start
```

#### 여기까지의 동작확인

이하의 커맨드를 실행해서 크롬브라우저가 기동되면 정상입니다.


```
./node_modules/.bin/wdio repl chrome
```
 
 ![image](https://cdn-ak.f.st-hatena.com/images/fotolife/s/syanbi/20171010/20171010162202.png)

### 테스트의 샘플코드

[webdriverio-standalone-experiment]


![image](https://camo.qiitausercontent.com/c994d7c3dea24b3d0acc284d1bdf06aa9173ab7e/68747470733a2f2f6a2e676966732e636f6d2f674c365270442e676966)



[webdriverio-wdio-experiment]

![image](https://camo.qiitausercontent.com/7ff2ca64488bf48869b5dc9430db31b5f06251f3/68747470733a2f2f6a2e676966732e636f6d2f4735673156792e676966)




### 두개의 동작모드

테스트에는 이하와 같은 두개의 동작모드가 있습니다.

| Mode | 용도 | 
|-------|--------|---------|
| Standalone | 스크래핑(혹은 WebdriverIO에 내장된 라이브러리 작성)  | 
| WDIO | E2E테스트 | 


### Standalone mode

Standalone mode의 경우 src/main.js의 내용은단순히 브라우저를 조작할 뿐입니다.
GIF를 보면 알 수 있듯 단순히 브라우저 조작만을 하고 있는것을 알 수 있습니다.



{% highlight node %}
//vim src/main.js
const webdriverio = require('webdriverio');
const options = { desiredCapabilities: { browserName: 'chrome' } };
const client = webdriverio.remote(options);

client
    .init()
    .url('https://duckduckgo.com/')
    .setValue('#search_form_input_homepage', 'WebdriverIO')
    .click('#search_button_homepage')
    .getTitle().then(function(title) {
        console.log('Title is: ' + title);
        // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    })
    .end();
    
const assert = require('assert');

describe('Google', function() {
  it('should display the title', function() {
      browser.url('https://www.google.co.jp/');
      assert(browser.getTitle() === 'Google');
  });  
});
{% endhighlight %}


### WDIO mode

WDIO mode의 경우 `test/specs/test.js`에서 테스트 항목을 기술하고 있습니다.
GIF에서도 웹브라우저에 조작후, 콘솔 테스트의 결과에서 1 passing 이라는 결과가 

{% highlight node %}
//vim test/specs/test.js
const assert = require('assert');

describe('Google', function() {
  it('should display the title', function() {
      browser.url('https://www.google.co.jp/');
      assert(browser.getTitle() === 'Google');
  });  
});
{% endhighlight %}


WDIO mode의 경우,내장된 test runner을 사용해서 테스트를 실행합니다.
test runner는 여러가지 선택지가 있지만, 이번 포스트에서는 Mocha를 사용했습니다.
자세한 내용은 공식사이트의 [WebdriverIO - How to use WebdriverIO] 를 참고해주세요.


### 설정 

샘플코드에서는 디폴트설정인 chrome으로 동작합니다.
그 외에도Firefox등의 타 브라우저를 사용하는 것도 가능합니다.
여러가지 설정들이 있고 공식사이트의 [WebdriverIO - Configuration] 에 자세히 기술되어 있습니다.
이 포스트에서 소개한 샘플코드의 경우,
Standalone mode의 경우`src/main.js`のoptions오브젝트WDIO mode의 경우`wdio.conf.js`에 정의되어 있습니다.



    
[reference]: https://qiita.com/TomoyukiAota/items/454fcc5d6827b873463d    
[webdriverio-standalone-experiment]: https://github.com/TomoyukiAota/webdriverio-standalone-experiment
[webdriverio-wdio-experiment]: https://github.com/TomoyukiAota/webdriverio-wdio-experiment
[WebdriverIO - Configuration]: http://webdriver.io/guide/getstarted/configuration.html
[WebdriverIO - How to use WebdriverIO]: http://webdriver.io/guide/getstarted/modes.html
