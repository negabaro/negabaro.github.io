---
layout: post
title:  "webdriverIO 에서의 파일업로드 방법"
author: negabaro kim
categories: webdriverio
tags:	webdriverio e2e
cover:  "/assets/twice.jpg"
---

[webdriverIO에서 돔조작 패턴]에서 간단히 파일 업로드하는 방법을 알아봤다.
이 포스트에서는 조금 구체적인 파일업로드 로직에 대해서 정리해봤다.


이하 2가지 방법으로 파일업로드를 구현했다.

1. 셀레니움을 이용한 파일 업로드
2. supertest를 이용한 파일 업로드



### 셀레니움을 이용한 파일 업로드

이전 포스트에서 파일업로드를 위해 ```chooseFile```을 확인 다이어로그를 넘기기 위해
```alertAccept```을 사용한다고 설명했다.
이하와 같은형식이다.

{% highlight node %}
browser.chooseFile('#snapshot_file', path);
browser.element('#btn-upload').click();
browser.alertAccept();
browser.alertAccept();
{% endhighlight %}

실제로 위 코드는 움직이지만 복수의 테스트를 실행했을때 
다이어로그 Accept가 가끔 삑싸리(?) 나는 문제가 발생했다.

이 문제는 ```waitUntil```과 ```pause```를 이용해서 실행 커맨드 사이에 텀을 주는것으로 해결했다.

코드는 이하와 같다.

{% highlight node %}

    browser.chooseFile('#snapshot_file', path);
    browser.element('#btn-upload').click();

    //browser.ignoreSynchronization = true;
    browser.waitUntil(() => {
            try {
              return browser.alertText() != null;
            }
            catch (error) {
              return false;
            }
          }, 5000);

    browser.alertAccept();
    browser.pause(300);
    browser.waitUntil(() => {
                  try {
                    return browser.alertText() != null;
                  }
                  catch (error) {
                    return false;
                  }
                }, 5000);

    browser.alertAccept();
{% endhighlight %}


그 외에도 특정 리소스가 존재할때까지 기다리는 메소드들이 여러가지 있다.

#### WAITFORVISIBLE

http://webdriver.io/api/utility/waitForVisible.html


#### WAITFORVALUE
http://webdriver.io/api/utility/waitForValue.html

#### WAITFORTEXT

http://webdriver.io/api/utility/waitForText.html

#### WAITFOREXIST

http://webdriver.io/api/utility/waitForExist.html


waitForExist외에는 아직 써보진 못했지만..



### supertest를 이용한 파일 업로드

셀레니움을 이용하지 않고도 실제 뒷 단에서는 실행되는 http POST부분을 실행하는 방법도 있다.
이 포스트에서는 supertest를 이용해서 http POST를 실행해봤다.

#### add npm install supertest

{% highlight node %}
npm install supertest --save-dev
{% endhighlight %}

실제로 파일업로드시 실행되는 curl문은 이하와 같다.

{% highlight bash %}
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'authorization: Bearer xxx' -d '업로드할 파일내용' 'http://xx.com/api/snapshots?ignore_warnings=true'
{% endhighlight %}  

이 부분을 supertest로 구현하면 이하와 같다.



{% highlight node %}
const request = require("supertest");
 const agent = request.agent(domain);
    const token = browser.element('table tr:nth-of-type(1)').element('td:nth-of-type(2)').getText()

    agent
      .post('api/snapshots?ignore_warnings=true')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer' + ' ' + token )
      .send(json)
      //.attach('data', env.PATTERN_1)
      .expect(200)
      .end(function(err, res) {
        console.log(res.body);
        if (err) throw err;

      });
{% endhighlight %}      


WebdriverIO에서 파일 업로드를 구현을 위한 2가지 방법을 알아봤다.

#### 참고한 사이트

[참고1],[참고2],[참고3],[참고4],[참고5]

[참고1]: https://github.com/webdriverio/webdriverio/issues/722
[참고2]: https://github.com/webdriverio/webdriverio/issues/1788
[참고3]: https://github.com/webdriverio/webdriverio/issues/490
[참고4]: https://stackoverflow.com/questions/21281106/how-to-check-if-an-alert-is-open-using-nodejs-webdriver-wd
[참고5]: https://stackoverflow.com/questions/11467471/how-to-check-if-an-alert-exists-using-webdriver
[webdriverIO에서 돔조작 패턴]: https://negabaro.github.io/webdriverio/2018/04/17/controll-dom-pattern.html
