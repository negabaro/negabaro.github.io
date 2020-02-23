//https://teratail.com/questions/204561
//メッセージの通り、文字列でなくundefinedに対してsplitを行っています。
//原因は、for(var i = 0;lines.length; i++ ){と、ループの終了条件が「line.lengthが0でなければ」と無限ループするように書いているので、
//linesのデータの無い部分まで見に行ってundefinedになってます。

var lines = [
  "10 60",
  "85 3",
  "85 7",
  "65 1",
  "85 5",
  "90 0",
  "35 14",
  "10 1",
  "75 1",
  "25 3",
  "70 5"
];

for (var i = 0; i < lines.length; i++) {
  arg = lines[i].split(" ");
  console.log(arg);
}
/*
for (var i = 0; lines.length; i++) {
  arg = lines[i].split(" ");
  console.log(arg);
}
*/
