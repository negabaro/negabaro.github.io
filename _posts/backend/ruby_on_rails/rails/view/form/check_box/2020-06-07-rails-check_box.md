check_box の書き方
check_boxの書き方は以下の通りです。

= check_box :group, :user_ids, {class: "check_box"}, true, false
リファレンスによると、

check_box(オブジェクト名, プロパティ名 [, オプション, checked_value = "1", unchecked_value = "0"])
という構造になっているようで
第１引数（オブジェクト名）・・・データを保存したいモデル名
第２引数（プロパティ名）・・・データを保村したいカラム名
第３引数（オプション）・・・クラス名など。色々入ります。（詳しくはこちら）
第4引数、第5引数・・・まだ調べが足りていないのですが、チェックが入っている時のvalueを1にするか否か、チェックが入っていない時のvalueを0にするか否かの設定だと思います。
ちなみに、check_boxではなく、f.check_boxの形にすると（つまり、form_withやform_forの中で使うと、第１引数（オブジェクト）が省略できるようです。

form_withやform_forの中で、関連するモデルは定義していますものね。。。

labelの具体的な書き方は今回はわからなかったので、また後日実装の機会があれば加筆します！

https://qiita.com/tanutanu/items/b86c4adc26ae464c71fd