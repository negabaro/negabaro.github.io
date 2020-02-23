//https://teratail.com/questions/205789
"use strict";
{
  const plus = document.querySelectorAll(".plus");
  // 必要ない部分と変数名を変更しました
  for (var i = 0; i < plus.length; i++) {
    console.log(i);
    // 期待した通り012と表示
    plus[i].addEventListener("click", () => {
      console.log(i);
      // なぜ3が表示されるのか？i<plus.lengthは３未満の数値になるはず
      if (plus[i].textContent === "+") {
        plus[i].textContent = "-";
      } else {
        plus[i].textContent = "+";
      }
    });
  }
}
