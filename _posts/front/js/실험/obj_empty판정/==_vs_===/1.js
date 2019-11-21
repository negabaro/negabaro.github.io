// https://qiita.com/PianoScoreJP/items/e43d70ec188c6fed73ed

//== 等価演算子
// 数値と文字列を比較するとき、文字列は数値に変換されます。
// JavaScript は文字列の数値リテラルを Number 型の数値に変換しようと試みます。
// 最初に、その文字列の数値リテラルから数学的な値を引き出します。次に、最も近い Number 型の値にこの値を丸めます。

//つまり==は、文字列と数値の比較の場合、文字列を数値に変換してくれるわけです。

// === 厳密等価演算子
// オペランド同士が、型を変換することなく(上に示した通り)厳密に等しいならば真を返します。

// この場合、文字列は数値にに変換されないので、falseが返るわけです。

var a = "1";
var b = 1;

console.log(a == b);
//結果：true
console.log(a === b);
//結果:false

console.log(true == 1);
// true -> 1 로 변경한 증거?

console.log(true === 1);
//true -> 1로 변경안한 증거?

///--------------------------
console.log("=================");
// object

// オブジェクトを数値または文字列と比較する場合、
// JavaScript はそのオブジェクトの既定値を返そうとします。
// 演算子はそのオブジェクトを、そのオブジェクトの valueOf や toString といった
// メソッドを用いて、プリミティブな値か、String か、
// あるいは Number の値に変換しようとします。
// そうした変換の試みが失敗したときにはランタイムエラーが生成されます。

//TODO! 먼소리지.. 잘이해가..
console.log("foo" == new String("foo")); //true
console.log("foo" === new String("foo")); //false

console.log("=================");

console.log(new String("foo") == new String("foo"));
//異なるオブジェクト(というよりインスタンス)同士の比較になるため、falseになります。
console.log(new String("foo") === new String("foo"));

///--------------------------
console.log("=================");

// undefinedとnullの比較をするとこうなります。

console.log(null == undefined);
// 結果：true
console.log(null === undefined);
// 結果：false

//https://teratail.com/questions/222970?modal=q-comp
//질문 날림

//null과 undefined는 값이 없다는 의미의 데이터 형이라고 합니다.
//null은 값이 없음을 명시적으로 표시한 것이고, undefined는 그냥 값이 없는 상태이기때문에, ==로는 true가 뜨지만, ===로는 false가 리턴됩니다.
