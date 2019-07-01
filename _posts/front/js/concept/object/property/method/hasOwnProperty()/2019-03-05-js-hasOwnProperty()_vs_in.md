---
layout: post
title: "JS in과 hasOwnProperty()의 차이"
author: negabaro kim
categories: js
tags: js
---

# in과 hasOwnProperty()의 공통점

둘다 오브젝트의 프로퍼티 유무 결과를 리턴한다

# in과 hasOwnProperty()의 차이

in은 프로토타입 체인을 전부 올라가서 확인한다.
hasOwnProperty()은 프로토타입 체인을 확인하지 않고, 해당 객체가 스스로 정의한 프로퍼티만을 판단한다.

# 예제

```
function GroupName() {
  this.twice = "Twice!";
}

function Jyp() {
  this.jyp = "Jyp!";
}

Jyp.prototype = new GroupName();

GroupName.prototype.itzy = "Itzy!";



var jyp_idol = new Jyp();
console.log("-------------in case of jyp_idol-------------");
console.log("jyp_idol:", jyp_idol);
console.log("jyp" in jyp_idol); //true
console.log("twice" in jyp_idol); //true
console.log("itzy" in jyp_idol); //true

console.log(jyp_idol.hasOwnProperty("jyp")); //true
console.log(jyp_idol.hasOwnProperty("twice")); //false
console.log(jyp_idol.hasOwnProperty("itzy")); //false

var group_name = new GroupName();
console.log("-------------in case of group_name-------------");
console.log("group_name:", group_name);
console.log("jyp" in group_name); //false
console.log("twice" in group_name); //true
console.log("itzy" in group_name); //true

console.log(group_name.hasOwnProperty("jyp")); //false
console.log(group_name.hasOwnProperty("twice")); //true
console.log(group_name.hasOwnProperty("itzy")); //false
```

[![Edit hasOwnProperty_vs_in](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/l73n3zm4mm?fontsize=14)

## result:

![image](https://user-images.githubusercontent.com/4640346/53866359-c3dc9100-4034-11e9-8903-7c7489c56929.png)

### Reference Link:

```
https://mygumi.tistory.com/330
https://qiita.com/shuhei/items/dabf0ca097f05264baf9
```
