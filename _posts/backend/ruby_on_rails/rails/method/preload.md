# preload

쿼리 캐쉬를 사용

## xx

preload는 지정한 어소시에이션을 복수의 쿼리에 나눠서 캐쉬한다
복수의 쿼리로 나누는 부분은 통상적인 방법과 차이가 없지만 마스터 데이터등 공통으로 사용한 데이터에 대해서는
JOIN하지 않고 캐쉬

그리고 preload한 테이블에 대해서 더 좁히면 예외를 던진다

クエリーキャッシュを使用する

上記を実現するために preload を使用します。
preload は、指定したアソシエーションを複数のクエリ(SELECT 文)に分けて引いてキャッシュする。
複数のクエリに分けるところは従来と変わりませんが、マスターデータなど、共通して使用するデータについては、
JOIN せずにキャッシュしたほうが良いでしょう。

また、preload したテーブルに対して絞り込みを行うと、例外を投げます。

```
preload(*args) public
Allows preloading of args, in the same way that includes does:

User.preload(:posts)
=> SELECT "posts".* FROM "posts" WHERE "posts"."user_id" IN (1, 2, 3)
```

### Reference Link:

```
https://texta.pixta.jp/entry/2016/02/10/180244
```
