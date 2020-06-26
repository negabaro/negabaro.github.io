---
layout: post
title: "javascript에서 object안에 특정 key가 존재하는지 확인하는 방법"
author: negabaro kim
tags: js
---

# 1. "key" in obj

in연산자를 사용하는 방법

```js
const data = {a:10,b:20,c:30}
if ("a" in data) {
}
```

가장 확실한 방법.
key안에 어떤 값이 있더라도 key만 존재하면 true를 return한다.

프로토타입 체인을 따라가서 해당 key가 있는지 전부확인 한다.


## 퍼포먼스

속도가 가장 느리다고 알려져있음.

```js
var result = "Impression" in array;
12,931,832 ±0.21% ops/sec      92% slower 
```

# 2. obj.hasOwnProperty("key") 

스스로 정의한 프로퍼티에 한해서 특정 키(프로퍼티)의 소유여부를 true,false로 반환함(프로토타입 체인을 보지 않음)


```ruby
yourObjName.hasOwnProperty(key) : true ? false;
```

## 퍼포먼스

1번 다음으로 느리다고 함.


# 3. Object.keys(yourObjName).length

```js
Object.keys(yourObjName).length : true ? false
```


# 4. Object.keys(obj).some(v => v == key);

```js
var obj = {foo: 'one', bar: 'two'};
    
function isKeyInObject(obj, key) {
    var res = Object.keys(obj).some(v => v == key);
    console.log(res);
}

isKeyInObject(obj, 'foo');
isKeyInObject(obj, 'something');
```

using Array#some and Object.keys. It will return true if given key exists in the object or false if it doesn't.

# 5. obj["x"] or obj.x


완벽하진 않지만 평타정도는 치는 방법
키는 존재하는데 value에 null,undefined,false등이 있으면 없다고 판단해버리므로 사용시 주의가 필요


```js
const data = {a:10,b:20,c:30}
if(data["a"]){
//存在する時の処理
}
// または
if (data.a){
//存在する時の処理
}
```

## 퍼포먼스

가장빠르다고 알려짐.


# 메모1. !("key" in obj)

1번 방법에서 해당 키가 존재하지 않는것을 확인할때 괄호를 넣어주지 않으면 에러가 나므로 주의

```js
!("key" in obj) // true if "key" doesn't exist in object
!"key" in obj   // ERROR!  Equivalent to "false in obj"
```


### reference:

```
https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object
```