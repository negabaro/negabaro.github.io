// config/webpack/environment.js
const { resolve } = require('path')
// ...snip...
environment.config.merge({
  resolve: {
    alias: {
      '@': resolve('app/javascript')
    }
  }
})
// ...snip...
// tsconfig.json
"paths": {
    "*": ["node_modules/*", "app/javascript/*"],
+   "@/*": ["app/javascript/*"]
},

https://notes.tmtr.jp/2019/09/30/vue-ts-rails/
