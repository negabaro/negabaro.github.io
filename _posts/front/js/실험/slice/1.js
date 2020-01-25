const iniArray = [
  { id: "1", x_num: "100", y_num: null, z_num: null },
  { id: "2", x_num: null, y_num: "400", z_num: null },
  { id: "3", x_num: null, y_num: null, z_num: "300" },
  { id: "4", x_num: null, y_num: "200", z_num: null }
];

console.log(typeof iniArray); //object

console.log(typeof iniArray.slice()); //object

console.log("------------------");
console.log(iniArray.slice().splice(0, 1));

console.log("------------------");
console.log(iniArray);

console.log("------------------");
//console.log(iniArray.splice(0, 1));

console.log("------------------");
console.log(iniArray);

console.log("------------------");
console.log(...iniArray.slice().splice(0, 1));

console.log("------------------");
console.log(...iniArray);

console.log("------------------");
console.log(iniArray);
