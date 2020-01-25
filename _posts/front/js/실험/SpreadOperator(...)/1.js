//https://www.yoheim.net/blog.php?q=20161204
//https://qiita.com/Nossa/items/e6f503cbb95c8e6967f8

//1. 배열 커피시
//配列をコピー（新しく参照）する場合は Array.from()、[].slice.call()
//などを使いますがスプレッド構文を使うと以下のようにコーディングできます。

console.log("========================");

const ary = ["Pen", "Pineapple", "apple"];
const myAry = [...ary];
//const myAry2 = ...ary; //[ts] Expression expected
console.log(ary === myAry); // false
console.log(myAry); // ["Pen","Pineapple","apple"]

//要素の参照は保たれます。 커피해도 커피모토를 값을 참조하고 있음
const fruits = [{ banana: 100 }, { cherry: 200 }];
const myFruits = [...fruits];

fruits["0"].banana = 300;
console.log(fruits);
//fruits[0].cherry = 400;
fruits["0"].cherry = 400;
console.log(fruits);

console.log("========================");
console.log(myFruits);

//2. 배열 展開時
//...（ピリオド３つ） と書きます。
//配列ライクなオブジェクト（正確には for of で展開できるオブジェクト）を個々の値に展開することができます。
console.log("========================");

const data = [15, -3, 78, 1];
console.log(Math.max(...data)); // 78

// もう以下のように書く必要はありません
console.log(Math.max.apply(null, data));

//3. xx
