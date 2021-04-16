---
layout: post
title:  Makefile 작성팁
tags: linux/makefile
---

이 포스트에는 Makfile작성시 유용한 팁을 정리해봤다.


## short cut 만든는 방법

Makefile에서 아래와 같이 정의해주고 `make s`커맨드를 실행하면  `ls -la`커맨드를 실행할 수 있게됨.

```bash
s:
	ls -la
```

※주의사항: `s:` 개행후 스페이스는 위와 같이 지정해줄것. (안해주면 에러)

## 메소드 만드는 방법

define을 사용해서 반복되는 코드를 정의해주고 호출해줄 수 있다.

```bash
s:
	$(SS)

define SS
ls -la
endef
```


## define메소드에 인자 넘겨주는 방법

`call define명, 인자`와 같은 문법으로 define을 호출해주면 가능하다.
뒤에 인자는 순서대로 `${1}`,`${2}` 같은 방법으로 가져올 수 있다.

```bash
define add_target
${1}: ${2}
endef

... $(call add_target, A, B)
... $(call add_target, A, B C D)
```


## shell커맨드 실행

아래와 같이 shell커맨드의 결과를 변수에 담을 수 있다.

```bash
API_CONTAINER_ID=`docker ps | grep rails | awk '{print $$1}'`
```

※주의사항 `=`사이에 띄어쓰기 넣지말것


[makefile-call-function-how-to-get-all-arguments]를 참고

---

[makefile-call-function-how-to-get-all-arguments]: https://stackoverflow.com/questions/38922089/makefile-call-function-how-to-get-all-arguments
