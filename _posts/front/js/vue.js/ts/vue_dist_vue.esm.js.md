



```js
import Vue from "vue/dist/vue.esm";
document.addEventListener("DOMContentLoaded", () => {
  const app = new Vue({
    el: "#vvv-views-front-item-new",
    store: store,
    render: h => h(Question)
  });

});
```

하고 

컴퍼넌트에서 this.$store << 안보임

`import Vue from "vue/dist/vue.esm";`를
`import Vue from "vue";`로 바꾸니 this.$store접근가능..!!



https://qiita.com/sukezane/items/58783b5a9b771429cff2