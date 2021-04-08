---
layout: post
title:  "Finite Automaton(유한 상태 기계)란?(with. Rails)"
author: negabaro kim
tags:	rails
---


## Finite Automaton(유한 상태 기계)이란?

일본어로 `有限オートマトン`라고 한다.

상태를 나타내는 모델을 의미하고 플로우 차트같은 상태전이표(?)로 표현이 가능하다.

소프트웨어 엔지니어 뿐만 아니라 하드웨어쪽에서도 범용적으로 쓰이는 언어인것 같다.

아래와 같은 상태전이표로 표현한다.


`상태전이표`라는 말이 실제 써본적이 없어 어색하므로 이 포스트에서는 `플로우 차트`라고 쓰겠다.


![image](https://user-images.githubusercontent.com/4640346/113985575-4759b380-9887-11eb-9e4e-da3b7ed9408a.png)



## Rails에서 플로우차트 구현

아래와 같은 gem들로 플로우 차트 구현이 가능하다.

```
gem 'draw_erd'
gem 'draw_smd'
gem 'state_machine'
gem 'ruby-graphviz'
```

`Finite Automaton`자체의 구현은 aasm이나 staeful_enum을 이용해 구현 가능

staeful_enum에 대해서는 [Rails 상태관리 gem StatefulEnum 소개]를 참조

---

[Rails 상태관리 gem StatefulEnum 소개]: https://negabaro.github.io/archive/rails-gem-stateful_enum

[2장 FINITE AUTOMATA]: https://invincibletyphoon.tistory.com/27
[オートマトンと言語」ざっくりまとめ]: https://qiita.com/frost_star/items/c8562e975ee0593cce2e
[Rails の 有限オートマトン]: https://qiita.com/ogomr/items/0dd9df4f340ee83b8f66