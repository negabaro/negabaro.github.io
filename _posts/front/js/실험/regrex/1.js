var a = /abc/.exec("this is abc");
console.log("===========");
console.log(a);

const b = /abc/.exec("this is ab c");
console.log("===========");
console.log(b);

const c = /ab*c/.exec("this is abbbbbbbbbce");
console.log("===========");
console.log(c);

const d = /[0-5]?[0-9]:[0-5]?[0-9]/.exec(
  "0:13 에 릴러말즈 아니누? ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"
);
console.log("===========");
console.log(d);

const e = /([0-5]?[0-9]:[0-5]?[0-9])*/.exec(
  "0:13 에 릴러말즈 아니누? ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"
);
console.log("===========");
console.log(e);
