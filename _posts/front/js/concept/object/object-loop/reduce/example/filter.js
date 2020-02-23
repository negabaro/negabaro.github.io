//https://ginpen.com/2018/12/23/array-reduce/

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = arr.reduce((acc, value) => {
  if (value % 3 === 0) {
    acc.push(value);
  }
  return acc;
  //}); //TypeError: acc.push is not a function
}, []);
console.log(result);
// [ 3, 6, 9 ]

const result2 = arr.reduce((accumulator, currentValue, currentIndex, array) => {
  if (currentValue % 3 === 0) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);
console.log(result2);
// [ 3, 6, 9 ]

const result3 = arr.reduce(function(
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  if (currentValue % 3 === 0) {
    accumulator.push(currentValue);
  }
  return accumulator;
},
[]);
console.log(result3);
