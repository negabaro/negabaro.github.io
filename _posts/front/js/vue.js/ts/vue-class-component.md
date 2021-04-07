
vue-class-component를 사용하면 ts에 가까운 코딩이 가능
그러나 공식에서는 vue.js에 가까운 vue.extend를 밀고 있다.


store를 모듈로 나누고 namespace경유해서 접근하는 방식을 사용

基本的には@Action, @Mutation, @Getter のアノテーションでプロパティのようにぽんぽん定義していくだけ。モジュール側を参照するときは namespace('moduleName') を経由するだけ。簡単ですね！


https://gist.github.com/RISCfuture/7ec8d98036577cbb47947f474ed1aae2