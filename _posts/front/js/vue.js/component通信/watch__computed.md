더 쉽게 판단하는 방법: 만약 computed로 구현가능한 것이라면 watch가 아니라 computed로 구현하는것이 대게의 경우 옳다.


# computed

computed를 한마디로 얘기하자면 “반응형 getter”



watch를 사용하다 문득 궁금증이 생겼습니다.
보통 watch보단 computed사용이 권장됩니다.
디자인적인 관점에서, 디버깅 관점에서 저도 이를 동의하긴 합니다.
하지만 watch가 computed보다 뚜렷한 성능하락이 있는지를 모르겠습니다.
성능관점쪽에서 비교 우위가 있는지 한번 여쭈어보고 싶습니다.
혹시 아시는분 계신가요?

changjoo-park [16:31]
캐시 없음 vs 캐시 있음
watch vs computed
이렇거든요
｀디자인적인 관점에서, 디버깅 관점｀ 둘다 아닙니다 ;ㅁ; -> 디자인이 설계 말씀이시면 위의 캐시 구요 （編集済み） 

justkukaro [16:32]
watch도 변동된것만 리스닝 하는거 아닙니까?

comfuture [16:32]
watch는 이벤트 핸들러고 computed 는 cached getter 같은 녀석일꺼라
“값이 변하면 무언가 돈다” 라는 특징이 비슷할 뿐이지… 역할이 꽤 다른거 같습니다

"watch는 말씀하신대로 변동된것이 감지 되었을때, handler 로직을 실행시키는것이고
computed는 사용된 property들만 감지해서, 변경되지 않았을땐 캐싱된 값을 계속 돌려주는것

vivid [16:40]
사실 computed는 property 느낌이 강하고 watch는 function에 가까운 느낌인거 같아요"



"변경된 값을 자동으로 감지 해서 updated된 value를 가져올때 computed를 쓰게 되는거 같고
어떤 값이 변경됐을때 추가적인 로직이 필요하면 watch handler...

higg [16:41]
watch는 그냥 감지의 역할이지, computed처럼 리턴되는 값들을 캐싱해주진 않거든요"
"return this.val * 2 라면
2배로 만드는 함수가 한번 돌아 값을 만들고 val이 변하지 않았다면

다음번엔 호출 자체를 안하죠
무거운 계산로직이 있다면 약간 이득입니다만"
"변화가 없다면 호출하지 않는건 알고있습니다 제가 말씀드리는건
this.val이 1이 였다가 2가 됬다가 다시 1로돌아왔을떄
마지막 부분에서 연산을 하는지를 여쭈어 보고싶습니다

comfuture [16:47]
마지막 값만 기억합니다

changjoo-park [16:47]
변경되면 재연산해요"

----

vue에서 computed 랑 watch가 무슨차이인지 조금 쉽게 설명해주실수있으신가요....?ㅠㅠ


computed  : 변경이 있고, 그 변경으로 인한 결과가 필요할 때 사용
watch : 변경이 있고, 그 변경의 결과에 따라 다른 메소드 등을 호출할 때 사용

명령형과 선언형...? 주로 computed를 많이 쓰게 되네요

computed는 어떻게 보면 캐싱의 개념이고 watch는 트리거링이죠


[watch와 computed 의 차이와 사용법]: https://medium.com/@jeongwooahn/vue-js-watch%EC%99%80-computed-%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%99%80-%EC%82%AC%EC%9A%A9%EB%B2%95-e2edce37ec34#:~:text=watch%20%EB%8A%94%20Vue%20%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%9D%98,%EA%B0%80%20%EC%8B%A4%ED%96%89%EB%90%98%EB%8A%94%20%EA%B8%B0%EB%8A%A5%EC%9D%B4%EB%8B%A4.&text=%EC%9D%B4%20%EC%9D%B5%EB%AA%85%ED%95%A8%EC%88%98%EA%B0%80%20%EC%BD%9C%EB%B0%B1,%EB%A1%9C%20%EC%A0%84%EB%8B%AC%ED%95%98%EC%97%AC%20%EC%8B%A4%ED%96%89%ED%95%9C%EB%8B%A4.