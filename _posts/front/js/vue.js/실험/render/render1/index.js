const Sample = {
  data: () => ({
    message: "this is vue.js"
  }),
  created() {
    console.log("created!");
  },
  template: "<div>55 {{ message }}</div>"
};

//document.addEventListener("DOMContentLoaded", () => {
//let div = document.createElement("div");
//div.setAttribute("id", "abe_prime_minister");
//div.innerHTML = "test";
//document.body.appendChild(div);

new Vue({
  el: document.getElementById("app"),
  render: i => i(Sample)
  //render: h => h(Sample) //hでもiでもrenderできる!
});
//});
