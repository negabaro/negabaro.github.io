# joins

```
User.joins(:posts).where(posts: { id: 1 })
# SELECT `users`.* FROM `users` INNER JOIN `posts` ON `posts`.`user_id` = `users`.`id` WHERE `posts`.`id` = 1
```

어소시에이션 캐쉬를 안함.

デフォルトで INNER JOIN を行う。LEFT OUTER JOIN を行いたい時は left_joins を使う。
他の 3 つとの違いは、association をキャッシュしないこと。
association をキャッシュしないので eager loading には使えないが、ActiveRecord のオブジェクトをキャッシュしない分メモリの消費を抑えられる。

なので、JOIN して条件を絞り込みたいが、JOIN するテーブルのデータを使わない場合は joins を使うのが良い。
User.joins(_).where(posts: {_})とか User.joins(_).merge(Post._)みたいに使う。

# eager_load

```
User.eager_load(:posts)
# SELECT `users`.`id` AS t0_r0, `users`.`name` AS t0_r1, `users`.`created_at` AS t0_r2, `users`.`updated_at` AS t0_r3, `posts`.`id` AS t1_r0, `posts`.`user_id` AS t1_r1, `posts`.`created_at` AS t1_r2, `posts`.`updated_at` AS t1_r3 FROM `users` LEFT OUTER JOIN `posts` ON `posts`.`user_id` = `users`.`id`
```

```
User.eager_load(:posts).where(posts: { id: 1 })
# SELECT `users`.`id` AS t0_r0, `users`.`name` AS t0_r1, `users`.`created_at` AS t0_r2, `users`.`updated_at` AS t0_r3, `posts`.`id` AS t1_r0, `posts`.`user_id` AS t1_r1, `posts`.`created_at` AS t1_r2, `posts`.`updated_at` AS t1_r3 FROM `users` LEFT OUTER JOIN `posts` ON `posts`.`user_id` = `users`.`id` WHERE `posts`.`id` = 1
```

지정한 association를LEFT OUTER JOIN을 캐쉬한다
쿼리 숫자가 하나일경우 preload보다 빠름
JOIN하기 때문에 preload랑 다르게 joins와 같이 테이블 시보리코미가 가능

指定した association を LEFT OUTER JOIN で引いてキャッシュする。
クエリの数が 1 個で済むので場合によっては preload より速い。
JOIN しているので、preload と違って、joins と同じように JOIN したテーブルで絞込ができる。

# preload

```
User.preload(:posts)
# SELECT `users`.* FROM `users`
# SELECT `posts`.* FROM `posts` WHERE `posts`.`user_id` IN (1, 2, 3, ...)
```

```
User.preload(:posts).where(posts: { id: 1 })
# SELECT `users`.* FROM `users`  WHERE `posts`.`id` = 1
# => Mysql2::Error: Unknown column 'posts.id' in 'where clause': SELECT `users`.* FROM `users`  WHERE `posts`.`id` = 1
```

지정한 association을 복수의 쿼리를 나눠서 캐쉬
指定した association を複数のクエリに分けて引いてキャッシュする。
複数の association を eager loading するときとか、あまり JOIN したくないでかいテーブルを扱うときは preload を使うのがよさそう。
preload したテーブルによって絞り込もうとすると、例外を投げる

# includes

```
User.includes(:posts)
# SELECT `users`.* FROM `users`
# SELECT `posts`.* FROM `posts` WHERE `posts`.`user_id` IN (1, 2, 3, ...)
```

```
User.includes(:posts).where(posts: { id: 1 })
# SELECT `users`.`id` AS t0_r0, `users`.`name` AS t0_r1, `users`.`created_at` AS t0_r2, `users`.`updated_at` AS t0_r3, `posts`.`id` AS t1_r0, `posts`.`user_id` AS t1_r1, `posts`.`created_at` AS t1_r2, `posts`.`updated_at` AS t1_r3 FROM `users` LEFT OUTER JOIN `posts` ON `posts`.`user_id` = `users`.`id` WHERE `posts`.`id` = 1
```

includes したテーブルで where による絞り込みを行っている
includes した association に対して joins か references も呼んでいる
任意の association に対して eager_load も呼んでいる
のうちいずれかを満たす場合、eager_load と同じ挙動(LEFT JOIN)を行い、
そうでなければ preload と同じ挙動(クエリを分けて実行)をする。
絞り込みが必要な時に例外を投げず eager_load に fallback する preload。




| 메소드        | 캐쉬  | 쿼리    | 용도             |
| ---------- | --- | ----- | -------------- |
| joins      | O   | 단수    | 시보리코미          |
| eager_load | X   | 단수    | 캐쉬와 시보리코미      |
| preload    | X   | 복수    | 캐쉬             |
| includes   | X   | 상황에따라 | 캐쉬,필요에따라 시보리코미 |


#### Reference Link:

```
https://qiita.com/ostk0069/items/23beb870adf785506be2
https://qiita.com/k0kubun/items/80c5a5494f53bb88dc58
```
