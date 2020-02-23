const Sample = {
  data: () => ({
    message: "this is vue.js33"
  }),
  created() {
    console.log("created!");
  },
  template: "<div>55 {{ message }}</div>"
};

new Vue({
  render: function(createElement) {
    return createElement(Sample);
  }
}).$mount("#app");

//https://reffect.co.jp/vue/vue-js-render
