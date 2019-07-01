Java, PHP와 같은 언어에서 this는 클래스로부터 생성되는 인스턴스 중 현재 객체를 의미한다. 그 이상 그 이하도 아니다. 대부분 클래스 밖에서는 사용될 수 없으며 이러한 접근 방법으로는 혼란이 생기지 않는다.

자바스크립트에서 this는 함수의 현재 실행 문맥이다. 자바스크립트에는 4가지의 함수 실행 타입이 있기 때문이다.

함수 실행: alert('Hello World!')
메소드 실행: console.log('Hello World!')
생성자 실행: new RegExp('\d')
간접 실행: alert.call(undefined, 'Hello World!')

각각의 타입은 서로 다른 각각의 문맥을 가진다. 이 부분에서 개발자들의 예상과 다른 부분이 생긴다.

더욱이 엄격 모드 역시 실행 문맥에 영향을 미친다.

this 키워드를 이해할 수 있는 방법은 함수 실행, 함수 실행이 문맥에 어떤 영향을 미치는지에 대해 확실히 이해하는 것이다.

이 글은 실행에 대한 설명에 초점을 맞췄다. 그리고 함수 호출이 this에 어떤 영향을 미치는지, 그리고 문맥을 식별하는 과정에서 저지르는 일반적인 실수들을 보여줄 것이다.

시작하기 전에 아래의 용어들과 친숙해지자.

실행이란, 함수 내부에 있는 코드를 수행하는 것이다. (쉽게 말해 함수 호출이라고 보면 됨) 예를 들어 parseInt라는 함수는 parseInt('15', 10)로 실행된다.
실행 시점에서의 문맥은 함수 내부에서의 값이다.
함수의 스코프는 변수, 객체, 내부 함수들의 집합이다

ES6 화살표 함수를 씁니다. ES6 화살표 함수는 this로 window 대신 상위 함수의 this를 가져옵니다(여기서는 <div>)

자, 이렇게 this에 대해서 알아보았습니다. 왜 함수의 this가 기본적으로 window인지는 실행 컨텍스트를 알아보셔야 하고요.

다시 한 번, 정리하자면, this는 기본적으로 window이지만, 객체 메서드, bind call apply, new일 때 this가 바뀝니다. 그리고 이벤트리스너나 기타 라이브러리처럼 this를 내부적으로 바꿀 수도 있으니 항상 this를 확인해보셔야 하고요. 여러분이 선언한 function의 this는 항상 window라는 것 알아두세요.

### Reference Link:

https://wormwlrm.github.io/2019/03/04/You-should-know-JavaScript-this.html?fbclid=IwAR0RYuO1p5UUWUI77AHYV4A9D-SPOUEEmjclIHv6kROElSHkUmdXoWHnAy8
https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb
https://github.com/FEDevelopers/tech.description/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%EB%90%98%EB%8A%94-this%EC%97%90-%EB%8C%80%ED%95%9C-%EC%84%A4%EB%AA%85-1
