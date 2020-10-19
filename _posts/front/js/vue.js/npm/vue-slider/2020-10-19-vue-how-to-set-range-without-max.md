---
layout: post
title:  "Vue Slider에 시간(HH:MM:SS)을 설정하는 방법"
author: negabaro kim
tags:	vue.js
---


기본적인 vue-slider의 사용법은 [JSfield]를 참고


# Vue slider에 시간을 설정하는 방법


```js
<vue-slider
    ref="slider"
    v-model="value"
    v-bind="options"
    :min="15"
    :max="360"
    :interval= "1"
    :tooltip="'always'"
    :tooltip-formatter="Tformatter"
  >
  </vue-slider>
new Vue( {
  el: '#app',
  data () {
    return {
      value: 15,
      Tformatter: val => {
        let min = Math.floor(val/60);
        let sec = val%60 > 9 ? val%60 : "0"+val%60;
        return min+':'+sec;
      }
    }
  },
```

`tooltip-formatter`옵션이 포인트


# 동작확인

[![Image from Gyazo](https://i.gyazo.com/ecfd14f384ec7e9a68c080ea20b6cac7.gif)](https://gyazo.com/ecfd14f384ec7e9a68c080ea20b6cac7)

### reference:

[JSfield]:(https://jsfiddle.net/NightCatSama/2xy72dod/10547/)

[Link](https://stackoverflow.com/questions/64394866/how-to-set-range-without-max-values-in-vue-slider)