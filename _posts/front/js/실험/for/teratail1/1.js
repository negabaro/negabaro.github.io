//https://teratail.com/questions/205059
/*
対象の配列
*/
const iniArray = [
  { id: "1", x_num: "100", y_num: null, z_num: null },
  { id: "2", x_num: null, y_num: "400", z_num: null },
  { id: "3", x_num: null, y_num: null, z_num: "300" },
  { id: "4", x_num: null, y_num: "200", z_num: null }
];

/*
1. extKeysがnullじゃなければidを検索
*/
function getExtIds(iniArray, extKeys) {
  console.log("iniArray!!", iniArray[0]["x_num"]);
  //console.log("extKeys!!", extKeys);
  let array = [];
  for (let i = 0; i < iniArray.length; i++) {
    for (let j = 0; j < extKeys.length; j++) {
      if (iniArray[i][extKeys[j]] !== null) {
        const id = iniArray[i]["id"];
        array.push(id);
      }
    }
  }
  // extKeysが [ 'x_num', 'y_num' ] なので、[ '1', '2', '4' ] が取得される
  console.log("---検索されたidの配列---");
  console.log(array);
  return array;
}

/*
2. 検索したidを持つオブジェクトを抽出する
*/
function getExtObj(iniArray, extIds) {
  let array = [];
  for (let i = 0; i < iniArray.length; i++) {
    for (let j = 0; j < extIds.length; j++) {
      if (iniArray[i]["id"] == extIds[j]) {
        const extObj = iniArray.find(e => e.id && e.id === extIds[j]);
        array.push(extObj);
      }
    }
  }
  console.log("---抽出されたオブジェクト---");
  console.log(array);
  return array;
}

/*
3. 抽出されたオブジェクトを「●_num」で並び替える
*/
function getSortObj(extObj) {
  return extObj.sort(
    (a, b) => (a.x_num || a.y_num || a.z_num) - (b.x_num || b.y_num || b.z_num)
  );
}

/*
4. 処理を実行
*/
const extKeys = ["x_num", "y_num"];
const extIds = getExtIds(iniArray, extKeys);
const extObj = getExtObj(iniArray, extIds);
const result = getSortObj(extObj);
console.log("---「●_num」でソートされたオブジェクト---");
console.log(result);
