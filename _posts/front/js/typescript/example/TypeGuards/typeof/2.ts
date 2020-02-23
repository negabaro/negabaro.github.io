//typeof = 変数を型に変換する(interface化する)
//https://teratail.com/questions/198909
const o222 = {
  AGE: 31,
  NAME: "foo"
};

//typeof로 만들지 않으면 아에 찾지를 못함
let x111: o222; //error  Cannot find name 'o222'
let x222: typeof o222;
