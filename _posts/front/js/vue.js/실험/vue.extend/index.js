var MyComponent = Vue.extend({
  template: "<div>Hello!</div>"
});

// 생성하고 #app에 마운트 합니다.(#app을 대체합니다)
new MyComponent().$mount("#app");

// 위와 같습니다.
//new MyComponent({ el: "#app" });
