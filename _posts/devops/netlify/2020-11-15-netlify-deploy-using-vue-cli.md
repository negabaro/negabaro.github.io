---
layout: post
title: "vue-cli를 사용해 Netlify에 정적페이지를 디플로이하는 방법"
author: negabaro kim
tags: devops/netlify
---


이 포스트에서는 vue-cil를 사용해 Netlify에 정적페이지를 디플로이하는 방법에 대해 소개한다.

순서는 아래와 같다.

vue-cli설치 -> Github Repository작성 -> Netlify & Github연결 -> Github 코드 push


# vue-cli설치


```bash
yarn global add @vue/cli
vue create netlify-website-demo
```
# vue-cli기동

정상적으로 기동시 아래와 같이 출력된다.

```bash
cd netlify-website-demo
$ yarn server

  App running at:
  - Local:   http://localhost:8080/
```



# Github Repository작성

Github Repository를 작성해주자.

![image](https://user-images.githubusercontent.com/4640346/99152797-5e84e280-26e7-11eb-98a0-5fa8202a7401.png)

# Netlify설정

[Netlify]에 억세스해서 위에서 작성한 Github Repository와 Netlify를 연결해준다.
이 설정으로 자동 디플로이가 가능해진다.

![image](https://user-images.githubusercontent.com/4640346/99152813-79575700-26e7-11eb-9c83-56b8bd725dac.png)


Build command와 Publish directory설정을 해준다.

vue-cli디폴트 빌드 커맨드는 `yarn run build` 이고 dist에 빌드한결과가 출력되므로 아래와 같이 기술해주자.


![image](https://user-images.githubusercontent.com/4640346/99152821-82e0bf00-26e7-11eb-9be4-81a57ca582b2.png)

# Github commit & push

vue-cli코드를 작성한 Reposiotry에 Commit&Push 해준다.

```bash
git init . 
git commit -m "first commit"
git push
```

# 도메인 커스텀

관리화면의 Domain Management에서 도메인을 변경할 수 있다.

---

여기까지 정상적으로 따라왔다면 아래와 같이 디플로이 status가 success가 되어 있고 

생성된 프로젝트의 도메인명에 억세스해서 접속하면 vue-cli에서 생성한 화면이 표시되는걸 확인할 수 있다.

![image](https://user-images.githubusercontent.com/4640346/99153002-e7e8e480-26e8-11eb-9f6f-d22343e2a712.png)



### reference:

[Netlify]: (https://www.netlify.com/)

[Link](https://qiita.com/mnuma/items/15f2e8a5f34a392bc604)

