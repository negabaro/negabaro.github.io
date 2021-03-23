---
layout: post
title: "git rm실패시 강제삭제 해주는 방법"
description: git rm -r --ignore-unmatch  ./강제삭제해줄 파일명 커맨드 실행
author: negabaro kim
tags: git
---


```bash
git rm -r ./xx
fatal: pathspec './hoge' did not match any files
```

git rm시 아래와 같은 에러가 나온다면 아래와 같이 --ignore-unmatch옵션을 추가해 주자.

```bash
git rm -r --ignore-unmatch  ./xx
```


##### --ignore-unmatch

`--ignore-unmatch`옵션은 Git에 등록되어있지 않는 파일을 강제삭제해준다.


---

[git rm で fatal: pathspec did not match any filesが出るときの解決方法]: https://qiita.com/pugiemonn/items/2f6af4467b33ed3f41b5
