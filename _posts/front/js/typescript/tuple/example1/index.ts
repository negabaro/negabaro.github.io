// https://qiita.com/uhyo/items/80ce7c00f413c1d1be56

type AtLeast2<T> = [T, T, ...T[]]; //arr3 이실패
// type AtLeast2<T> = [...T[]]; 전부가능
// type AtLeast2<T> = [T, T]; //arr2만 성공

// type AtLeast2<T> = [T, ...T[]]; //전부성공?
const arr15: AtLeast2<number> = [0, 1, 2, 3, 4, 5, 6]; // これはOK
const arr1: AtLeast2<number> = [0, 1, 2]; // これはOK
const arr2: AtLeast2<number> = [0, 1]; // これもOK
const arr3: AtLeast2<number> = [0]; // これはエラー

type AtLeast1<T> = [T];
const arr33: AtLeast1<number> = [0]; // これはok

// ここで宣言されているAtLeast2<T>型の中身は[T, T, ...T[]]という型です。このように[]の中に型を書き連ねたものをタプル型といいます（

// ポイントは型レベル再帰の扱い方やタプル型と配列型の相互変換といったテクニック、そしてタプル型をカウンタとして扱うというアイデアです。知識とアイデアがあればこれくらいのことができるというTypeScriptの面白さを知っていただけると幸いです。
// ちなみに、型レベル再帰の回数には制限があるので注意してください。今回の場合だと、AtLeast<46, number>のように要素数を46以上にすると再帰の限界を超えてエラーになりました。
