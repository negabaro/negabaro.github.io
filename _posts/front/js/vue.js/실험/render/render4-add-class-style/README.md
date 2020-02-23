https://reffect.co.jp/vue/vue-js-render

classや属性の設定も行うことができます。属性を使用する場合は第二引数を使用して、第三引数が文字列になります。

```
render: function(createElement){
  return createElement('h1',{ class: 'hello' },this.message)
}
```

style属性も同様に設定可能です。

```
render: function(createElement){
  return createElement('h1',{ style: 'background-color:red;color:white;' },this.message)
}
```

v-bindを使ってclass属性の設定も行うことができます。下記ではclassのFooのみclassが適用されます。

```

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    isActive: true,
    isFalse: false
  },
render: function(createElement){
  return createElement('h1',{ class: {
    foo: this.isActive,
    bar: this.isFalse
  } },this.message)
}
})
```

