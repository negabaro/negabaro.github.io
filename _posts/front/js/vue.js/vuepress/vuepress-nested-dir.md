Auto Sidebar for Single Pages
To automatically generate a sidebar that contains only the header links for the current page, you can use YAML front matter on that page:

---
sidebar: auto
---
You can also enable it in all pages by using config:

// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
In multi-language mode, you can also apply it to a specific locale:

// .vuepress/config.js
module.exports = {
  themeConfig: {
     '/': {
       sidebar: 'auto'
     }
  }
}


## 이대로 했는데 안됨

https://github.com/vuejs/vuepress/issues/287#issuecomment-402030295

## 이 설정안먹힘s

```
'/baz/': 'auto', /* automatically generate single-page sidebars */
```

https://vuepress.vuejs.org/theme/default-theme-config.html#multiple-sidebars

[can support nested sidebar?]: https://github.com/vuejs/vuepress/issues/287