function regexTest(str) {
  const pattern = ".*?[0-5]?[0-9]:[0-5]?[0-9] ?.*?";
  const r1 = RegExp("^(?:" + pattern + " ?)+$");
  const r2 = RegExp(pattern + "( |$)", "g");
  if (r1.test(str)) {
    const r3 = str.match(r2);
    console.log("match");
    return r3;
  } else {
    console.log("unmatch");
    return undefined;
  }
}
console.log(regexTest("hoge hoge"));
console.log(regexTest("0:18 hoge"));
console.log(regexTest("hoge 0:34 hoge"));
console.log(regexTest("0:18 hoge 0:34 hoge"));
console.log(regexTest("0:18 hoge 0:34 hoge 0:41 hoge 0:55 hoge"));
