
# 방법1

this.$store
this.$store.state.count
# 방법2

import store from "src/store"


store.getters


# 방법3 (mapping)

```js
...mapActions('domain/reTarget', ['sendRequest'])
```

```js
methods: {
    ...mapMutations('ui/modal/reTarget', ['setIsFinished']),
```

```js
computed: {
    ...mapGetters('domain/globalFilter/date', {
      globalFilterDateRange: 'dateRange'
    }),
    ...mapGetters('scope', {
      shops: 'shop',
      clients: 'client',
      brands: 'brand'
    }),
    ...mapGetters('user', ['user']),
    ...mapGetters('ui/modal/reTarget', ['isVisible']),
    isDisabled() {
      return !!this.validation.errors.length
    },
```



```js
computed: {
    ...mapGetters('domain/globalFilter/date', {
      globalFilterDateRange: 'dateRange'
    }),
    ...mapGetters('scope', {
      shops: 'shop',
      clients: 'client',
      brands: 'brand'
    }),
    ...mapGetters('user', ['user']),
    ...mapGetters('ui/modal/reTarget', ['isVisible']),
```

```js
 methods: {
    ...mapMutations([
      'increment', // `this.increment()` を `this.$store.commit('increment')` にマッピングする

      // mapMutations はペイロードサポートする:
      'incrementBy' // `this.incrementBy(amount)` を `this.$store.commit('incrementBy', amount)` にマッピングする
    ]),
    ...mapMutations({
      add: 'increment' // `this.add()` を `this.$store.commit('increment')` にマッピングする
    })
```

### reference:

```
https://qiita.com/terufumi1122/items/6f9470c8d416a4af7502
https://vuex.vuejs.org/ja/guide/mutations.html
https://shkn.hatenablog.com/entry/2019/05/29/020223
```