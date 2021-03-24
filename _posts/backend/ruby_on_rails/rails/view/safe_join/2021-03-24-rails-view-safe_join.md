---
layout: post
title:  "Rails safe_join에 대해 알아보자"
author: negabaro kim
tags:	rails/view
---

## safe_join

Rails ActionView의 헬퍼메소드로 문자변환시 자주 사용한다. 

자세한 내용은 [safe_join] 를 참고

## 구체적인 기능

1. array형태의 문자를 첫번째 인자로 받는다.
2. 두번째 인자에 바꿔줄 문자열을 받는다
3. 첫번째 배열에서 바꿔줄 문자열을 찾아 2번에 입력받은 값으로 변환해준다.

## simple_format과의 차이

1. safe_join의 경우 문자열을 <p>태그로 묶어주지 않음
2. simple_format은 연속개행은 무시하는데 반해 safe_join은 연속개행도 태그로 바꿔준다.



## 사용방법

[safe_join code]를 참고하면 첫번째 인자가 array이다.

```ruby
def safe_join(array, sep = $,)
  sep = ERB::Util.unwrapped_html_escape(sep)
  array.flatten.map! { |i| ERB::Util.unwrapped_html_escape(i) }.join(sep).html_safe
end
```      

그래서 `split("\n")`으로 배열로 만든 후 첫번째 인자에 넘겨주는 패턴이 자주 쓰인다.

```ruby
safe_join("text".split("\n"),tag(:br))
```

두번째 인자에는 변환해줄 태그를 적어주면된다.

`tag(:br)`은 `<br />`과 같다.


---

[safe_join code]: https://github.com/rails/rails/blob/main/actionview/lib/action_view/helpers/output_safety_helper.rb#L33-L37

[safe_join]: https://apidock.com/rails/ActionView/Helpers/OutputSafetyHelper/safe_join
