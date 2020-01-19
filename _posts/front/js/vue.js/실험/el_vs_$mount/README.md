https://stackoverflow.com/questions/46831452/difference-between-mount-and-el-vue-js


https://kr.vuejs.org/v2/api/index.html

$mount나 el은 같은데

```
// 또는 문서를 렌더링하고 나중에 추가할 수 있습니다.
var component = new MyComponent().$mount()
document.getElementById('app').appendChild(component.$el)
```

이런식으로 렌더링한걸 난중에 추가할 수 있다.

