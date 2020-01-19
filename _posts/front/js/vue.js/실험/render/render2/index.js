const Sample = {
  data: () => ({
    message: "this is vue.js22"
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
  //el: document.getElementById("app"),
  render: i => i(Sample)
  //render: i => (Sample) //動かない
}).$mount("#app");
//});
