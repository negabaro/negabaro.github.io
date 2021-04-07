## DCI (data context interaction)

fat model을 방지하는 용도로 많이 알려짐

각 용도별로 파일을 나누고 해당기능을 사용할때 include하는 방식으로 바꿔서 fat model을 방지


http://dodemoyoiblog.blogspot.com/2012/09/dci-data-context-interaction.html
https://www.artima.com/articles/dci_vision.html
https://qiita.com/rosylilly/items/8d2b6e47550c50975241
https://stackoverrun.com/ko/q/2539303



### dci decorator

The DCI Architecture でもデータモデルは時間が経っても比較的安定しているという経験則と照らしあわせて、

We must separate simple, stable data models from dynamic behavioral models.

と述べています。
DCI では Scala の Trait を用いた例でデータクラスにロール(ロジック)を割り当てていますが、これを Ruby で行うのが「2」の方法になります。

View のロジックを分離した時と同様に decorator か Object#extend で分離したファイルにロジックを定義する

https://qiita.com/kbaba1001/items/e265ad1e40f238931468