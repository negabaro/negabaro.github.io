---
layout: post
title:  "vuex에서 state변경을 감시하는 방법"
author: negabaro kim
tags:	vuex
---

# Vuex에서 state변경을 감시하는 방법

Vuex에서 state변경을 감시하는 방법은 아래 3가지이다.

1. watch
2. subscribe
3. subscribeAction ※ Vuex 2.5.0～

이 포스트에서는 첫번째 방법인 watch에 대해서 알아보자.


# watch를 사용한 state감시 방법

```js
 computed: {
    startTime: function() {
      return this.$store.getters["video/getStartTime"];
    },
    endTime: function() {
      return this.$store.getters["video/getEndTime"];
    },
  },
  watch: {
    startTime(value) {
      console.log("watch startTime", value);
    },
    endTime(value) {
      console.log("watch endTime", value);
    }
  },
```

### reference:

[Link1](https://kawadev.net/vuex-watch/)

[Link2](https://qiita.com/nqyutq/items/3d7193aea9a4cfe6f914)