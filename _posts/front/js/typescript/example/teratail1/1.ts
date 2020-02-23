let xx = false;
xx |= true; // エラー

//https://teratail.com/questions/200273

//ビット演算子は Number 型の値を返す処理なので、Boolean 型が代入されるコードに違和感を覚えてしまいます(可読性が低いと感じられます)。
//元の書き方に準ずるなら、下記コードに書き換えられますが、

var x2 = x2 | true;

let x3: any = true;
//どうしても特定の型が必要という状況でなければ、let x: any = true;と型付けを放棄してしまうのも1つの選択肢かもしれません。

let xx2 = true;
let yy2 = false;

let xxx = xx2 || yy2;
let xxy = true || false;
