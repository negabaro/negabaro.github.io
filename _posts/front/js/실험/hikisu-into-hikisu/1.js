function switch_2(expression) {
  console.log("expression", expression);
  return function(args) {
    console.log("args", args);
  };
}

const switchValue = "1";
console.log("switch2:", switch_2(switchValue)(["sss"]));
//TODO!! xx()(yogi) 이런형태의 yogi로 변수를 던져주는건 왜그런겨?

console.log("switch2:", switch_2(switchValue)({ 1: "xx" }));
