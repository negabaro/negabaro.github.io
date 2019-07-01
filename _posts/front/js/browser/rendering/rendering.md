---
layout: post
title: "xx"
author: negabaro kim
categories: js
tags: js
---

# 브라우저 렌더링의 순서

각 프레임마다 브라우저는 이하와 같은 공정을 순서대로 실행함.

`1. Parse -> 2. Style -> 3. Layout -> 4. Paint -> 5. Composite`

![image](https://user-images.githubusercontent.com/4640346/55057387-6c1dcc80-50ac-11e9-91a7-b613a709b081.png)

초기 렌더링시는 무조건 위 순서대로 실행되고

`화면에 표시할 내용에 변경이 생겼을 경우, 변경 내용에 해당하는 공정만 처리하고 재계산이 불필요한 공정은 생략함.`

브라우저의 퍼포먼스 개선을 위해서는 변경내용이 어떤 공정에 해당하는지 파악하는것이 중요함

# 1. Parse

이 공정에서는 HTML과CSS를 분석해서 각각의 `DOM Tree`와 `Style Rules`라고 하는 처리가 용이한 구조체로 변환하는 작업을 실행한다.

## 1-1. DOM Tree작성

![image](https://user-images.githubusercontent.com/4640346/55054410-1b55a600-50a3-11e9-87d0-e32b7045d50f.png)

## 1-2. Style Rules작성

![image](https://user-images.githubusercontent.com/4640346/55054417-24df0e00-50a3-11e9-9df3-42dd1d06b35a.png)

# 2. Style

이 공정에서는 1번(Parse)에서 작성한 `DOM Tree`와 `Style Rules`을 연결해주는 작업을 실행한다.

구체적으로는 어떤 스타일이 어떤 요소에 적용될것인가를 매칭하고, 복수개의 스타일이 일치하는 요소에 관해서는 스타일 적용의 우선순위에 따라서 최종적으로 적용할 스타일을 산출해낸다.

![image](https://user-images.githubusercontent.com/4640346/55054454-4cce7180-50a3-11e9-8a9f-0691661387ea.png)

여기서 나온 스타일과 요소의 매칭을 `Render Tree`라고 부름.

그리고 `Render Tree`의 각요소는 `Renderer`라고 부른다.

Javascript를 이용한 DOM조작,CSS프로퍼티의 변경이 일어났을때 기본적으로 이 공정이 실행된다.

# 3. Layout

이 공정에서는 각 요소의 위치와 크기의 계산을 한다.
이 처리는 `Layout` 또는 `Reflow`라고도 불린다.

Layout의 계산은 `Render Tree`를 위에서 아래로 재귀적으로 실행하고, 위치와 크기의 정보를 고려한 `Layout Tree`를 작성한다.

![image](https://user-images.githubusercontent.com/4640346/55054525-8dc68600-50a3-11e9-83ef-713fd63d3650.png)

이 공정은 Javascript에 의해 위치,크기가 변경되었을 경우, 혹은 이하 프로퍼티에 영향을 주는 변경이 일어났을 경우 불려지게 된다.

#### Layout처리에 관련된 프로퍼티

```js
height, width, padding, margin, top, right, left, bottom, box - shadow등;
```

특히 이 공정은 처리가 무겁기 때문에, 가능한 이 공정에 관련한 프로퍼티는 변경하지 않도록 할 필요가 있다.(에니메이션 포함해서)

# 4. Paint

Paint Records의 작성과 `Layer Tree`의 작성을 실행함

## Paint Records の作成

Paint 공정에서는 화면상에

の工程では画面上への描写指示の作成を行います。이것을 Paint Records라고 부름. Paint Records의 순번은 화면상에서 요소의 の順番は画面上での要素の重なりを考慮します。

![image](https://user-images.githubusercontent.com/4640346/55054619-dc742000-50a3-11e9-926b-281f060bfc5f.png)

# Layer Tree の作成

同時に Layer Tree（レイヤーツリー）を作成します。Layer の分離は変更の際の計算量を少なくするために大変有効です。レイヤーを分離して他の要素を考慮しないでよい状態にしておくと、変更があった際に、そのレイヤーのみ再計算を行えばよいことになり、計算量を大幅に削減することができます。
![image](https://user-images.githubusercontent.com/4640346/55054622-e1d16a80-50a3-11e9-822c-4566f19eae6d.png)
Layer Tree のレイヤーを分離する条件は先程の要素の重なり（z-index）とは関係がありません。3D トランスフォーム（transform: translateZ(0)）や transform を使用したアニメーションを検知した際にブラウザは Layer を分離します。また、will-change を使用した場合にも Layer は分けられます。これが will-change のアニメーション高速化の理由です。

# 5. Composite

前工程までは Main Thread で行われますが、この工程は Main Thread とは別の Compositor Thread(コンポジタースレッド)で処理されます。

ラスタライズと合成レイヤーの実行
まず先程作成した各レイヤーにラスタライズ処理(ビットマップ化)を行います。この処理は計算量が多いため、Raster Thread(ラスタースレッド)に代行されます。Raster Thread は合計４つ用意されており、平行して処理を行います。ラスタライズが完了したレイヤーは一つの合成レイヤーにまとめられ最終的に GPU に渡され画面に表示されます。

![image](https://user-images.githubusercontent.com/4640346/55054633-e9910f00-50a3-11e9-834c-babffb0bba6f.png)

アニメーションによく利用される transform、opacity の適用もこの工程で行われます。そのため transform, opacity の変更はレイアウトプロパティー(left,top など)の変更に比べて、軽い処理となります。

Composite に関係の深いプロパティー

```
transform, opacity
```

レンダリングエンジンとプロパティー
このレンダリングの工程とプロパティーの関係はレンダリングエンジンによって変わってきます。例えば、Chrome の採用している Blink では、transform プロパティーは Composite 処理のみに関係しますが、Safari の Webkit の場合、Layout から関係してきます。そのため、Chrome では問題ないアニメーションが Safari の場合にはカクつく場合があります。

CSS プロパティーとレンダリングエンジンの関係は CSS Triggers で確認できます。
CSS Triggers

# まとめ

レンダリングの工程を知ると、アニメーションに使用するべき CSS プロパティーがわかってきます。まず、レンダリングを快適にするには Layout の工程をなるべくさけ、Composite のみで完結する transform, opacity の利用が重要です。また、Layout や Paint に関わる処理は will-change を適宜使いレイヤーを分けることによりパフォーマンスを向上しましょう。

あとがき
こちらの記事では一部内容を簡略化して説明させていただきました。もっと詳しく知りたいかたはブログで公開していますので、そちらの記事を御覧ください。

### Reference Link:

https://qiita.com/Leapin_JP/items/caed57ec30d638e40728
https://leap-in.com/ja/lets-learn-how-to-browser-works/
https://d2.naver.com/helloworld/59361
https://12bme.tistory.com/140
https://isme2n.github.io/devlog/2017/07/06/browser-rendering/
