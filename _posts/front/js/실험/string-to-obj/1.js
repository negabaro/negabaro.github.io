const hoge =
  "{weather:'w_kinki_sumoto',traffic:'4',business:'',mytown:'',seiza:['Aries','2']}";

const hoge2 =
  "{weather:'w_kinki_sumoto',traffic:'4',business:'',mytown:'',seiza:['Aries','2']}";

function string2Object(string) {
  //String型からオブジェクト型にキャスト
  return JSON.parse(string.replace(/'/g, '"').replace(/(\w+)?:/g, '"$1":'));
}

// https://stackoverflow.com/questions/1086404/string-to-object-in-js

//console.log(string2Object(hoge));
var keke = string2Object(hoge);

console.log(typeof keke);
//var myobj = JSON.parse(hoge);
//undefined:1
//{weather:'w_kinki_sumoto',traffic:'4',business:'',mytown:'',seiza:['Aries','2']}
// ^
//SyntaxError: Unexpected token w in JSON at position 1
//console.log(myobj);

var myobj2 = JSON.parse(JSON.stringify(hoge));

console.log(myobj2);
//{weather:'w_kinki_sumoto',traffic:'4',business:'',mytown:'',seiza:['Aries','2']}

console.log(typeof myobj2);
//string

const str2obj2 = str => {
  return JSON.parse(JSON.stringify(str))
    .split(",")
    .map(keyVal => {
      console.log("yy", keyVal);
      return keyVal.split(":").map(_ => _.trim());
    })
    .reduce((accumulator, currentValue) => {
      console.log("xx", currentValue);
      accumulator[currentValue[0]] = currentValue[1];
      return accumulator;
    }, {});
};

//console.log("wow", str2obj2(hoge));

//console.log("wow2", string2Object2(hoge));

const str2obj3 = str => {
  return JSON.parse(JSON.stringify(str.replace(/'/g, '"')));
};

console.log("gogo:", str2obj3(hoge));
console.log("gogo2:", typeof str2obj3(hoge));

//console.log("xx", eval("({" + hoge + "})"));

const str2obj4 = str => {
  return JSON.parse(str.replace(/'/g, '"').replace(/(\w+)?:/g, '"$1":'));
};

console.log("ppop:", str2obj4(hoge));
console.log("popo2:", typeof str2obj4(hoge));
