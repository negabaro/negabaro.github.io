   <img
      :src="require('@/../public/logo_icon.png')"
      :alt="getKeyAttr(keyType, 'alt')"
    >

이런식으로 하니까 모듈안에 img불러왔당

<img data-v-e1b21954="" src="/img/logo_icon.44c74e12.png" alt="有料記事">

이런식으로 불러와짐

bundle.js에 포함된 이미지는

 ｀｀｀require('../assets/p1.jpg')｀｀｀

이런식으로 불러오는걸로 알고 있는데

public/index.html 안에서 위와 같은 이미지를 불러올 수 가 있나요?
1 件の返信

Euiseok Ryu  [1時間前]
아뇨 index.html에서는 접근이 안될거에요. 빌드할 때 webpack이 경로들을 치환하는 형식으로 사용하기 때문입니다.
정적인 파일을 index.html에서 사용하시려면 public 폴더 하위에 두고 사용하셔야 합니다.



entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:


background: url("~@/assets/icon_arrow_quake.png") no-repeat right center #fff;

src/assets/icon_arrow_quake.png

    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAAAGXRFW…wvS1EspqelcIvpbSnY4oGwFFZyGdDbUhBgAWLHgWjeAgQYAERLh3U4IwEiAAAAAElFTkSuQmCC) no-repeat right center #fff;




```js
vue.config.js
chainWebpack: config => {
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  }
```
설정 먹엇을시에 vue inspect다시보면 바껴있음

하고 npm run serve재기동하면 바꼇당 ㅎ

