---
layout: post
title:  "rails & vue사용시 발생하는 에러 Templates should only be responsible for mapping the state to the UI. Avoid placing tags with side-effects in your templates, such as <script>, as they will not be parsed."
tags:	rails/vue
---

```
Templates should only be responsible for mapping the state to the UI. Avoid placing tags with side-effects in your templates, such as <script>, as they will not be parsed.
```

rails 템플릿에서 특정 부분만 vue 사용시 조우하는 에러중 하나이다.


간단히 말하면 vue로 렌더링할 돔이하에 `<script>`와 같은 코드가 있어서는 안된다는 에러이다.

레일즈에서는 아래와 같은 코드를 사용할 수 없다는것을 의미한다.

```pug
main#vvv-vue-rendering
  javascript:
    console.log("xx")
```


### NG예

```ruby
main#vvv-organization-organization-form
  section
  section
    javascript:
      console.log('xx')
```

### OK예

```ruby
main
  section#vvv-organization-organization-form
  section
    javascript:
      console.log('xx')
```


[Failed to execute setAttribute on Element에러]: https://negabaro.github.io/archive/error-msg-Failed_to_execute_setAttribute_on_element_