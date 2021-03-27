---
layout: post
title:  swift navigationContoller을 이용한 화면전이
tags: swift
---

## 화면전이

스토리보드에 navigationConroller을 배치하고 Controller에 아래와 같은 Action을 드레그해서 만들 수 있다.

navigationController에 pushViewController를 하면 이동 popViewController을 하면 화면을 뒤로 돌리는 방식이다.

### 화면 이동

```js
@IBAction func naviGoSecond(_ sender: Any) {
    guard let naviSecondview = self.storyboard?.instantiateViewController(withIdentifier: "NavigationSecondView") else{
        return
    }
    self.navigationController?.pushViewController(naviSecondview, animated: true)
}
```

### 뒤로 이동

```js
@IBAction func popNavigationVIew(_ sender: Any) {
    self.navigationController?.popViewController(animated: true)
}
```

---

[Link1]: https://junghun0.github.io/2019/05/20/ios-screen-change/

[Link2]: https://sites.google.com/a/gclue.jp/swift-docs/ni-yinki100-ios/uikit/uinavigationcontrollerno-biao-shi