---
layout: post
title:  "rails 논리삭제와 물리삭제에 대해"
author: negabaro kim
tags:	rails/model
---


Rails에 국한되는 얘기는 아니지만  물리삭제와 논리삭제에 대해 알아보자.


## 물리삭제란?

`Physical Delete`라 한다.

실제 데이터가 DELETE되어서 데이터베이스에서 사라지는것을 의미한다.

시스템상에서 복구하는 방법은 없다.(DB 롤백하거나 DELETE된 데이터를 찾아서 다시 INSERT하는 방법뿐)


## 논리삭제란?

`Logical Delete`혹은 `Soft Delete`라고도 한다.

실제 데이터를 삭제하지 않고 유저에게 삭제한것 처럼 보이게 하는 방식이다.

해당 컬럼에 논리삭제를 식별하는 플래그를 설정해 해당 플래그가 ON일 경우 유저에게 보여지게 않게 하는 식이다.

## 논리삭제의 장점

1. 실수로 삭제한 데이터를 간단히 복구가능(플래그만 돌려주면 됨)
2. 삭제한 데이터를 참조 가능(관리화면이라든지)


## 단점

1. 물리삭제보다 처리가 복잡
2. 데이터를 보여줄때 반드시 where문으로 조건분기가 필요
3. 데이터양이 많아져서(삭제없이 계속 쌓여가므로)용량제한/퍼포먼스 저하 문제가 될 가능성이 있음


## 논리삭제 사용예


전반적으로 의존관계에가 복잡한 경우 논리삭제를 많이사용 한다.

### 예1.  회원삭제

회원삭제후 잘못눌렀다 복귀해줘!! 라든지 회원에게 의존된 데이터들이 user_id: null이 되어서 문제가 일으킬 경우가 높으므로 

### 예2. EC서비스의 상품테이블 -> 주문 테이블

주문 테이블은 상품테이블에 의존되므로 상품테이블을 물리삭제하면 주문 테이블에 영향이 있을 수 있기때문


## Rails에서의 논리삭제

[discard]와[paranoia]라는 gem을 이용해 논리삭제 구현을 많이하는데 [discard]가 대세이다.

[paranoia]의 도큐멘트를 보면

> paranoia has some surprising behaviour (like overriding ActiveRecord's delete and destroy) and is not recommended for new projects. See discard's README for more details.
> Paranoia will continue to accept bug fixes and support new versions of Rails but isn't accepting new features.

새 프로젝트에서는 [discard]를 쓰라고 유도하고 있다.

[discard]의 사용방법은 별도 다른 포스트에서 소개할 예정이다.

---

[discard]: https://github.com/jhawthorn/discard
[paranoia]: https://github.com/rubysherpas/paranoia

[Rails - Discardを使って論理削除を実装する方法]: https://qiita.com/ryujignh/items/18bb2a868bbb232d1a07
[削除機能の設計(物理削除とは/論理削除とは)]: https://qiita.com/shukan0728/items/1a7b2db01ae25f8f7f88