const iniArray = [
  { id: "1", x_num: "100", y_num: null, z_num: null },
  { id: "2", x_num: null, y_num: "400", z_num: null },
  { id: "3", x_num: null, y_num: null, z_num: "300" },
  { id: "4", x_num: null, y_num: "200", z_num: null }
];

console.log("------------------");
console.log(Array.from(iniArray).splice(0, 1));
console.log(Array.from(iniArray).splice(1, 1));
console.log("------------------");
console.log(iniArray);
//splice(0,1))
//破壊的な切り出し用メソッド…splice
//이니깐 slice().splice(1,1)조합으로 非破壊的な実装を？
