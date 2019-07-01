---
layout: post
title: "Javascript ES6 const와let"
author: negabaro kim
categories: javascript
tags: javascript
---

# const와let 왜 알아야하나?

# const와let

ES6 이전에는 var밖에 없었는데 const,let이 생기면서 용도에 따른 변수 선언이 가능해짐

특히 const의 등장은 개발자들을 기쁘게 했는데

JavaScript에는 원래 `정수(불변한 수)`라는것이 존재하지 않았기 때문 const를 이용하면 `정수`선언이 가능해진다

const -> 재대입 불가능한 변수를 선언
let -> 재대입 가능한 변수를 선언

# 거의 const

ES6에서는 기본적으로 90%이상은 const로 변수선언을 하는것이 좋은 경우가 많음.
재대입이 불가능해 immutable(불변한) 제어시 용이

```
const num = 10;
const [a,b,c] = [1,2,3];
```

```
const USER_MAX_VALUE = 100;
USER_MAX_VALUE = 200;          // 정수는 덮어쓰기 안된다고 에러가 발생함.
```

# 바보 const

위에서 불변한 변수선언이 가능한게 const라고 했는데
배열을 const로 선언하면 위에서 설명한 불변함의 특징이 사라지므로 주의가 필요하다

```
const twice = "나정모사지미다채쯔".split("");

twice.push("소미"); // push되어버림
twice.push("채령"); // push되어버림
console.log(twice); // ["나", "정", "모", "사", "지", "미", "다", "채", "쯔", "소미", "채령"]
```

# let

Javascript에서는 블록내에서만 존재하는 변수선언이 불가능했다.(안되는게 참 많아)
Es6에서는 블록스코프를 실행할 수 있는 let이 추가 됨

let을 사용하면 블록내에서 선언한 변수를 블록 밖에서 참조할 수 없게됨

if,for등의 블록안에 선언한 변수가 var이면 블록안에 있더라도 블록밖에 참조가 가능

```
bs12_02.js
if(true) {
  var a = 1;
  let b = 2;
}

console.log(a);    // 1을 출력
console.log(b);    // b는 선언되지 않았다고 에러가 발생
```

### Reference Link:

https://qiita.com/azk0305/items/ebfb43c088101f7138f9
