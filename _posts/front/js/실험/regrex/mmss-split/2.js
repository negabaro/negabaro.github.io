//https://teratail.com/questions/220634#reply-323520

function regexTest(str) {
  var regex = RegExp("\\s?([0-6]?[0-9]\\:[0-6]?[0-9])?\\s?([\\w]+)", "g"),
    m;
  //if ( m = regex.exec(str) ) {
  if ((m = str.match(regex))) {
    // matchを使う
    //console.log( "matched:", m );

    // マッチ結果 m には配列が来るので、期待値に合わせて調整
    if (m.length === 1) {
      str = m[0];
    } else if (m[0].match(/^[^\d]/)) {
      str = m.join("");
    } else {
      str = m;
    }
    return str;
  } else {
    console.log("unmatch");
    return undefined;
  }
}
var list = ["0:18 hoge", "hoge 0:34 hoge", "0:18 hoge 0:34 hoge"];
list.forEach((src, idx) => {
  console.log(`#${idx} result :`, regexTest(src));
});
