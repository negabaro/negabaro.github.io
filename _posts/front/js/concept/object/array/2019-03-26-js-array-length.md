---
layout: post
title: "JS array length 프로퍼티에 대해서"
author: negabaro kim
categories: js
tags: js
---

# length 프로퍼티

배열의 길이를 리턴함

배열 인덱스+1을 리턴함 해당값을 바꾸면 배열의 사이즈도 바뀌게됨

# array.length 에다 직접값을 대입하면 사이즈가 바뀐다는 소리?

--> ㅇㅇ맞음

```js
var array = ["dahyun", "sana", "mina"];
console.log(array.length); //3
array.length = 55; //55 (array.length = "55"해도 동일)
console.log(array.length); //55
```

# 여기서 말하는 사이즈란?

array안에서 참조에 사용하는 값의 범위를 말함

```js
var array = ["dahyun", "sana", "mina"];
alert(array.length); // -> 3
```

이렇게 배열의 인덱스를 지정하지 않고 그대로 대입하면 0,1,2 인덱스에 차례대로 사이좋게 대입됨

그런데 이하와 같이 인덱스를 지정하고 그값을 1000으로 지정하면

```js
array[1000] = "chungha";
alert(array.length); // -> 1001
//최대 인덱스가 1000이 되어버려서 length와 1001이되어버림
```

0,1,2에서 값자기 1000이라는 공간에 값을 대입해버리 게되고
2~999에 어떠한 값도 존재하지 않지만 참조에 사용되는 범위인 1001을 리턴해버림

# 문자열을 인덱스로 사용가능??

--> 가능..은 해

주의할 부분이 length가 늘어나지 않음
이하 예제를 봐보자

```js
var array = ["dahyun", "sana", "mina"];
console.log(array.length); //3
array["momo"] = "momoring";
console.log(array.length); //momo가 추가되었지만 그대로 3
```

문자열을 인덱스로 대입해도 length값은 변하지 않으므로 주의가 필요

```js
for (var o in array) {
  console.log(o + " = " + array[o]);
}
```

#### result:

```js
0 = dahyun
1 = sana
2 = mina
momo = momoring
```

array안에는 값이 제대로 들어가 있는 모습

```js
console.log(array["momo"]); //momoring
```

이런식으로 참조도 물론 가능

# 대입한 문자열로 배열값 참조가능?

--> 불가능!!

```js
var array = ["dahyun", "sana", "mina"];
console.log(array.dahyun); //undefined
```

# 함수 오브젝트에서의 length

함수 오브젝트에도 length라는 프로퍼티가 있는데
이건 **함수에 정의된 인수의 갯수**를 확인할 수 있다.

```js
function Abc(a, b, c, d) {}
alert(Abc.length); // -> 4
```

### Reference Link:

https://qiita.com/yoshi389111/items/245df2d642e49d2acf3a
