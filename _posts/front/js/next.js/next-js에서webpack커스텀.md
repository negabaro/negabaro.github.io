next.config.js

파일에서

```
config.module.rules.push({})
```

로 추가해줌

이런식

```js
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const path = require("path");
//module.exports = withTypescript(withCSS());

module.exports = withTypescript(
  withCSS({
    webpack(config, options) {
      config.module.rules.push({
        test: /ip-address\.json$/,
        loader: path.resolve(__dirname, "./ip_address_loader.js")
      });
      return config;
    }
  })
);
//https://github.com/zeit/next-plugins/issues/7
```
