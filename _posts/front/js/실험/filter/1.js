//http://lifelog.main.jp/wordpress/?p=2557

const gLines = [
  {
    ln_file: "T1301451.json",
    ln_key: "1301451",
    ln_name: "[ＪＲ]岩泉線 (茂市～岩泉) "
  },
  {
    ln_file: "T1301541.json",
    ln_key: "1301541",
    ln_name: "[ＪＲ]北上線 (北上～横手) "
  },
  {
    ln_file: "T1301671.json",
    ln_key: "1301671",
    ln_name: "[ＪＲ]磐越東線(ゆうゆうあぶくまライン) (いわき～郡山) "
  }
];

//この配列から、
//ln_key が ’1301541′に等しい要素を抽出するには、次のようにする。

const newLine = gLines.filter((item, index) => {
  if (item.ln_key === "1301541") return true;
});

console.log("newLine", newLine);

const newLine2 = gLines.filter((item, index) => {
  console.log("indexOf", item.ln_name.indexOf("いわき"));
  //indexOf -1
  //indexOf -1
  //indexOf 23  매치되는 부분만 이렇게 됨 (마이너스가 아닌 정수)

  if (item.ln_name.indexOf("いわき") >= 0) return true;
});

console.log("newLine22", newLine2);

//TODO! 왜 return true만 해줘도 해당 item이 통째로 리턴되는가..!!
