```js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'
import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```


```js
I also encountered this problem when I converted the vue-cli 2.0 project into vue-cli 3.0.
I change
new Vue({
el: '#app',
router,
store,
components: {App},
template: ''
})
to
new Vue({
render: h => h(App),
store,
router,
components: { App }
}).$mount('#app')

It resolved my issue
```

### reference:

https://github.com/vuejs/vuex/issues/676