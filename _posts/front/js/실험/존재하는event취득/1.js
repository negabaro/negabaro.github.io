function sayHello() {
  alert("Hello!");
}
function sayGoodbye() {
  alert("Bye!");
}
var p = document.getElementById("sample");
p.addEventListener("click", sayHello, false);
p.addEventListener("click", sayGoodbye, false);

// chrome devtool에서
//getEventListeners(document.getElementById("sample"))
//하면 무슨 이벤트 들어가있는지 확인가능
