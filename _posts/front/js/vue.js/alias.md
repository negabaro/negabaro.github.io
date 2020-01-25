```js
vue.config.js

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
chainWebpack: config => {
  config.resolve.alias
    .set('@', resolve('src'))
}
```
요런식으로 하면 

@/components/xx 로 통일가능 시발 개짱!
