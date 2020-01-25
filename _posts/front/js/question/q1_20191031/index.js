/* var button = document.getElementsByClassName("button");

button.addEventListener("click", function() {
  //button
  console.log("button");
});
*/

// const button = document.getElementById("mybutton");
const button = document.getElementsByClassName("button")[0];
var myfunc = function() {
  console.log("addEventListener added");
  const targetDiv = document.createElement("div");
  targetDiv.className = "target2";
  const newContent = document.createTextNode("target2!");
  targetDiv.appendChild(newContent);

  const target = document.getElementById("target");
  target.appendChild(targetDiv);
};

button.addEventListener("click", myfunc);

const dom = document.querySelector("#target");
const dom2 = document.querySelector(".target2");

console.log("dom:", dom);
console.log("dom2:", dom2);
//https://teratail.com/questions/219516
// const dom = document.querySelectorAll('.ytp-tooltip[style*="display: none;"]');
// const dom = Array.from(document.querySelectorAll('.ytp-tooltip')).filter(val => val.style.display == 'none')[0];
