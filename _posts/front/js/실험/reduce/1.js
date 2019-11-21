const json = [
  {
    i: "1",
    n: "\u6771\u6d77\u9053\u65b0\u5e79\u7dda",
    o: 0,
    t: "N",
    j: "18:05"
  },
  { i: "2", n: "\u5c71\u967d\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "4", n: "\u4e5d\u5dde\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "5", n: "\u6771\u5317\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "6", n: "\u5c71\u5f62\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "7", n: "\u79cb\u7530\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  {
    i: "532",
    n: "\u5317\u6d77\u9053\u65b0\u5e79\u7dda",
    o: 0,
    t: "N",
    j: "18:05"
  },
  { i: "8", n: "\u4e0a\u8d8a\u65b0\u5e79\u7dda", o: 0, t: "N", j: "18:05" },
  { i: "9", n: "\u5317\u9678\u65b0\u5e79\u7dda", o: 1, t: "N", j: "18:05" },
  { i: "170", n: "\u51fd\u9928\u672c\u7dda", o: 0, t: "N", j: "18:05" },
  {
    i: "221",
    n: "\u30e1\u30c8\u30ed\u6709\u697d\u753a\u7dda",
    o: 0,
    t: "C",
    j: "18:08"
  }
];

//console.log(json);
var obj22 = {
  t_id: "",
  t_shortname: "",
  t_official: "",
  t_twitter: "",
  t_time: ""
};

const res = json.reduce((obj, item) => {
  //console.log("obj", obj);
  //console.log("item.i", item.i);

  //console.log(Object.values(value).includes("i"));
  //if(Object.keys(value).includes("i"){

  //}
  if (item.i === "6") {
    obj.t_id = item.i; //ID
    obj.t_shortname = item.n; //短縮名
    obj.t_official = item.o; //公式情報フラグ
    obj.t_twitter = item.t; //ツイッター情報
    obj.t_time = item.j; //時間
  }
  return obj;
}, {});

//console.log("res", res);

const keke = json.find(el => {
  console.log("kekek", typeof el.i);
  el.i === "6";
});

//const targetUser = users.find(v => v.id === id);

//console.log("keke", keke);

/*
    for(var i=0, l=data.length; i<l; i++)
          {
            if(data[i]['i'] == obj_cookie.traffic)
            {
              t_id = data[i]['i'];//ID
              t_shortname = data[i]['n'];//短縮名
              t_official = data[i]['o'];//公式情報フラグ
              t_twitter = data[i]['t'];//ツイッター情報
              t_time = data[i]['j'];//時間
              break;
            }
          }
          */

const users2 = [
  { id: "101", name: "Alice" },
  { id: "102", name: "Bob" },
  { id: "103", name: "Charlie" }
];

const id = "102";
const targetUser2 = users2.find(v => v.id === id);
console.log(targetUser2);

console.log(targetUser2.id2);
