트랜지션 CSS 클래스는 다음과 같다.

v-enter: 요소가 나타나기 시작할 때 적용
v-enter-active: 요소가 나타나는 트랜지션이 진행되는 동안 적용
v-enter-to: 요소가 나타나는 트랜지션이 완료될 때 적용
v-leave: 요소가 사라지기 시작할 때 적용
v-leave-active: 요소가 사라지는 트랜지션이 진행되는 동안 적용
v-leave-to: 요소가 사라지는 트랜지션이 완료될 때 적용

# @keyframes

@keyframes 속성은 진행 속도나 단계를 직접 지정해서 애니메이션 효과를 적용할 수 있게 해준다.

```js
    @keyframes shake-box {
        0% {
            transform: translateX(-20px);
            background-color: blue;
        }
        50% {
            transform: translateX(10px);
            background-color: yellow;
        }
        100% {
            transform: translateX(-20px);
            background-color: blue;
        }
    }
    
    .box:hover {
        animation: shake-box 0.2s infinite;
    }
```



https://mkki.github.io/vue.js/2018/06/13/start-vuejs-13.html
https://nekorokkekun.hatenablog.com/entry/2019/07/24/094241
[공식 github](https://kr.vuejs.org/v2/guide/transitions.html)
