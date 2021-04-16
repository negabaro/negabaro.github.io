---
layout: post
title:  자주 쓰는 heroku 커맨드 Makefile에 정리
tags: linux/makefile
---

자주쓰는 heroku 커맨드를 Makefile로 정리해봤다.


```Makefile
DEV_APP_NAME=xx-api-development
STG_APP_NAME=xx-api-stg
PRD_APP_NAME=xx-api-prod

h-dev-c:
	$(call HEROKU_GIT_REMOTE, ${DEV_APP_NAME})
	$(HEROKU_RAILS_CONSOLE)
h-stg-c:
	$(call HEROKU_GIT_REMOTE, ${STG_APP_NAME})
	$(HEROKU_RAILS_CONSOLE)
h-prd-c:
	$(call HEROKU_GIT_REMOTE, ${PRD_APP_NAME})
	$(HEROKU_RAILS_CONSOLE)

h-dev-b:
	$(call HEROKU_GIT_REMOTE, ${DEV_APP_NAME})
	$(HEROKU_RUN_BASH)
h-stg-b:
	$(call HEROKU_GIT_REMOTE, ${STG_APP_NAME})
	$(HEROKU_RUN_BASH)
h-prd-b:
	$(call HEROKU_GIT_REMOTE, ${PRD_APP_NAME})
	$(HEROKU_RUN_BASH)

h-dev-l:
	$(call HEROKU_GIT_REMOTE, ${DEV_APP_NAME})
	$(HEROKU_LOGS_TAIL)
h-stg-l:
	$(call HEROKU_GIT_REMOTE, ${STG_APP_NAME})
	$(HEROKU_LOGS_TAIL)
h-prd-l:
	$(call HEROKU_GIT_REMOTE, ${PRD_APP_NAME})
	$(HEROKU_LOGS_TAIL)

define HEROKU_GIT_REMOTE
heroku git:remote --app ${1}
endef

define HEROKU_RUN_BASH
heroku run bash
endef

define HEROKU_LOGS_TAIL
heroku logs -t
endef

define HEROKU_RAILS_CONSOLE
heroku run bash -lc "rails c"
endef
```


## 사용방법(REAME.md)


## Heroku


### How to install heroku

#### For Mac

```bash
$ brew tap heroku/brew && brew install heroku
```

### login

```bash
$ heroku login
```

### bash

```bash
$ make h-dev-b ## connect to development server
$ make h-stg-b ## connect to staging server
$ make h-prd-b ## connect to production server
```

#### rails console

```bash
$ make h-dev-c ## connect to development server
$ make h-stg-c ## connect to staging server
$ make h-prd-c ## connect to production server
```

#### tail -f logs

```bash
$ make h-dev-l ## connect to development server
$ make h-stg-l ## connect to staging server
$ make h-prd-l ## connect to production server
```