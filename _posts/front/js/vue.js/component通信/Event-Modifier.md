# Event Modifier(이벤트 수식어)

원래 이벤트를 호출 할 때 이 이벤트를 세밀하게 조정하는 Event Modifier(이벤트 조정자 혹은 수식어)라는 개념이 있습니다. 공식문서를 살펴보면 아래와같이 설명하고 있습니다.

이벤트 핸들러 내부에서 event.preventDefault() 또는 event.stopPropagation()를 호출하는 것은 매우 보편적인 일입니다. 메소드 내에서 쉽게 이 작업을 할 수 있지만, DOM 이벤트 세부 사항을 처리하는 대신 데이터 로직에 대한 메소드만 사용할 수 있으면 더 좋을 것입니다.

조금 어려우신가요? 정확하게 이해하지 못하셔도 크게 상관은 없습니다. ‘Event Modifier라는 개념의 무언가가 있는데 Vue에서도 사용할 수 있다’라는 말입니다. 그렇다면 Event Modifier라는 것은 어떤 역할을 하는 것인지 한번 예로 살펴보도록 하겠습니다.

이벤트 핸들러 내부에서 종종 event.preventDefault() 나 event.stopPropagation() 를 호출할 때가 있습니다. Vue에서도 마찬가지로 preventDefault나 stopPropagation을 사용해야 할 때가 있습니다. 그 때에 이벤트 핸들러 내부에서 이벤트 객체를 사용할 수도 있지만 v-on 이벤트 리스너에서 사용할 수도 있습니다.

.stop
.prevent
.capture
.self
.once
v-on 뒤에 위와 같이 점(.)으로 시작하는 접미사를 사용하면 됩니다.

<!-- 클릭 이벤트 전파가 중단됩니다 -->
<a v-on:click.stop="doThis"></a>

<!-- 제출 이벤트가 페이지를 다시 로드 하지 않습니다 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 수식어는 체이닝 가능합니다 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 단순히 수식어만 사용할 수 있습니다 -->
<form v-on:submit.prevent></form>

<!-- 이벤트 리스너를 추가할 때 캡처모드를 사용합니다 -->
<!-- 즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
<div v-on:click.capture="doThis">...</div>


<!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다 -->
<!-- 자식 엘리먼트에서는 안됩니다 -->
<div v-on:click.self="doThat">...</div>
이벤트 수식어를 사용한 순서대로 적용되기 때문에 여러개의 수식어를 사용 할 때 수식어 사용 순서를 고려해야 합니다. 즉 @click.prevent.self를 사용하면 클릭 이벤트가 발생 했을 때 모든 엘리먼트의 기본 동작을 막을 수 있지만, @click.self.prevent는 엘리먼트 자체의 기본 동작만 막을 수 있습니다.


7. HTML 이벤트 리스너를 사용할까?
Vue에서 사용하는 이벤트 리스너 등록 방법은 관심사 분리(separation of concerns) 규칙에 어긋난다고 생각할 수 있습니다. (관심사 분리란 JavaScript와 HTML, CSS 분리하는 것, 즉 각각의 역할 별로 분리하는 것을 말합니다.)

v-on을 사용하여 이벤트를 핸들링하는 몇가지 장점이 있습니다.

1) 핸들러 함수를 찾는 것이 쉽습니다.
HTML 템플릿을 간단히 하여 JavaScript 코드 내에서 핸들러 함수를 찾는 것이 더 쉽습니다.

2) 순수 로직만 가질 수 있습니다.
ViewModel 코드는 순수한 로직만 가지게 됩니다. 또한 JavaScript에서 이벤트 리스너를 수동으로 연결 할 필요가 없으므로 DOM이 필요 없게 됩니다.

3) 모든 이벤트 리스너가 자동으로 제거됩니다.
ViewModel이 파기되면 모든 이벤트 리스너가 자동으로 제거됩니다. 이벤트 제거에 대한 걱정이 필요 없게 됩니다.



출처: https://beomy.tistory.com/53 [beomy]

출처: https://beomy.tistory.com/53 [beomy]


출처: https://beomy.tistory.com/53 [beomy]

출처: https://beomy.tistory.com/53 [beomy]



https://beomy.tistory.com/53
https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A6%AC%EC%8A%A4%EB%84%88-v-on-vuejs-directive-625bfc661c75