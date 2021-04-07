
# 이벤트 리스너
v-on 디렉티브는 이벤트 리스너입니다. v-on 디렉티브는 DOM 이벤트가 발행하는지 듣고 있다가 이벤트가 발생 했을 때 JavaScript를 실행합니다.

출처: https://beomy.tistory.com/53 [beomy]

v-on 디렉티브를 사용하여 DOM 이벤트를 듣고 트리거 될 때 JavaScript를 실행할 수 있습니다. — VueJS 공식 문서

# 2. 메소드 이벤트 핸들러
대부분의 이벤트 핸들러의 로직은 복잡하기 때문에 v-on에 JavaScript로 넘겨주기 어렵습니다. 그렇기 때문에 v-on에 methods의 함수를 넘겨주는 형태로 구현 하는 것이 좋습니다.

# 3. 인라인 메소드 핸들러
메소드 이름을 v-on에 직접 바인딩 하는 대신 인라인 JavaScript를 사용하여 methods의 함수를 호출 할 수도 있습니다.


# 4. 이벤트 수식어
이벤트 핸들러 내부에서 종종 event.preventDefault() 나 event.stopPropagation() 를 호출할 때가 있습니다. Vue에서도 마찬가지로 preventDefault나 stopPropagation을 사용해야 할 때가 있습니다. 그 때에 이벤트 핸들러 내부에서 이벤트 객체를 사용할 수도 있지만 v-on 이벤트 리스너에서 사용할 수도 있습니다.

.stop
.prevent
.capture
.self
.once
v-on 뒤에 위와 같이 점(.)으로 시작하는 접미사를 사용하면 됩니다.


 <button v-on:click.once="countNum">1度だけボタン</button>
        <button v-on:click.right.prevent="countNum">右クリック</button>
        <button v-on:click.shift="countNum">shiftキー</button>



## .once
2.1.4에 추가된 이벤트 수식어입니다.

<!-- 클릭 이벤트는 최대 한번만 트리거 됩니다. -->
<a v-on:click.once="doThis"></a>
네이티브 DOM 이벤트에서만 동작하는 다른 수식어와 달리 .once 수식어는 컴포넌트 이벤트(컴포넌트에서 발생하는 사용자 정의 이벤트)에서도 사용할 수 있습니다

## .passive
2.3.0 이후에 추가된 이벤트 수식어입니다. 모바일 환경에서 성능향상에 도움이 되는 이벤트 수식어 입니다.


# 5. 키 수식어


# 6. 시스템 키 수식어
2.1.0 이상의 버전에서 추가된 기능입니다.

.ctrl
.alt
.shift
.meta


# .native

네이티브 이벤트를 컴포넌트에 바인딩 하기
컴포넌트에서 루트 엘리먼트의 네이티브 이벤트를 직접 감지하고 싶은 경우가 있을 수 있습니다. 이 경우, v-on에 .native 수식어를 사용할 수 있습니다.

<base-input v-on:focus.native="onFocus"></base-input>


# $listeners

$listeners 속성을 이용하면 컴포넌트에서 v-on=$listeners를 이용해 부모 엘리먼트가 가진 이벤트 리스너를 특정 자식 엘리먼트에게 전달할 수 있습니다. 가령 <input>같은 엘리먼트에 v-model 를 적용하고 싶은 경우라면, 아래와 같이 inputListeners같은 새로운 computed 속성을 생성하여 유용하게 활용할 수 있습니다.



# 7. HTML 이벤트 리스너를 사용할까?

Vue에서 사용하는 이벤트 리스너 등록 방법은 관심사 분리(separation of concerns) 규칙에 어긋난다고 생각할 수 있습니다. (관심사 분리란 JavaScript와 HTML, CSS 분리하는 것, 즉 각각의 역할 별로 분리하는 것을 말합니다.)

v-on을 사용하여 이벤트를 핸들링하는 몇가지 장점이 있습니다.

1) 핸들러 함수를 찾는 것이 쉽습니다.
HTML 템플릿을 간단히 하여 JavaScript 코드 내에서 핸들러 함수를 찾는 것이 더 쉽습니다.

2) 순수 로직만 가질 수 있습니다.
ViewModel 코드는 순수한 로직만 가지게 됩니다. 또한 JavaScript에서 이벤트 리스너를 수동으로 연결 할 필요가 없으므로 DOM이 필요 없게 됩니다.

3) 모든 이벤트 리스너가 자동으로 제거됩니다.
ViewModel이 파기되면 모든 이벤트 리스너가 자동으로 제거됩니다. 이벤트 제거에 대한 걱정이 필요 없게 됩니다.

참고
https://kr.vuejs.org/v2/guide/events.html


출처: https://beomy.tistory.com/53 [beomy]

출처: https://beomy.tistory.com/53 [beomy]



https://noumenon-th.net/programming/2019/05/17/v-on/


출처: https://beomy.tistory.com/53 [beomy]



https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A6%AC%EC%8A%A4%EB%84%88-v-on-vuejs-directive-625bfc661c75