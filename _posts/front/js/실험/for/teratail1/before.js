const iniArray = [
  { id: "1", x_num: "100", y_num: null, z_num: null },
  { id: "2", x_num: null, y_num: "400", z_num: null },
  { id: "3", x_num: null, y_num: null, z_num: "300" },
  { id: "4", x_num: null, y_num: "200", z_num: null }
];

console.log("iniArray!!", iniArray[0]["x_num"]);
console.log("iniArray!!", iniArray[0].x_num);
//console.log("iniArray!!", iniArray.0.x_num); error
console.log("iniArray!!", iniArray.x_num);
//https://teratail.com/questions/207279?modal=q-comp
//javascriptで配列にアクセスする方法は複数存在するか

console.log("------------------");
//console.log("iniArray.pop():", iniArray.pop());
//console.log("iniArray.pop():", iniArray.pop());
//console.log("iniArray.pop():", iniArray.pop());
//console.log("iniArray.pop():", iniArray.pop());

console.log("------------------");
/*
console.log("iniArray.shift():", iniArray.shift());
console.log("iniArray.shift():", iniArray.shift());
console.log("iniArray.shift():", iniArray.shift());
console.log("iniArray.shift():", iniArray.shift());
console.log("iniArray.shift():", iniArray.shift());
*/
console.log("------------------");
console.log(Array.from(iniArray).shift());
//console.log(Array.from(iniArray).shift().shift());
console.log(Array.from(iniArray).shift());

//無理をすればこうです
console.log("------------------");
console.log(iniArray.slice().splice(0, 1));
console.log("------------------");
console.log(iniArray.slice());
console.log("------------------");
console.log(iniArray);
