Iterator의 필요성에 대해 가장 첫번째로 드는 의문이다. 결론부터 말하자면 이터레이터를 사용하면 일반적인 반복문들과 다르게 느긋한 연산(Lazy Evaluation)을 구현할 수 있다. 

"var mySymbol = Symbol();
Symbol()을 호출하면 새로운 심볼 값이 생성됩니다. 이 값은 다른 어떤 값과도 다릅니다.

문자열 값이나 넘버 값처럼, 심볼 값도 속성(property)의 키(key)로 사용할 수 있습니다. 심볼 값은 다른 어떤 값과도 다르기 때문에, 심볼을 키로 갖는 속성은 다른 어떤 속성과도 충돌되지 않을 것을 보장 받습니다.

"
지금 당장 알아야 할 것은 ES 표준이 Symbol.iterator 같은 방식으로 기존의 어떤 코드와도 충돌하지 않는 새로운 심볼을 정의할 수 있다는 사실입니다. 그 대가(trade-off)는 문법이 다소 이상해보이는 것입니다. 하지만 이토록 유용한 기능을 완벽한 하위호환성과 함께 제공하는 장점에 비하면 아주 사소한 대가입니
이터러블 객체는 for–of 구문 뿐 아니라 Map과 Set의 생성자, 분해 할당 (destructuring assignment), 그리고 새로운 spread 연산자에서도 사용됩니다.

# 4.2 Symbol.for

Symbol.for 메소드는 인자로 전달받은 문자열을 키로 사용하여 Symbol 값들이 저장되어 있는 전역 Symbol 레지스트리에서 해당 키와 일치하는 저장된 Symbol 값을 검색한다. 이때 검색에 성공하면 검색된 Symbol 값을 반환하고, 검색에 실패하면 새로운 Symbol 값을 생성하여 해당 키로 전역 Symbol 레지스트리에 저장한 후, Symbol 값을 반환한다."

"Symbol 함수는 매번 다른 Symbol 값을 생성하는 것에 반해, Symbol.for 메소드는 하나의 Symbol을 생성하여 여러 모듈이 키를 통해 같은 Symbol을 공유할 수 있다.

Symbol.for 메소드를 통해 생성된 Symbol 값은 반드시 키를 갖는다. 이에 반해 Symbol 함수를 통해 생성된 Symbol 값은 키가 없다."

# Symbol 특징 2
객체에 Symbol로 등록된 프로퍼티를 symbol-keyed property라고 하는데 이 symbol-keyed property는 Object의 getOwnPropertyNames 반환 값에서 제외된다.

그렇기 때문에 for-in statement에서 열거되지 않는다."

# reference:
https://github.com/negabaro/functional-javascript-01/blob/master/02.%20ES6%EC%97%90%EC%84%9C%EC%9D%98%20%EC%88%9C%ED%9A%8C%EC%99%80%20%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94%20%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0%20%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C/index.html#L29


https://asfirstalways.tistory.com/270
https://dev-momo.tistory.com/entry/Beginning-Javascript-Iterator-and-Generator
https://jaeyeophan.github.io/2017/04/20/ES6-8-Symbol/
https://gist.github.com/qodot/ecf8d90ce291196817f8cf6117036997


https://poiemaweb.com/es6-symbol
http://hacks.mozilla.or.kr/2015/09/es6-in-depth-symbols/