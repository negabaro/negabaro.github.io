var array = [1, , 3, 4, 5];
console.log("==============");
array.forEach(function(val) {
  console.log(val); // 1,3,4,5
});
console.log("==============");
for (val of array) {
  console.log(val); // 1,undefined,3,4,5
}
console.log("==============");
for (val in array) {
  console.log(val); // 0,2,3,4
}
console.log("==============");
for (i = 0; i < array.length; ++i) {
  console.log(array[i]); //1,undefined,3,4,5
}

var i = 0;
var len = array.length;
console.log("==============");
while (i < len) {
  console.log(array[i++]); //1,undefined,3,4,5
}
console.log("==============");
for (i = 0; i < array.length; i++) {
  if (array.hasOwnProperty(i)) {
    console.log(array[i]); //1,3,4,5
  }
}
//https://qiita.com/think49/items/0c5ea1c9e2545fa2eed2
