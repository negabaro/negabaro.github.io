---
layout: post
title:  "rails에서 뒤로가기 버튼 무효화 하는방법"
tags:	rails/tip
---

특정 페이지에서만 뒤로가기 버튼 무효화 하는 방법

적용시킬 view에 아래와 같은 javascript를 추가해줌

```ruby
javascript:
  history.pushState(null, null, null);
  window.addEventListener('popstate', function(e) {
    history.pushState(null, null, null);
    return;
  });
```

정확히는 뒤로가기 버튼 자체는 눌려지는데 동작하지 않게됨.

[How to disable the browser back button with java script, ruby on rails
]에서 말하는것 처럼 유저 인터페이스를 생각하면 좋은 방법은 아니라고


[How to disable the browser back button with java script, ruby on rails
]: https://stackoverflow.com/questions/29823160/how-to-disable-the-browser-back-button-with-java-script-ruby-on-rails