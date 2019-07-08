---
layout: post
title:  "javascript shallow copy와 deep copy에 대해서"
author: negabaro kim
categories: js
tags:	js
---


# shallow copy와 deep copy

javascript에서 객체 복사시 복사 대상이 참조하는 레퍼런스값을 사용할 경우 shallow copy(얕은 복사) 사용하지 않을 경우 deep copy(깊은복사) 라고 부른다.

완벽한 deep copy를 구현하는 방법은 많지 않고(거의 없고) 대부분 참조 레퍼런스값을 공유하는 형태의 
shallow copy기능을 제공하는데 레퍼런스값을 공유하는 편이 서버 리소스를 아낄 수 있고 퍼포먼스 향상에 
도움이 되기 때문일 것이다.

반면 이부분을 제대로 이해하지 못하고 shallow copy 사용시 의도치 않은 버그에 부딪힐 수 있다.

예를 들면 unit test시 테스트간의 독자성을 확보해야하는데 A테스트에서 사용한 shallow copy로 인해 B테스트에 영향을 주는등의 문제이다.


## shallow copy

많이 쓰이는 이하 방법은 모두 shallow copy이다

1. =연산자로 대입
2. Object.assign함수
3. spread 연산자


### =연산자로 대입

이하 코드와 같이 =연산자로 copy한 오브젝트를 dahyun으로 바꿔버리면
copy원본 오브젝트인 sana도 dahyun으로 바뀌어버린다.

```js
const obj = {
  name: "sana",
  age: 22
}

const obj2 = obj
obj2.name = "dahyun";
console.log(obj2.name) // dahyun
console.log(obj.name) // dahyun
```

### spread 연산자

spread 연산자는 =연산자 보단 조금 똑똑하다.

```js
const newObj = { ...obj }
newObj.name = "mina"
console.log(newObj.name) // mina
console.log(obj.name) // dahyun
```
copy한 오브젝트에 mina를 대입해도 원본object가 바뀌지 않는다..!
여기까지 보면 deep copy인가 싶기도 하지만 오해하지 말자.

이하 예제를 보면 2 depth이하의 프로퍼티는 레퍼런스를 참조하고 있는걸 알 수 있다.


```js
const deep_obj = {
  name: "jihyo",
  age: 22,
  families: {
    brothers: 1,
    sisters: 1
  }
}

const new_deep_obj = { ...deep_obj }
new_deep_obj.families.brothers = 5
console.log(new_deep_obj.families.brothers) // 5
console.log(deep_obj.families.brothers) // 5
```

families.brothers를 5명으로 바꾸니 원본 오브젝트도 5명으로 바뀌어 버린다..



## 일부분 deep copy

`JSON.stringify`와`JSON.parse`를 사용하면 어느정도 deep copy와 가까운 구현을 할 수 있지만
해당 오브젝트에 undefined나 함수등이 존재할 경우 해당 프로퍼티를 무시해 버리기 때문에 
완벽한 deep copy라고 말하긴 어렵다.


이하 예제를 살펴보자

```js
const person = {
  name: "sana",
  age: 22,
  run: () => {console.log("run!!")} 
}

person2 = JSON.parse(JSON.stringify(person))
console.log(person2) // {name: "sana", age: 22}
```

run함수가 사라져버리는걸 알 수 있다.


## 완벽한 deep copy?

완벽한 deep copy를 구현하려면 해당 object의 depth만큼 for문을 돌린다든지
상당히 귀찮은 작업이 발생한다.

이를 대체하는 방법으로  외부라이브러리인 loadsh의 cloneDeep를 이용하는 방법이 있다.

https://github.com/lodash/lodash

```js
const _ = require('lodash'); // 追加

const obj = {
  name: "jihyo",
  age: 22,
  families: {
    brothers: 1,
    sisters: 1
  }
}

const newObj = _.cloneDeep(obj)
console.log(newObj);

newObj.families.brothers = 10000;
console.log(newObj.families.brothers); // 10000
console.log(obj.families.brothers); // 1
```

### reference:

https://blog.ull.im/engineering/2019/04/01/javascript-object-deep-copy.html
https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d
http://hong.adfeel.info/frontend/javascript-%EA%B0%9D%EC%B2%B4-deep-copy/
http://top-men.hatenablog.com/entry/2018/10/03/213627
https://kuroeveryday.blogspot.com/2017/05/deep-clone-object-in-javascript.html