---
layout: post
title:  "vue.js에서 json파일을 읽어오는 방법"
author: negabaro kim
categories: vue.js
tags:	vue.js
---

정적파일을 컴퍼넌트와 별도로 파일 관리할때 유용


# vue-cli를 사용한 경우

```json
assets/members.json
[
  {
    "id": 1,
    "name": "sana"
  },
  {
    "id": 2,
    "name": "jihyo"
  },...
]
```

위 json파일을 vue에서 읽어 오는 방법

```js
main.vue
import members from '../assets/members.json'

export default {
  data: () => {
     members: members
  }
}
```

# class안에서 사용

```
import membersJson from '../assets/members.json'

export default class Twice extends Vue {
  private memberList = membersJson;
}
```

# 그 외의 방법

axios를 사용한 json임포트


```html
index.html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="./app.js"></script>
```

```js
var app = new Vue({
  data: {
     items:null
  },
  mounted: function () {
    axios.get("./items.json").then(response => (this.items = response))
  }
})
```


### reference:

https://qiita.com/Hiroyuki1993/items/56e4b0c15786bf8d787b

