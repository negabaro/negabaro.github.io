
---
layout: post
title:  "rails6 Concreate Class Inheritance(구상클래스 상속)이란?"
description: 
author: negabaro kim
tags:	rails rails/model
---


각 클래스간에 공통 컬럼이 있고
추상적으로 부모 자식관계를 가질 수 있지만

각 클래스간에 공통컬럼을 각각 정의해놓은 상태를 구상클래스 상속이라 말함.




# Concreate Class Inheritance(구상클래스 상속)


# 장점

# 단점

# 비교 대상으로 Class Table Inheritance이나 STI가 있다.

長所
論理的なレコード全体を取得するのにジョイン不要
STIにおけるNOT NULL制約の問題が発生しない
NULLの発生を抑制できる
テーブルが肥大化しにくい
短所
具象サブクラスが増えるとテーブルも増える
スーパークラスの共通属性にユニーク制約を適用できない
ユニーク制約は複数のテーブルをまたがれないので、そのようなユニーク性はアプリケーションで保証する必要がある
例におけるcode列
別テーブルの外部キー制約で参照できるのは単一の具象クラスのみ
外部キー制約は単一のテーブルしか参照できないので、複数の具象クラスを参照できる場合には実装できない
スーパークラスの共通属性をキーとするクエリーでは、全ての具象クラステーブルを検索する必要がある
RailsではCustomer.whereなど、スーパークラスのクエリーメソッドを自前で実装する必要がある

https://qiita.com/yebihara/items/9ecb838893ad99be0561