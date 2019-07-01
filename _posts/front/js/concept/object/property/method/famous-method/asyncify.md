https://caolan.github.io/async/asyncify.js.html

해당 Asyncify 함수에 대해
감사하게 페이스북 개발자 사이트에서 질문-요청해 어떤분으로 부터 주석을 받게됐습니다.
Task 부분이 이벤트 루프의 Task라고 하는데,

[질문]
체크한 부분,
“Task에서 실행”, “함수가 호출된 Task” “Task 에서 호출” 이란 표현이
저에게 너무 어려운데요ㅜ.
이벤트 루프안에서 나오는 Task라고 주석을 남겨주신 분이 알려주셨는데요
혼자서 다시 이해하려고 해도 어렵네요,,

설명이 Task라는 것이 어떤 “문맥”,”공간”으로 이해가 되서요

“자신을 생성한 Task”,
“Asyncify”가 호출된 Task,”
“Task—-호출하다—-> Asyncify” 처럼 문장을 쪼개보면서
이해하려고 해도 어려워서요 ㅠ

(페북 주석 작성해주신 분에게 너무 질문을 많이해서..;;더이상 여쭤보기 죄송해서..;; 여러분들께 살짝쿵 여쭤봅니다 ㅋㅋ페북 댓글이 너무 달려서 그만..;;)

아 또 답답해서 파고들게 만드셨네 ㅋㅋㅋ
읽어보니까, 저분이 말한 현재 task는, 콜백을 받은함수 = asyncify() 함수를 말하는 거고, (edited)

Calm [4:03 PM]
네네~

JIMIN [4:05 PM]
두번째 라인은, 콜백이 asyncify() (현재 task) 호출이 되었다면 콜백함수(그 다음 task) = 가 task Queue에 들어가고 (edited)

저분이 사용하는 "벗어났다" 라는 말은, 실행이 완료되서 스택에서 나간애들을 말하는거같아요. 왜 한국말을 풀고있어야 되지 ㅋㅋㅋ (e

![image](https://user-images.githubusercontent.com/4640346/52933818-df3e6f80-3397-11e9-84a6-0fdd62a6063e.png)

#YouDontknowJs #콜백 #비동기

[질문 요청드립니다]

첨부한 코드는 you don’t know js 책, this와 객체 프로토타입, 비동기와 성능 편 중,
“2,4-콜백을 구하라” 라는 챕터에 나온 코드 입니다.

아래 함수 asyncify가 인자로 넣는 result함수를
비동기 인지 동기인지 검사 하는 개념 검증용 함수라고 하는데요,

도대체,
어떤 부분(라인)에서 “비동기”인지 “동기”인지 검수를 할 수 있는건지,
해당 논리의 코드를 찾기 어렵네요ㅠ

감사하게도 구글링을 통해, 해당 코드에 대해 저자가 남긴 코멘트나,
다른 코멘트들을 찾게 되었는데,,,,
읽으면 읽을 수록 이해가 안되 계속 겉돌?고 있습니다,,
이젠.. 인내심의 한계가.....;;

————-
질문입니다,

1. 비동기라는 정의가 함수가 나중(다음)에 실행하는 걸 의미하는데
   인자 들어온 fn(함수)를
   어떤 방법(코드)로
   비동기 함수이다 아니다를 판단하고 있는걸까요?..

2. bind.apply 부분이 어떤 의미인지 궁금한데요,
   해당 코드의 코멘트들을 읽어보면
   bind 위?에서 apply를 호출한다고 하거나
   bind가 함수가 아니라 함수참조라고 간략?하게 여운을 남기고 있고요;,
   무슨의미인지도 모르겠고, 왜 쓰는지도 궁금합니다 ㅠ

3. 전반적으로 코드가 어떻게 어떤 순서로 작동하는걸까요,

다른 관점에서 코드를 읽고 싶은데,
고수님들의
작은 힌트라도 의견 부탁드립니다.
————-

#해당*ebook*링크
https://github.com/…/master/async%20%26%20performance/ch2.md

페이지 하단에 있는
Trying to save callbacks 부분입니다.

#코드
#function*asyncify*정의

function asyncify(fn) {
var orig_fn = fn,
intv = setTimeout( function(){
intv = null;
if (fn) fn();
}, 0 )
;

fn = null;

return function() {
// firing too quickly, before `intv` timer has fired to
// indicate async turn has passed?

if (intv) {
fn = orig_fn.bind.apply(
orig_fn,

// add the wrapper's `this` to the `bind(..)`
// call parameters, as well as currying any
// passed in parameters

[this].concat( [].slice.call( arguments ) )
);
}

// already async

else {

#실행코드 #function_result
function result(data) {
console.log( a );
}

var a = 0;

ajax( "..pre-cached-url..", asyncify( result ) );
a++;

@Calm 1.
asyncify 함수는 동기인지 비동기인지 검사하는 함수가 아닙니다.
ajax( "..pre-cached-url..", result );
ajax라는 api가 동기로 실행될지, 비동기로 실행될지 확신할 수 없다면
반드시 result가 비동기로 실행되도록 보장해주는 함수입니다.

2.

orig_fn.bind 가 새로운 펑션을 반환합니다.
https://stackoverflow.com/questions/42470961/function-prototype-bind-apply-meaning-not-understood
이 글을 읽어보시면
"bind will return a new function with pre-bounded `this'" 라고 합니다. 이 부분은 저도 한참 공부해야될 것 같아서, 나중에 알게되면 추가하겠습니다. 즉, fn = orig_fn.bind.apply( orig_fn, // add the wrapper's`this`to the`bind(..)`
// call parameters, as well as currying any
// passed in parameters
[this].concat( [].slice.call( arguments ) )
);
이 코드를 개략적으로 이해해보자면, 위쪽에서 fn을 null로 만들었는데 다시 복구시켜 저장하는 내용입니다. 3.
이 코드의 목적은 어떤 콜백이 synchronously하게 동작하는지, asynchronously하게 동작하는지 불확실한 상황에서 반드시 콜백을 async하게 실행시키는 라이브러리(펑션또는 유틸)입니다.
만약 ajax호출 결과가 sync하게 동작한다면,
intv가 null이 아니게 되고, setTimeout 덕분에 다음 이벤트루프에서 실행하도록 보장이 되구요.
만약 ajax호출 결과가 async하게 동작한다면,
intv가 null이기 때문에 orig_fn.apply( this, arguments ); 로 기존 함수를 실행합니다.

- Task란 한번의 이벤트루프를 처리하는 단위를 의미합니다.
