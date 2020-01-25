const arr = [11, [22, 33], 44, [55, 66, 77, ,]];

const result = arr.reduce((acc, value) => acc.concat(value), []);
console.log(result);
// [ 11, 22, 33, 44, 55, 66, 77 ]

//https://ginpen.com/2018/12/23/array-reduce/
