const json = [
  {
    i: "1",
    n: "\u6771\u6d77\u9053\u65b0\u5e79\u7dda",
    o: 0,
    t: "N",
    j: "18:05"
  },
  { i: "2", n: "\u5c71\u967d\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "4", n: "\u4e5d\u5dde\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "5", n: "\u6771\u5317\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "6", n: "\u5c71\u5f62\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "7", n: "\u79cb\u7530\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  {
    i: "532",
    n: "\u5317\u6d77\u9053\u65b0\u5e79\u7dda",
    o: 0,
    t: "N",
    j: "18:05"
  },
  { i: "8", n: "\u4e0a\u8d8a\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "9", n: "\u5317\u9678\u65b0\u5e79\u7dda", o: 1, t: "N", j: "18:05" },
  { i: "170", n: "\u51fd\u9928\u672c\u7dda", o: 0, t: "N", j: "18:05" },
  {
    i: "221",
    n: "\u30e1\u30c8\u30ed\u6709\u697d\u753a\u7dda",
    o: 0,
    t: "C",
    j: "18:08"
  }
];

const users = [
  { id: "101", name: "Alice" },
  { id: "102", name: "Bob" },
  { id: "103", name: "Charlie" }
];

const id = "102";
const targetUser = users.find(v => v.id === id);
console.log(targetUser);

const id2 = "6";
const targetjson = json.find(v => v.i === id2);
console.log(targetjson);

const keke = json.find(el => {
  //console.log("kekek", typeof el.i);
  //return el.i === "6";  // {}해주면 무조건 리턴해줘야됭
  el.i === "6";
});

console.log("keke", keke);
