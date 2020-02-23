//https://tsudoi.org/weblog/3360/
//関数定義
//function 関数名<型パラメータ>(引数:型パラメータ):型パラメータ{}

var AA = <T>(value: T): T => value;

AA<string>("keke");
AA<number>(100);

console.log(AA<string>("Hello"), AA<number>(100));
