HelloWorld 전용 Vuex store 객체를 생성하여 배포합니다. 초반에 서술했듯이 namespaced 옵션을 true로 설정하여


commit('helloworld/setWorld')
혹은
this.$store.state.helloworld.world