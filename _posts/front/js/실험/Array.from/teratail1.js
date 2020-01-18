//変更されないようArray.fromでコピーを作っています。
//https://teratail.com/questions/207279
const iniArray = [
  { id: "1", x_num: "100", y_num: null, z_num: null },
  { id: "2", x_num: null, y_num: "400", z_num: null },
  { id: "3", x_num: null, y_num: null, z_num: "300" },
  { id: "4", x_num: null, y_num: "200", z_num: null }
];

console.log("------------------");
console.log(Array.from(iniArray).splice(1, 1));
console.log("------------------");
console.log(iniArray);

console.log("------------------");
console.log(Array.from(iniArray).splice(2, 1));

console.log("------------------");
console.log(
  Array.from(iniArray)
    .slice()
    .splice(2, 1)
);

console.log("------------------");
console.log(
  Array.from(iniArray)
    .splice(2, 1)
    .pop()
);

console.log("------------------");
//console.log(Array.from(...iniArray)); //error
