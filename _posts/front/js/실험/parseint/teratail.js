//https://teratail.com/questions/205167

var lines = ["1", "2", "3", "4"];

console.log(lines); //[ '1', '2', '3', '4' ]
console.log(parseInt(lines)); //1
console.log("====================");
lines.map(_ => console.log(_));
//1
//2
//3
//4

//https://qiita.com/gimKondo/items/78984aaa1b0c2ea1d428
console.log(["10", "10", "10"].map(parseInt)); //[ 10, NaN, 2 ]
//['10', '10', '10'].map(parseInt) は直感に反する結果 [10, NaN, 2] を返す。
//これはparseIntが省略可能な第2引数を取り、mapがコールバックに3個の引数を渡すため

//この問題を回避するためには、
//['10', '10', '10'].map(e => parseInt(e))
//のように匿名関数でラップしてmapからparseIntに第2引数が渡されるのを抑止すれば良い。

console.log(["10", "10", "10"].map(e => parseInt(e))); //[ 10, 10, 10 ]

["10", "10", "10"].map(parseInt);
//1番目の要素: parseInt('10', 0, ['10', '10', '10']) => '10'を10進数とみなし10
//2番目の要素: parseInt('10', 1, ['10', '10', '10']) => 不正な基数1なのでNaN
//3番目の要素: parseInt('10', 2, ['10', '10', '10']) => '10'を2進数のイチゼロとみなし2

//mapのコールバックとしてparseIntを直接渡すのではなく、匿名関数でラップします。

["10", "10", "10"].map(e => parseInt(e, 10)); // (1) 明示的に10進数とみなして変換
["10", "10", "10"].map(e => parseInt(e, 0)); // (2) 自動判定で変換(この配列の場合はすべて10進数)
["10", "10", "10"].map(e => parseInt(e)); // (3) 同上
//上記のいずれも [10, 10, 10] を返します。

parseInt("2008year"); //-->  2008
parseInt("-77point"); //-->  -77

//文字列の先頭の文字が数値でない文字だった場合にはNaNを返します。
parseInt("Book170"); //-->  NaN

//https://www.javadrive.jp/javascript/global_function/index1.html
