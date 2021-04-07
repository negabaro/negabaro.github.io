しかし、下記の理由からgroupメソッドを単体で使ってもほとんど意味がありません。

groupメソッドで指定したカラムのデータをまとめても、まとめただけで終わっていてまとめたデータを元に集計していないから。

groupでまとめる用途で、最も小さいIDのレコードの全カラム情報を必要とするケースがほとんどないため。

ですからgroupメソッドは単体で使うのではなく、countメソッドやsumメソッドなどの集計メソッドと併用して使います。



whereとhavingの挙動の違いについては理解できたでしょうか？
下記の表にwhereとhavingの違いについてまとめたので
状況に応じてwhereとhavingを使い分けられるようにしておきましょう。

where	having
groupの前に実行される	groupの後に実行される
条件で絞り込まれたレコードに対して
データをまとめたい場合	groupでまとめられたデータに対して
条件を指定してデータを絞り込みたい場合

COUNT(*) した結果で絞り込む方法

Havingを使う

Hoge.group(:user_id).having('count(*) > ?', 5).count


# join group - Job.group(:name).count vs User.joins(:job).group("jobs.name").count



https://pikawaka.com/rails/group