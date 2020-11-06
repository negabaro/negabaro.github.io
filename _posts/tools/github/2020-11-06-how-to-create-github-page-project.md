---
layout: post
title:  "project별 github pages 공개하는 방법"
tags: tools/github
---

# 개요

이 포스트에서는 project별 github page를 공개하는 방법에 대해 알아보자.

# github pages 공개방법

## 1. 리포지토리 root에 index.html 작성

내용은 뭐든지 상관없다.

## 2. github에 push

gh-pages브랜치 작성후 push하라는 글도 많았는데 master에 push해도 상관없다.

## 3. 동작확인

늦어도 5분이내에 아래 url로 접속이 가능했다.


`https://깃허브아카운트.github.io/리포지토리명`

예를들어 clip-youtube라는 리포지토리에 github아카운트가 negabaro라면 아래와 같은 url이다.

`https://negabaro.github.io/clip-youtube/`

※깃허브 아카운트명이 대문자인경우 소문자로 변환되어진다고 한다.


# 메모

## gh-pages가 아니어도 가능

다른 포스트보면 gh-pages에 push해야한다고 나오지만 `settings -> source -> branch선택`
에서 master를 선택하면 gh-pages가 아니어도 정상작동했다.


## root에 index.html이 없으면

root에 index.html이 없으면 README.md를 표시해준다.

## root 디렉토리 이외에 있는 index.html을 읽어오는 법

`settings -> source -> dir선택` 에서 docs디렉토리를 선택하면 docs이하에 있는 index.html을 참조한다.


[![Image from Gyazo](https://i.gyazo.com/83d6f79281ec6668b4250b87c5d32e03.gif)](https://gyazo.com/83d6f79281ec6668b4250b87c5d32e03)

테스트는 못해봤지만 docs이외에도 동작하는듯..?


### reference:

[Link](https://www.tam-tam.co.jp/tipsnote/html_css/post11245.html)
