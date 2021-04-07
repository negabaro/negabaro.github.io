
# vue-infinite-loading 설정

```
yarn add vue-infinite-loading
```

```
import InfiniteLoading from "vue-infinite-loading";
Vue.use(InfiniteLoading);


```

```
div(v-for="item in items")
infinite-loading(@infinite="infiniteHandler" :distance="10" spinner="spiral")
```


# 메모1. vue-infinite-loading사용시 문제점

vue-infinite-loading에서 infiniteHandler부분이 3번 불려짐.

처음 렌더링시 3번정도 불려짐.. 이유를 잘모르겠다...