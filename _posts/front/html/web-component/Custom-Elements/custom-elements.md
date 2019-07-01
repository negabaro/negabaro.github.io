1. Custom Elements
   Custom Elements は、HTMLElement そのものを拡張し、独自の要素を定義する仕組みのことです。

```js
var XComponent = Object.create(HTMLElement.prototype);
document.registerElement("x-component", { prototype: XComponent });
```

↓

```html
<x-component></x-component>
```

独自に定義したタグに対して、機能を持たせることが出来ます。

ちなみに、ES6 の class 構文を使って HTMLElement を extend する形で CustomElement が定義できるようになるかも。 https://w3c.github.io/webcomponents/spec/custom/

https://tech.speee.jp/entry/2016/08/05/154253
