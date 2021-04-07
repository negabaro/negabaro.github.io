
on(eventName) : 이벤트 감지
$emit(eventName) : 이벤트 트리거
동일 컴포넌트 내에서는 $on과 $emit을 이용하여 이벤트를 주고 받을 수 있습니다. 하지만 부모-자식 관계에서 $on을 이용하여 자식 컴포넌트에서 호출한 이벤트는 감지할 수 없습니다. 부모 컴포넌트의 템플릿에서 v-on을 사용하여 자식 컴포넌트에서 보내진 이벤트를 청취할 수 있습니다. 아래는 공홈에서 제공하는 예제입



출처: https://itstory.tk/entry/Vuejs-Event-Bus를-이용한-컴포넌트-간-통신 [덕's IT Story]


https://kr.vuejs.org/v2/guide/events.html
