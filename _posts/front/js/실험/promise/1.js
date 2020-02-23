const getParams = () => {
  //return 12;
  setTimeout(() => {
    return 11;
  }, 4000);
};
const something = num => {
  return new Promise(resolve => {
    // resolve("1つ目の処理");
    //resolve(`${num}つ目の処理`);
    setTimeout(() => {
      resolve(`${num}つ目の処理`);
    }, 3000);
  });
};

//console.log(something(2));
var hoge = getParams();
(async () => {
  //const hoge = getParams();
  console.log(hoge);
  const res = await something(hoge);
  console.log(res);
})();
