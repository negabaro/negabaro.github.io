function regexTest(str) {
  const regex = RegExp("(\\d{1,2}:\\d{1,2})");
  const arr = str.split(regex);
  //console.log("arr", arr);
  r = [];

  for (i = 1; i <= arr.length - 2; i += 2) {
    r.push(arr[i] + arr[i + 1]);
  }

  r[0] = arr[0] + r[0];
  return r;
}

console.log(regexTest("0:18 hoge"));
console.log(regexTest("hoge 0:34 hoge"));
console.log(regexTest("0:18 hoge 0:34 hoge"));
