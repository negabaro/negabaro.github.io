Rails の find_each がどんな挙動をするか気になったので調べてみた。

find_each とは
バッチ処理などにおいて ActiveRecord で効率的に大量データを処理したいときに使うメソッド。大量データまるっと全部取ってきてメモリ展開して処理しちゃあアカンよねってことで、データを徐々に展開して処理したいときに使う。

Rails には find_each というメソッドが用意されています。通常の each メソッドを使用すると、全データをまとめてメモリに展開してから処理を開始します。そのため、十分にメモリに載るデータ量であれば何も問題ないですが、数百万、数千万というデータ量になってくるとメモリに載りきらずに溢れてしまって大変なことになります。

find: 全データをメモリに展開してから処理
find_each: 少しずつデータをメモリに展開しつつ処理
そういうときには find_each メソッドを使いましょう。

素の find_each
まずは User テーブルに 1 万件くらいデータを作って素直に find_each してみる。

```
> User.find_each{|a|}
> User Load (2.7ms) SELECT `users`._ FROM `users` ORDER BY `users`.`id` ASC LIMIT 1000
> User Load (2.6ms) SELECT `users`._ FROM `users` WHERE (`users`.`id` > 1001) ORDER BY `users`.`id` ASC LIMIT 1000
> User Load (4.7ms) SELECT `users`.\* FROM `users` WHERE (`users`.`id` > 2001) ORDER BY `users`.`id` ASC LIMIT 1000
> ...
```

> デフォルトでは ORDER BY id で全件取得して 1000 件ずつ分割(limit 1000)して処理していくようなかたち。

order 付き find_each
では order を付けて find_each したらどうなるのだろう？

```
> User.order(created_at: :desc).find_each{|a|}
Scoped order and limit are ignored, it's forced to be batch order and batch size
  User Load (3.8ms)  SELECT  `users`.* FROM `users`  ORDER BY `users`.`id` ASC LIMIT 1000
  User Load (3.0ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 1001)  ORDER BY `users`.`id` ASC LIMIT 1000
  User Load (2.3ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 2001)  ORDER BY `users`.`id` ASC LIMIT 1000
  ...
```

Scoped order and limit are ignored ということで order と limit は無視されるようです。

limit 付き find_each
じゃあ limit も試してみよう。

```
> User.limit(2000).find_each{|a|}
Scoped order and limit are ignored, it's forced to be batch order and batch size
  User Load (3.0ms)  SELECT  `users`.* FROM `users`  ORDER BY `users`.`id` ASC LIMIT 1000
  User Load (3.5ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 11003)  ORDER BY `users`.`id` ASC LIMIT 1000
  User Load (3.4ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 12003)  ORDER BY `users`.`id` ASC LIMIT 1000
  ...
```

やっぱりワーニングメッセージが出て無視された。

where 付き find_each
where を使って処理対象に条件を付けることもできます。

```
> User.where(notes: "1").find_each{|a|}
  User Load (4.3ms)  SELECT  `users`.* FROM `users` WHERE `users`.`notes` = '1'  ORDER BY `users`.`id` ASC LIMIT 1000
  User Load (4.8ms)  SELECT  `users`.* FROM `users` WHERE `users`.`notes` = '1' AND (`users`.`id` > 11955)  ORDER BY `users`.`id` ASC LIMIT 1000
  User Load (4.9ms)  SELECT  `users`.* FROM `users` WHERE `users`.`notes` = '1' AND (`users`.`id` > 13954)  ORDER BY `users`.`id` ASC LIMIT 1000
  User Load (4.7ms)  SELECT  `users`.* FROM `users` WHERE `users`.`notes` = '1' AND (`users`.`id` > 18067)  ORDER BY `users`.`id` ASC LIMIT 1000
  ...
```

### Reference Link:

```
https://blog.toshimaru.net/rails-find_each/
```
