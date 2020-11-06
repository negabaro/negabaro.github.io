---
layout: post
title:  "vue-cli를 이용한 github pages 공개방법"
tags: tools/github
---

# 개요 

이 포스트에서는 [project별 github pages 공개하는 방법] 에 이어서
vue-cli를 이용한 github page공개 방법에 대해 알아보자.

# vue.config.js파일 작성

vue-cli로 프로젝트 생성후 webpack설정을 수정하기 위해서 vue.config.js를 아래와같이 추가해줄 필요가 있다.

```js
module.exports = {
  publicPath: '/project-name/',
  outputDir: 'docs'
}
```

이전 포스트에서 잠깐 언급했지만 github page는 root이외에 docs라는 디렉토리를 지정할 수 있다.
빌드결과를 docs이하로 하면 github page에서도 읽어올 수 있다.

# 빌드

`yarn build`로 vue-cli프로젝트를 빌드해준다.

dist가 아닌 docs이하에 빌드결과가 출력되는것을 확인하도록하자.


# push

빌드결과를 push해준다.

# GitHub source설정 변경

`settings -> source -> dir선택` 에서 docs디렉토리를 선택해서 docs이하에 있는 index.html을 참조하게 해야한다.


[![Image from Gyazo](https://i.gyazo.com/83d6f79281ec6668b4250b87c5d32e03.gif)](https://gyazo.com/83d6f79281ec6668b4250b87c5d32e03)


### reference:

[project별 github pages 공개하는 방법]:(https://negabaro.github.io/archive/how-to-create-github-page-project)
[Link](https://qiita.com/paragaki/items/4b4e1171f2265ad807bc)

