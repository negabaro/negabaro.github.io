---
layout: post
title:  "circleCI2.0 persist_to_workspace를 이용한 workflow job간 파일공유"
author: negabaro kim
categories: circleci
tags:	ci/cd handson
cover:  "/assets/twice3.jpg"
---

오늘은 circleCI2.0의workflow를 사용시 job간 파일 공유가 가능한 `persist_to_workspace` 에대해 알아봅시다.

이하와 같은 `.circle/config.yml` 를 실행하면 workflow에 정의한대로 build -> test순으로 job이 실행된다.


```
version: 2
jobs:
  build:
    working_directory: /src
    docker:
      - image: buildpack-deps:xenial
    steps:
      - checkout
      - run:
          name: pwd
          command: pwd
      - run:
          name: create file the test_build
          command: touch test_build
      - run:
          name: ls
          command: ls -la          


  test:
    working_directory: /src
    docker:
      - image: buildpack-deps:xenial
    steps:
      - run:
          name: pwd
          command: pwd
      - run:
          name: ls
          command: ls -la
          
workflows:
  version: 2
  build_and_test: # workflow이름
    jobs:
      - build
      - test:
          requires:
            - build
```


##### build job의 역할

/src디렉토리 하위에 
git source를 checkout
touch커맨드로 `test_build`라는 파일을 작성

##### test job의 역할

`ls -la `로 /src 디렉토리 하위의 파일을 확인
 
 
circleCI 실행결과를 확인해봤다.

![image](https://user-images.githubusercontent.com/4640346/38484500-cc62d2f8-3c11-11e8-8bfd-d7ef5aa691e8.png)

build -> test순으로 잘실행되는 모습

#### build job의 실행결과


![image](https://user-images.githubusercontent.com/4640346/38484560-f475e01e-3c11-11e8-87b6-00cb7c0a7726.png)

build job에서는 checkout한 코드와 touch로 작성한 test_build파일이 보인다.

#### test job의 실행결과


![image](https://user-images.githubusercontent.com/4640346/38484587-0d2d34e0-3c12-11e8-9890-a3749c55bbbe.png)

그러나 test job을 보면 /src디렉토리 하위에 아무것도 안보임.


### 원인/해결책은?

workflow를 이용해서 job을 나누게 되면 각각의 job은 격리된 상태이므로  다른 job에서 생성한 파일은 보이지 않게되있음.

각 job마다 매번 checkout를 정의하는것도 비효율적이므로 이럴때  `persist_to_workspace`옵션을 이용해서 job간에 파일을 공유할 수 있게 해줌





`.circle/config.yml`의 설정을 아래와 같이 변경

```
version: 2
jobs:
  build:
    working_directory: /src
    docker:
      - image: buildpack-deps:xenial
    steps:
      - checkout
      - run:
          name: pwd
          command: pwd
      - run:
          name: create file the test_build
          command: touch test_build
      - run:
          name: ls
          command: ls -la
      - persist_to_workspace:
          root: . # workspace의root패스(.을 적어주면 working_directory의 설정을 그대로 따르게됨)
          paths:
            - . # 공유할 패스

  test:
    working_directory: /src
    docker:
      - image: buildpack-deps:xenial
    steps:
      - attach_workspace: # 위에서 지정한workspace를 attach해줌
          at: .
      - run:
          name: pwd
          command: pwd
      - run:
          name: ls
          command: ls -la
          
workflows:
  version: 2
  build_and_test: # workflow名
    jobs:
      - build
      - test:
          requires:
            - build          
```          
    
    
![image](https://user-images.githubusercontent.com/4640346/38484984-4f0a6d6e-3c13-11e8-951c-2bcbf417e43b.png)

다시실행해보면 `Persisting to Workspace`라는 항목이 생긴걸 알 수 있음.


![image](https://user-images.githubusercontent.com/4640346/38485044-755ae2aa-3c13-11e8-8a6f-935b4136573c.png)

test job 에서도  build job에서 checkout한 코드와 touch커맨드로 만든 test_build파일을 확인가능 



#### 옵션 정리

```
persist_to_workspace: 지정한 패스의 데이터를 일시적으로 보관해줌
attach_workspace: 보관한 데이터를 보여주게 해줌
```



### 다른 사용예1)

```
build:
  steps:
    ===생략===
    - persist_to_workspace:
        root: ~/job-medley
        paths:
          - ./*

deploy_qa:
  <<: *defaults
  steps:
    - attach_workspace:
        at: ~/job-medley
```

### 다른 사용예2)


```
defaults: &defaults
  working_directory: /tmp
  docker:
    - image: buildpack-deps:jessie

version: 2
jobs:
  flow:
    <<: *defaults
    steps:
      - run: mkdir -p workspace
      - run: echo "Hello, world!" > workspace/echo-output
      
      # Persist the specified paths (workspace/echo-output) into the workspace for use in downstream job. 
      - persist_to_workspace:
          # Must be an absolute path, or relative path from working_directory. This is a directory on the container which is 
	  # taken to be the root directory of the workspace.
          root: workspace
          # Must be relative path from root
          paths:
            - echo-output

  downstream:
    <<: *defaults
    steps:
      - attach_workspace:
          # Must be absolute path or relative path from working_directory
          at: /tmp/workspace
```

https://circleci.com/docs/2.0/workflows/#using-workspaces-to-share-data-among-jobs
          