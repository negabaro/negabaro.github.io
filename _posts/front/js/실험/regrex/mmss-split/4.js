const sample = string => {
  const result = string.match(
    /^(?:(?![0-6]?\d:[0-6]?\d)[\s\S])+|[0-6]?\d:[0-6]?\d(?:(?![0-6]?\d:[0-6]?\d)[\s\S])*/g
  );
  return result && result.length > 1 ? result : string;
};

console.log(sample("0:18 hoge")); // "0:18 hoge"
console.log(sample("foo 69:69 bar")); //  ["foo ", "69:69 bar"]
console.log(sample("0:18 hoge 0:34 hoge")); // ["0:18 hoge ", "0:34 hoge"]
console.log(sample("0:18 hoge 0:34 hoge 0:41 hoge 0:55 hoge"));
