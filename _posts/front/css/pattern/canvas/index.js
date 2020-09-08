var canvas = window.document.getElementById("canvas");

var ctx = canvas.getContext("2d");
console.log("canvas", canvas);
console.log("ctx", ctx);

var img = new Image();
img.src = "./hoge.jpg";
img.onload = function() {
  //ctx.drawImage(img, 0, 0);
  ctx.drawImage(img, 0, 0, 1000, 700);
};

//console.log(document.getElementById("canvas"));
