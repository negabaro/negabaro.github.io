---
layout: post
title: "ruby module_function이란"
author: negabaro kim
categories: ruby
tags: ruby tip
---


## module_function이란

모듈내의 메소드에 접근가능하게 만들어주는 내장메소드

원래 모듈내에 정의된 메소드는 그 모듈의 내부적에서만 사용할 수 있다.

이때 모듈내에서 `module_function`으로 밖에서도 실행할 메소드를 심볼로 지정해줘서 해당 `모듈.메소드`로 접근이 가능하게 할때 사용한다.

이 방법 외에도
`incldue 모듈`을 하거나 `def class.xx`로 정의해 놓으면 같은 방법으로 접근이 가능하다.


## 예제

### module_function이 없는 경우

```
module MyModule
  def hello
    puts 'hello'
  end
end

MyModule.hello ## <<  아래의 에러가 발생
```

#### result:

이와 같은 에러가 발생

```
Traceback (most recent call last):
ex1.rb:7:in `<main>': undefined method `hello' for MyModule:Module (NoMethodError)
```

### module_function을 선언한 경우

```
module MyModule
  def hello
    puts 'hello'
  end
  module_function :hello
end

MyModule.hello ##<< 접근이 가능해짐 (result: hello)
```


---

[Link1]: https://techracho.bpsinc.jp/hachi8833/2016_12_06/29921
[Link2]: http://karoten512.hatenablog.com/entry/2017/10/23/230734
[Link3]: https://docs.ruby-lang.org/ja/latest/method/Module/i/module_function.html

[Link4]: https://docs.ruby-lang.org/ja/latest/method/Module/i/module_function.html
[Link5]: https://qiita.com/shunogu/items/cab5c43be1945baf5e4c
[Link6]: https://qiita.com/kunosu/items/5c0f5c9d5628a14be7f8
