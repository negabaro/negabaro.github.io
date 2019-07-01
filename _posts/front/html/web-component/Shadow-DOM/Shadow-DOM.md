Shadow DOM은 반드시 이미 존재하는 요소(HTML 파일 내에 사용된 요소)에 추가해야 합니다. 요소는 <div>와 같은 네이티브 요소일 수도 있고, <y9-card>와 같은 커스텀 요소일 수도 있습니다.
위 예제에서 사용했던 .attachShadow() 메서드를 사용해 Shadow DOM을 요소에 추가할 수 있습니다. 구문은 다음과 같습니다.

```js
elementNode.attachShadow(shadowRootInit);
```

---

shadowRootInit은 옵션 객체로 mode 속성을 설정할 수 있습니다.

mode 속성은 Shadow DOM Tree의 캡슐화 모드를 설정합니다.

모드 값 설명

open shadowRoot를 추가한 요소들이 .shadowRoot 속성을 사용해 HTML DOM으로부터 접근 가능하게 설정합니다.
close shadowRoot를 추가한 요소들이 .shadowRoot 속성을 사용해 HTML DOM으로부터 접근 불가능하게 설정합니다.

```js
element.attachShadow({
  mode: "open" // 'open' | 'close'
});
```

## https://github.com/yamoo9/WebComponent

`従来の Web ページは単一の DOM Tree(DocumentTree)で構成されており、全ての HTMLElement が DocumentTree に属していた（存在していた）為,`

抽象化というが概念が存在しませんでした。

Shadow DOM は DocumentTree と干渉することのない `DOM Tree(ShadowTree)を用いて、DOM のカプセル化を実現したもの`です。

例えば、

var root = htmlElement.createShadowRoot();
root.innerHTML`<button id='shadow-button'>送信<button>;`
と記述すると htmlElement 下に ShadowRoot が生成され、ShadowRoot 下に送信ボタンが生成されます。 送信ボタンは ShadowTree に属している為、

```js
document.getElementById("shadow-button");
```

のように選択することが出来ません。

https://cdn-ak.f.st-hatena.com/images/fotolife/t/technica-speee/20160805/20160805145243.jpg?1470376364
https://tech.speee.jp/entry/2016/08/05/154253
