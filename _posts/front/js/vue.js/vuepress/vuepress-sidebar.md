TML 文法の観点からは、

最初にh1タグ
そのサブセクションの見出しとしてh2タグ
さらにそのサブセクションにh3タグ（以下h6タグまで利用可能）


また、見出しをどこまで表示するのかも設定できます。

module.exports = {
  themeConfig: {
    sidebar: 'auto',
    sidebarDepth: 1,
  }
}

くQiitaなんかで見かけるのが1つ目の『ページ内の項目』を表示する方法です。
目次的な役割をしていて、こちらの設定はすごくシンプルです。

module.exports = {
   themeConfig: {
    sidebar: 'auto'
  }
}
1
2
3
4
5
module.exports = {
   themeConfig: {
    sidebar: 'auto'
  }
}
これで自動でマークダウンの見出しに合わせてサイドバーが表示されます。


## 디폴트 Sidebar 코드

[Sidebar code]를 참고

## vuepress-bar

접히는형태?

[nested-header example] 참고

## vuepress-plugin-auto-sidebar

npm i vuepress-plugin-auto-sidebar -D
#使用（Usage）
注意请勿将 plugins 放在 themeConfig 中，如何使用插件。

module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {}
  }
}

## sidebarDepth

현재 post에 지정하면 동작하고 config.js에서는 동작안함..why?

## extractHeaders

[extractHeaders code]

## 
1
2
3
4
5
6
module.exports = {
  themeConfig: {
    sidebar: 'auto',
    sidebarDepth: 1,
  }
}
デフォルトは1です。（h3まで表示する）

h1はタイトルなので、h2が大見出し、h3が小見出しみたいに使用します。
なのでsidebarDepthは1がやはり一般的ですかね。

0にするとh2だけ表示されます。
また、Config.jsでは2以上は指定できません。

## 메모


### 1.

[Sidebar Groups]안에서는 sidebarDepth설정이 안먹혔다. (이유는 모름..)

### 2. extractHeaders에 h1지정해도 안먹힘

현재 오픈중인 이슈가 있는걸로 봐서 아직 해결안된것 같다.

[Not able to choose h1 for sidebar ]

---

[Support of sidebarDepth: 3]: https://github.com/vuejs/vuepress/issues/1715#issuecomment-676592247

[Nested Header Links]: https://vuepress.vuejs.org/theme/default-theme-config.html#nested-header-links

[Sidebar Groups]: https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar-groups

[Not able to choose h1 for sidebar ]: https://github.com/vuejs/vuepress/issues/2346 

[extractHeaders code]: https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/shared-utils/src/extractHeaders.ts

[nested-header example]: https://zyy7259.github.io/test-vuepress-nested-group/nested1/nested-header.html


[Sidebar code]: https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/components/Sidebar.vue