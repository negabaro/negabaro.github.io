---
layout: post
title:  "webdriverIO에서 돔조작 패턴"
author: negabaro kim
categories: webdriverio e2e
---


webdirverIO에서 브라우저를 조작해서 e2e테스트를 하면서 배운부분들을 정리해봤다.

### 컨트롤할 DOM(Login화면)

{% highlight html %}
<form method="post" action="/auth/form">
  <div class="form-group">
    <label>Username</label>
    <input type="text" class="form-control" name="username" value="" />
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password" class="form-control" name="password" />
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
{% endhighlight %}

### 컨트롤할 DOM(Login한 상태화면)


{% highlight html %}
<div>
    <a class="btn btn-default" href="/players/snapshots">download</a>
    <button class="btn btn-warning" id="btn-upload">upload</button>
    ファイル: <input id="snapshot_file" type="file" name="file" style="display: inline;" />
</div>

<a class="btn btn-default" href="/logout">API Logout</a>
{% endhighlight %}
 
  

### debug용 크롬 기동하는 방법

{% highlight node %}
./node_modules/.bin/wdio repl chrome
{% endhighlight %}


### 특정 브라우저에 억세스 하는방법

{% highlight node %}
browser.url("https://localhost:8090");
{% endhighlight %}


### 텍스트필드에 값넣는 방법(user에test password에password라는 텍스트 입력)




{% highlight node %}
browser.setValue('input[name=username]', "test");
browser.setValue('input[name=password]', "password");
{% endhighlight %}


### 버튼 클릭하는 방법

#### dom의 속성으로 접근하는 방법

{% highlight node %}
browser.element('button').click();
{% endhighlight %}

#### 텍스트를 이용해서 엘리먼트에 접근방법


{% highlight node %}
browser.element("=API Logout").click()
{% endhighlight %}



### 첨부파일 업로드 하는법

{% highlight node %}
#절대패스에 있는 파일 업로드
browser.chooseFile('#snapshot_file', '/Users/xx/Downloads/xx.json');
#현재 디렉토리에 있는 파일 업로드하는 예
browser.chooseFile('#snapshot_file', './files/xx.json')

#※ ~/ 를 사용하면 에러가 났음

{% endhighlight %}


도큐멘트 [choseFile]를 참고



### 다이어로그 창떴을때 넘어가는 법

{% highlight node %}
browser.alertAccept();
{% endhighlight %}

도큐멘트 [alertAccept]를 참고



[choseFile]: http://webdriver.io/api/utility/chooseFile.html
[alertAccept]: http://webdriver.io/api/protocol/alertAccept.html
[element]: http://webdriver.io/api/protocol/element.html