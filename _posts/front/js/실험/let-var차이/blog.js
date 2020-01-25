//https://gist.github.com/LeoHeo/7c2a2a6dbcf80becaaa1e61e90091e5d
//var, let, const 차이점은?
//var는 function-scoped이고, let, const는 block-scoped입니다.

//function-scoped와 block-scoped가 무슨말이냐?

// var는 function-scope이기 때문에 for문이 끝난다음에 i를 호출하면 값이 출력이 잘 된다.
// 이건 var가 hoisting이 되었기 때문이다.
for (var j = 0; j < 10; j++) {
  console.log("j", j);
}
console.log("after loop j is ", j); // after loop j is 10

// 아래의 경우에는 에러가 발생한다.
function counter() {
  for (var i = 0; i < 10; i++) {
    console.log("i", i);
  }
}
counter();
//console.log("after loop i is", i); // ReferenceError: i is not defined
//에러를 발생해줌..!!

//javascript에서는 immediately-invoked function expression (or IIFE, pronounced "iffy")라는것이 있다.

//IIFE로 function-scope인거 처럼 만들 수가 있다.

// IIFE를 사용하면
// i is not defined가 뜬다.
(function() {
  // var 변수는 여기까지 hoisting이 된다.
  for (var i = 0; i < 10; i++) {
    console.log("i", i);
  }
})();
//console.log("after loop i is", i); // ReferenceError: i is not defined

// 이 코드를 실행하면 에러없이 after loop i is 10이 호출된다.
(function() {
  //"use strict"; //하면 존재하지 않는다고 나옴
  for (i2 = 0; i2 < 10; i2++) {
    console.log("i", i2);
  }
})();
console.log("after loop i is", i2); // after loop i is 10
