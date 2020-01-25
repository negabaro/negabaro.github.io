
```js
function copyObj(obj) {
  var copy = {};
  if (Array.isArray(obj)) {
    copy = obj.slice().map((v) => {
      return copyObj(v);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = copyObj(obj[attr]);
      }
    }
  } else {
    copy = obj;
  }
  return copy;
}
var obj = { a: 1, b: 2, c: [{ d: null, e: 'f' }] };
var obj2 = copyObj(obj);
obj2.a = 3;
obj2.c[0].d = true;
console.log(obj.a); // 1
console.log(obj.c[0].d); // null
```

copyObj이란 함수를 새로 만들었습니다. 결과를 보면 obj과 obj2가 따로 놀죠. 여기서 for~in과 hasOwnProperty를 처음 보실 겁니다. for ~ in 은 obj안의 키를 순서대로 반복합니다. (주의할 점은 키가 숫자면 순서대로 반복되지 않는다는 겁니다. 숫자로된 키가 없을 때 사용하세요) 문제는 prototype에 있는 상속된 객체의 속성도 반복되기 때문에 obj.hasOwnProperty(keyName)메소드로 상속되지 않은 자기의 속성만 반복되도록 제한하는 겁니다. hasOwnProperty 부분을 빼고 복사하면, 왜 그 부분이 필요한지 이유를 알 수 있을 겁니다.

[QUESTION]hasOwnProperty 부분을 빼고 복사하면, 왜 그 부분이 필요한지 이유를 알 수 있을 겁니다.

https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d