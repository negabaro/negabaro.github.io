---
layout: post
title: "git 삭제된 파일만 일괄 git add하는 방법 "
author: negabaro kim
description: git rm $(git ls-files --deleted)커맨드 실행
tags: git
---

삭제된 파일들만 git add하는 방법

```bash
git rm $(git ls-files --deleted)
```

정상동작시 대상파일(삭제된 파일)의 디렉토리가 출력된다.

--- 

#### fatal: pathspec './xx' did not match any files


위 커맨드 실행시 `fatal: pathspec './xx' did not match any files`같은 에러가 나와 실패할 때가 있다.

해당 파일이 Git에 등록이 안되어있을때 발생하는 에러이다.

이때는 `-r --ignore-unmath`옵션을 붙여서 강제 삭제해주는 방법을 쓰도록하자.

```
git rm -r --ignore-unmatch  ./xx
```

위 커맨드 실행후 다시 `git rm $(git ls-files --deleted)` 실행해주면 정상동작했다.



---

[Git】削除したファイルだけaddする方法]: https://qiita.com/___xxx_/items/0cad6a5062fd166652cd
