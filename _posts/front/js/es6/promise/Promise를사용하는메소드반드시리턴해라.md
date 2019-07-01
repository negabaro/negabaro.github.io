Mocha のテストのために Promise は関数の返り値として return で返す
ところで、私は関数内で Promise を返すつもりで、Promise の結果を return してしまいました。
このように関数内で Promise を return すると、Promise のテストが書けます。
最近の Mocha の assert メソッドは、Promise の結果が return される事がわかってる場合、その結果が返ってくるまで待ってくれます。
なので、必ず Promise を返すメソッドは return しましょう。
http://efcl.info/2014/0314/res3708/
