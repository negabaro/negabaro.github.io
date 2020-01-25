//https://ledsun.hatenablog.com/entry/2014/03/17/200035

const unique = function(array) {
  return array.reduce(function(a, b) {
    console.log(a.indexOf(b));
    //aに同じやつが含まれたら、見つかってしまい下記if文に当てはまらない
    if (a.indexOf(b) == -1) {
      //console.log(a, ":", b);
      a.push(b);
    }
    return a;
  }, []);
};

console.log(unique([1, 2, 3, 3, 4]));
//https://ledsun.hatenablog.com/entry/2014/03/17/200035
