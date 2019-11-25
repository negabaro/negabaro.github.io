const string = `12:44 hogehogehogehoge
fogefogefoge 01:30
fogefoge 5:30 hogehoge`;

const result1 = string.split(/([0-5]?\d:[0-5]?\d)/),
  result2 = string.match(/[0-5]?\d:[0-5]?\d|(?:(?![0-5]?\d:[0-5]?\d)[\s\S])+/g);

console.log("result1:", result1);
console.log("result2:", result2);
