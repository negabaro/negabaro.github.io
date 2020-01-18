//https://teratail.com/questions/207296?modal=q-comp

const fruits = [{ cherry: 200 }, { banana: 100 }];
fruits["0"].banana = 9900;
console.log(fruits); //[ { cherry: 200, banana: 9900 }, { banana: 100 } ]
//代入したbananaが追加された？(既存の値は残ってる)

//0番目目の要素であるcherryの値を修正した場合

const fruits = [{ cherry: 200 }, { banana: 100 }];
fruits["0"].cherry = 9900;
console.log(fruits); //[ { cherry: 9900 }, { banana: 100 } ]
