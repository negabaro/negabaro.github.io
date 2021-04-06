---
layout: post
title:  "Flutter버전관리툴 fvm에 대해 알아보자."
tags: flutter
---


## fvm이란

Flutter SDK의 버전관리툴 이다.

ruby의 rvm,rbenv python의 pyenv,
node.js의 nvm와 같은 역할이다.

fvm으로 검색하면 2개의 리포지토리가 있는데 star수가 많은 [fvm github]를 사용하자.


## fvm install방법

아래 커맨드로 인스톨이 가능하다.

```
$ pub global activate fvm
or
$ flutter pub global activate fvm
```

## path설정

~/.bashrc에서 아래 설정을 추가해줬다.

```
export PATH="$PATH":"$HOME/development/flutter/.pub-cache/bin"
```

```bash
which fvm
/Users/sehwakim/development/flutter/.pub-cache/bin/fvm
```

## fvm을 이용해서 Flutter SDK인스톨

이번에는 fvm을 이용해 1.17.5버전의 Flutter SDK를 인스톨해봤다.

커맨드는 아래와 같다.

```
fvm install 1.17.5
fvm use 1.17.5
```

각 커맨드의 의미는 아래에서 설명


## fvm 커맨드 사용방법

### fvm releases

인스톨 가능한 버전리스트 확인이 가능

### fvm list

현재 인스톨되어 있는 버전리스트 확인이 가능

```
fvm list
Versions path:  /Users/xx/fvm/versions
2.0.3
1.17.5
```

### fvm install <version>

특정버전을 fvm에 인스톨


### fvm use <version>


flutter프로젝트내에서 사용할 flutter버전을 지정가능




---

## fvm use커맨드에 대해

flutter 프로젝트내에서 `fvm use <version>`를 실행하면

루트 디렉토리 하위에 `./fvm`파일이 생성된다.

`./fvm`하위에는 `.fvm/fvm_config.json`과 `.fvm/flutter_sdk`가 생성된다.


### `.fvm/flutter_sdk`

`.fvm/flutter_sdk`부분은 fvm install <version>에 의해 인스톨된 디렉토리와 심볼릭 링크가 되어있다.

mac의 경우 `/Users/xxxx/fvm/versions/<version>`에 인스톨되어 있을것이다.

필자의 환경은 아래와 같이 되어있었다.

```
ls -ld .fvm/flutter_sdk
lrwxr-xr-x  1 sehwakim  staff  35 Apr  6 12:36 .fvm/flutter_sdk -> /Users/sehwakim/fvm/versions/1.17.5
```

### `.fvm/fvm_config.json`

`.fvm/fvm_config.json`은 아래와 같이 사용하는 버전이 지정되어있다.

```
cat .fvm/fvm_config.json 
{
  "flutterSdkVersion": "1.17.5"
}
```


## VSCode사용시

VSCode사용시 `.vscode/settings.json`에 아래 설정을 추가해주면 fvm을 경유해서 flutter실행이 가능하다.(VSCode재기동이 필요)

```
{
  "dart.flutterSdkPaths": [".fvm/flutter_sdk"]
}
```



## `--force`옵션 활용


생성한 프로젝트에 버전을 지정하는것은 위에서 설명한 방법으로 가능한데 새롭게 프로젝트 생성시 버전은 어떻게 지정이 가능할까

--force커맨드를 이용하면 Flutter Project이외에서 사용이 가능하므로 `--force`로 사용한 버전을 지정한후 `flutter create .`를 실행해주면 된다.

```
$ mkdir sample_project
$ cd sample_project
$ fvm use <version> --force
$ fvm flutter create .
```



## 메모


### dart path지정

사실 dart를 사용하기 위한 path설정도 필요한데 `path설정`에서 ~/.bashrc에 넣은

```
export PATH="$PATH":"$HOME/development/flutter/.pub-cache/bin"
```

설정으로 dart path설정도 적용되어있다.

만약에 프로젝트마다 dart 버전도 바꾸고 싶은경우 위 설정을 바꿔줄 필요가 있다.

----



[fvm github]: https://github.com/leoafarias/fvm

[Flutterのバージョン管理ツールfvmを試してみる]: https://qiita.com/Slowhand0309/items/0767abee120fcb3ba0b4

[fvmを使ってFlutter SDKのバージョンを切り替える]: https://qiita.com/Kurusu_ima/items/2dfd067f6e79f520198f#:~:text=fvm%E3%81%A8%E3%81%84%E3%81%86Flutter%20SDK%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3,%E3%81%AB%E5%BD%B9%E7%AB%8B%E3%81%A4%E3%81%A8%E6%80%9D%E3%81%84%E3%81%BE%E3%81%99%E3%80%82
