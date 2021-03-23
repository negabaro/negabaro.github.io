

ディープコピーではなく、シャローコピー
浅いコピーと深いコピー

## = 에 의한 복제

shallow-copy,deep-copy와 관계없이 =에 의해 오브젝트를 복제하면 이름만 틀릴뿐 실제 데이터는 같은곳은 보고 있게됨.
그러므로 destructive(파괴적)메소드를 실행하게 되면 양쪽에 영향을 미치게 됨(실제 데이터가 변경되었기에)

이하 예제를 보자.

```
origin = "10000원"
=> "10000원"

copy = origin
=> "10000원"

origin.equal? copy
=> true

copy.gsub!("10000원", "5000원")
=> "5000원"

origin
=> "5000원"
```

10000원이라는 값을 가진 origin을 copy변수에 대입후
destructive(파괴적)메소드를 사용해서 copy변수의 10000원을 5000원으로 바꾸면
실제 값이 바뀌게 되므로
copy뿐만이 아니라 origin도 10000원값이 5000원으로 바뀌어져 있는걸 알 수 있다.

## Shallow Copy(dup과clone)

ruby의dup,clone메소드를 사용하면 ShallowCopy를 실행 시킬 수 있음.

https://ref.xaio.jp/ruby/classes/object/clone

### dup메소드

origin_arr = ["hoge", "fuga"]
=> ["hoge", "fuga"]

dup_arr = origin_arr.dup
=> ["hoge", "fuga"]

dup_arr.first.gsub!("hoge", "piyo")
=> "piyo"

dup_arr
=> ["piyo", "fuga"]

origin_arr
=> ["piyo", "fuga"]

### clone메소드

clone_arr = origin_arr.clone
=> ["piyo", "fuga"]

clone_arr.first.gsub!("piyo","hoge")
=> "hoge"

clone_arr
=> ["hoge", "fuga"]

origin_arr
=> ["hoge", "fuga"]

上記の通り、浅いコピーによって生成したオブジェクトに対して破壊的メソッドを実行した場合、元のオブジェクトに対しても変更が及んでしまいます。危険だ。
一見=と似たように見えますが、その違いはオブジェクトそのものは異なるが、それより深い部分は同じものを参照しているということ。これが「浅い」という言葉の所以です。

深いコピーを実現するためには
人間生きていれば深いコピー、つまりオリジナルと分離した完全なる複製を生成したい時がある。そういうときにどうしたらいいか。以下の 3 つの方法があるようです。

1. deep_dup メソッドを使う(要 activesupport)
   深いコピーを複製してくれるメソッドです。これは ruby にはないメソッドなので、activesupport を require しないと使えないことに留意してください。


---

そのうちに、「dupでもコピーされない！」と思う時がきっと来るの、そのときは、
「Ruby ディープコピー」で検索してみて下さい。
dupやcloneメソッドでは、ディープコピーではなく、シャローコピーを行います。



fruits = ["apple", "orange", "banana", "kiwi", "banana"]
kk = fruits
p kk.delete("banana")
p fruits
p kk
rubyでこのコードを実行すると以下のように出力されます。


"banana"
["apple", "orange", "kiwi"]
["apple", "orange", "kiwi"]


fruits のarray値をkkに渡して
kk.deleteをしたにも関わらず
fruitsの値も変わってるのですが、、
これは仕様ということですか？

rubyのバージョンは 2.0です。

Arrayの値を消して消す前の状態を保存するためにもどのようにコードを書きますか？

### Reference Link:

https://qiita.com/mojihige/items/7b0a36b595273e70812d

https://qiita.com/ricoirico/items/5cfcac1b8e67184641f1
https://ref.xaio.jp/ruby/classes/object/clone
https://ja.stackoverflow.com/questions/27101/ruby%E3%81%AEclone%E3%81%A8dup%E3%81%A8activerecord%E3%81%AEclone%E3%81%A8dup%E3%81%AF%E5%88%A5%E7%89%A9


[teratail 내가질문한거]: https://teratail.com/questions/21332

[新人エンジニアがはまるかもしれないrubyの浅いコピーと深いコピーともろもろ背景]: https://qiita.com/sue738/items/92228f0ae0518bf0a693