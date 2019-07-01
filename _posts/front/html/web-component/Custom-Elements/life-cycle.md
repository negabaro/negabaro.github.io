스텀 엘리먼트는 라이프 사이클(Lifecycle)이 있어 특정 시점에 이벤트를 활용할 수도 있다.

표 1 라이프사이클 설명
라이프 사이클 이름 설명
created 생성될 때 발생
attributeChanged 속성이 변경됐을 때 발생
inserted DOM 트리에 삽입됐을 때 발생
removed DOM 트리에서 삭제됐을 때 발생
라이프 사이클은 다음 코드와 같이 lifecycle 메서드에 오브젝트 형식으로 넣으면 해당 시점에 실행된다.

콜백 발생지점

createdCallback 인스턴스가 생성될 때
attachedCallback 생성된 인스턴스가 문서에 추가될때
detachedCallback 인스턴스가 문서에서 제거될 때
attributeChangedCallback(attrName, oldVal, newVal) 속석이 변경될 때 (추가/삭제/수정)

```js
var amosMidfielder = Object.create(HTMLElement.prototype);

amosMidfielder.createdCallback = function() {
  return console.log("create~~~~~");
};
amosMidfielder.attachedCallback = function() {
  return console.log("attached~~~~");
};
amosMidfielder.detachedCallback = function() {
  return console.log("detached~~~~");
};
amosMidfielder.attributeChangedCallback = function() {
  return console.log("change~~~~");
};

var AmosMidfielder = document.registerElement("amos-mid", {
  prototype: amosMidfielder
});
```

특이한점은 등록되는 객체 AmosMifielder에 콜백펑션들이 붙이않고 prototype붙는다는 것이다.

```html
<element extends="time" name="x-clock">
  <script>
    // …

    this.lifecycle({
      inserted: function() {
        this.startUpdatingClock();
      },
      removed: function() {
        this.stopUpdatingClock();
      }
    });

    // …
  </script>
</element>
```

https://d2.naver.com/helloworld/188655
https://gist.github.com/shallwefootball/da2ec620819820658043
