const hoge = [1, 2, 3];
hoge.forEach(item => {
  console.log(`Hello ${item}`);
});
const fuga = document.querySelectorAll(".fuga");
//fuga가 this로 변함

hoge.forEach.call(fuga => this, item => {});

//그걸로 인해 this가 hoge를 보고 해당 this 가 fuga됨
