//https://teratail.com/questions/204476
//javascriptでevery関数を使用したデータチェック方
const targetList = [
  {
    id: 1,
    daichoList: [
      {
        date: "2019-08-05",
        price: 1000
      },
      {
        date: "2019-08-06",
        price: 0
      }
    ]
  },
  {
    id: 2,
    daichoList: [
      {
        date: "2019-08-05",
        price: 0
      },
      {
        date: "2019-08-06",
        price: 0
      }
    ]
  }
];
const a = targetList.map(x => x.daichoList);
console.log("aaaaaaaaaaaaaaaaa:", a);
/*
결과보면 [ [  이게 두개있음

aaaaaaaaaaaaaaaaa: [ [ { date: '2019-08-05', price: 1000 },
    { date: '2019-08-06', price: 0 } ],
  [ { date: '2019-08-05', price: 0 },
    { date: '2019-08-06', price: 0 } ] ]
*/

const b = a.reduce((x, y) => x.concat(y));
console.log("bbbbbbbbbbbbbbbbb:", b);
/*
recude concat하면  [ 하나만 있음
bbbbbbbbbbbbbbbbb: [ { date: '2019-08-05', price: 1000 },
  { date: '2019-08-06', price: 0 },
  { date: '2019-08-05', price: 0 },
  { date: '2019-08-06', price: 0 } ]
*/
//const c = b.forEach(x => {var ret = })
//targetList.map(x => console.log(x.daichoList)).reduce((x, y) => x.concat(y));
targetList.map(x => x.daichoList).reduce((x, y) => x.concat(y));
/*
var checkDate = {};
targetList
  .map(x => x.daichoList)
  .reduce((x, y) => x.concat(y))
  .forEach(x => {
    var ret =
      typeof checkDate[x.date] == "undefined" ? true : checkDate[x.date];
    ret = ret && x.price == 0;
    checkDate[x.date] = ret;
  });
*/
console.log("================");
console.log(targetList);
console.log("================");
console.log(targetList.daichoList);
//そもそもtargetList.daichoList自体がundefinedです。
//見たところ連想配列作られているようなので、ループの中で使う必要があるのでは？

console.log("================");
console.log(targetList[0].daichoList);
console.log("================22");
targetList.forEach(function(list) {
  var result = list.daichoList.every(
    n => n.date === "2019-08-06" && n.price === 0
  );
  console.log(result);
});
