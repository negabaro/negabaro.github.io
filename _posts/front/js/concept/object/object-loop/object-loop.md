こんなのあるんですね、便利ですね。
使い道ですが、他にも for-in で回す際に hasOwnProperty で Object の prototype 汚染を考慮する必要が無くなる、というのがあると思います。

```
Object.prototype.foo = 0
{
  var o = {};
  o.a = 1;
  o.b = 2;
  o.c = 3;
  for (var key in o) //if (o.hasOwnProperty(key))
  {
    // a, b, c, foo(bug!)
    console.log(key);
  }
}
{
  var o = Object.create(null);
  o.a = 1;
  o.b = 2;
  o.c = 3;
  for (var key in o) {
    // a, b, c
    console.log(key);
  }
}
```

ただ、TypeScript 等ならともかく、基本動的型付け言語なので Object.create(null)で作ったからといって hasOwnProperty を省くのは恐い気がします、{}で作成して hasOwnProperty 付きパターンを書くのが広まってますし、混乱しそうです、うーんこれは控えた方が良いかも。

それに、Object.keys()からキーを取り出した方が少しですが高速でした。

https://jsperf.com/performance-object-loop

ES.Next の時代は Object.entries と for (const ... of ...) で決まりですね

現在は Chrome のみ対応

```
'use strict';

const object = {a: 1, b: 2, c: 3};
for (const [key, value] of Object.entries(object)) {
    console.log({key, value});
}
/*
Object {key: "a", value: 1}
Object {key: "b", value: 2}
Object {key: "c", value: 3}
*/
```

![image](https://user-images.githubusercontent.com/4640346/53861857-c33dfd80-4028-11e9-9530-5b1c9b75041c.png)
