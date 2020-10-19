---
layout: post
title:  "TypeScript && Chrome Extension 개발환경 간단히 만드는 방법"
tags: chrome-extension
---

yoman,generator-chrome-extension-kickstart-typescript를 이용해 간단히
TypeScript && Chrome Extension 개발환경을 만들어보자.

# npm install

```js
 npm install -g yo generator-chrome-extension-kickstart-typescript
```


# 커맨드 실행

```bash
mkdir project
$ cd project
$ yo chrome-extension-kickstart-typescript 
```

정상적으로 실행되면 아래와 같이 필요에 맞게 항목을 설정해준다.

![image](https://user-images.githubusercontent.com/4640346/96430841-a5dd9780-123d-11eb-8c58-0736f0643b8a.png)


# 빌드

정상적으로 생성되었다면 아래 커맨드로 빌드를 실행시켜준다.

```js
npm run dev:chrome
```

# chrome-extenstion에서 로드

chrome://extensions에서 패키지 되지않은 확장파일을 읽어오는 버튼을 클릭해서 project/dist를 로드해준다.

끝


### reference:

[Link](https://qiita.com/Takumon/items/da2142cc06b243f83211)
[Github](https://github.com/mazamachi/generator-chrome-extension-kickstart-typescript)