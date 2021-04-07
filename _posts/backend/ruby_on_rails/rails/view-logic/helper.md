뷰에서 로직을 정의할때 가장 원초적인 방법으로 helper가 있음


그런데 helper는 특정뷰가 아닌 전체에서 사용가능하므로 스코프를 지정할 수 없는 문제가..



그래서 
config/application.rb で

config.action_controller.include_all_helpers = false
이렇게하면 특정 helper만 view에서 사용이가능하게끔 할 수 있음.

---


View に表示するテキストの整形などの理由により、 View だけで必要となるロジックがあります。
View に直接ロジックを書くとテストしづらくなるため、Helper にロジックを書きます。
Helper はデフォルトではすべてのファイルが読み込まれてしまいますが、 config/application.rb で

config.action_controller.include_all_helpers = false
を設定することで特定の Helper だけを View で使用できます。

とはいえ、 Helper は単に View からアクセスできるメソッドを定義できるだけなので少々不便です。

