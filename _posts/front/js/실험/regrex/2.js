//document.querySelector('.ytp-scrubber-container22').style.transform
const str = "translateX(391.123px)";
//const str = "translateX(391px)";
//const r1 = RegExp("^translateX\\(.*px\\)$");
//const r1 = RegExp("\\(.*\\)$");
//const r1 = RegExp("^([0-6]?[0-9]):([0-6]?[0-9])");

//(?=px)
//const r1 = RegExp("\\(.*\\)$");
///const r1 = RegExp("\\d+(?=px\\))");
const r1 = RegExp("\\d+.?\\d+(?=px)");
if (r1.test(str)) {
  console.log("match");
  const res = str.match(r1);
  console.log("res", res);
} else {
  console.log("no match");
}

//753
