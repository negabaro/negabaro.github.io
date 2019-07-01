javascript function에 대한 정의로

`자바스크립트의 function은 Fisrt-Class-Object 로서 변수나 데이터 구조 안에 담을 수 있으며 인자로 전달할 수 있고 반환 값으로도 사용할 수 있으며 , 런타임에 생성할 수 도 있다`

이 문장중에 `런타임에 생성할 수 도 있다`가 어떤걸 의미하는건가요?
self invoking function으로 함수를 실행할때를 의미하는건가요

`자바스크립트의 function은 Fisrt-Class-Object 로서 변수나 데이터 구조 안에 담을 수 있으며 인자로 전달할 수 있고 반환 값으로도 사용할 수 있으며 , 런타임에 생성할 수 도 있다`
이 의미는

1. JavaScript의 function은 일급시민으로 취급되기 때문에 변수에 담을 수 있고, 파라미터로 함수를 넘길 수 있고 함수를 함수 안에서 반환도 할 수 있음을 의미합니다.
2. 앱 실행 중(런타임)에 const a = () => { // do something } 이라는 함수를 만들어서 어딘가에서 이렇게 동적으로 만들어진 함수 a를 활용해 다른 일을 수행할 수 있음을 의미합니다.
   IIFE와는 상관없습니다.

JS 코드가 실행되는 환경은 브라우저와 Node.js 같은 환경 자체를 의미하고
런타임은 코드가 실행중인 기간 자체를 의미합니다.
JS 코드가 실행되는 환경은 런타임이 아니에요. JS 코드가 실행되는 환경에서 JS 코드를 실행한 순간부터 종료하기 직전까지를 런타임이라고 합니다. (edited)
다만 JavaScript Runtime(고유대명사 같은 겁니다) 이라고 표현하면 JS 코드가 실행되는 환경을 의미해요(좀 헷갈리죠).
https://stackoverflow.com/questions/30838412/what-is-javascript-runtime
Stack Overflow
What is javascript runtime..?
As per the definition mentioned on https://nodejs.org/ Node.js is a platform built on Chrome's JavaScript run-time for easily building fast, scalable network applications. Node.js uses an event-...
이 링크를 참고하시면 되겠습니다.
그래서 Node.js가 홈페이지에서 Node.js를 new JavaScript Runtime 이라고 표현합니다.

moondaddi ムヌデディ [10:41 PM]
갓파라곤님 지나치지 않고 와주셔서 감사합니다. ㅎㅎ
네가바로님의 맥락이 저와 같은지는 모르겠지만, 말씀하신대로의 런타임을 그렇게 이해하면 일반적인 함수를 작성하여 코드를 돌려 실행하면 결국 JS의 모든 함수는 런타임 때 생성되고 호출되어 실행되는 게 아닌가요? 런타임에 dynamic하게 함수가 생성된다는 말이 성립하려면, 그럼 일반적인 함수의 경우 런타임 이전에 생성된다는 의미가 되는데 제 이해가 맞는건가요? (edited)

brightparagon [11:00 PM]
물론 작성한 파일들을 처음 실행하면 함수 선언문을 만날때마다 함수를 생성하므로 그것도 런타임에 함수를 생성하는게 맞기는 하지만 보통 `런타임에 생성된다` 라고 말하는 것은 작성된 파일들을 모두 실행한 이후에 동적으로 생성되는 걸 말합니다.
리액트로 SPA를 만들고 그 파일들을 모두 실행시키면 버튼에 걸려있던 onClick 핸들러가 바로 실행되나요?
그렇지 않죠. 우리가 만든 핸들러 함수는 click 이벤트에 등록되었을 거고 버튼이 클릭되면 그제서야 실행이 되는데 이때 이 핸들러 함수 안에서 새로운 함수를 만들어서 다른 로직을 수행하는 함수에다가 방금 새로이 만든 함수를 인자로 던져 새로운 일을 동적으로 처리할 수 있습니다. (edited)

moondaddi ムヌデディ [11:05 PM]
아

moondaddi ムヌデディ [11:06 PM]
런타임 중 실행된다라는 이 표현에 집중할 게 아니라 동적으로 생성되서 실행된다는 문맥으로 이해해야하는거군요

---

Could not find a JavaScript runtime って怒られる問題

rails s すると下記のエラーが出て You're on Rails できない。

Gem Load Error is: Could not find a JavaScript runtime.
See https://github.com/rails/execjs for a list of available runtimes.
要するに JavaScript のランタイムが無いよってことらしい。

解決策

```
Gemifile
# gem 'therubyracer', platforms: :ruby
```

therubyracer は Javascript のエンジンである V8 JavaScript Engine を Ruby から使えるようにする gem。
（更にそのままでは使えない環境の場合は、環境に合ったバイナリファイルを持ってきてくれるスグレモノ）
ただ既に node.js とかがインストールされている環境では不要なため、デフォルトではコメントアウトされているらしい。

https://stackoverflow.com/questions/28464417/can-functions-be-created-at-run-time-in-javascript/28464479#28464479

https://stackoverflow.com/questions/30838412/what-is-javascript-runtime
