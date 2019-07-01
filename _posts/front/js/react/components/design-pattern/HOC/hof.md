HOF의 장점은 함수에 기능을 추가하는 코드를 재사용 할 수 있다는 것이다. 만약 add 함수를 이용해서 partial 함수가 없이 add3 과 add5 함수를 만드려면 다음과 같이 직접 두 개의 함수를 만들어야 할 것이다.

const add3 = v => add(v + 3);
const add5 = v => add(v + 5);
하지만 HOF를 이용하면 기능 단위로 새로운 함수를 만들어내는 코드를 재사용할 수 있게 된다. 위의 예제는 너무 간단해서 체감이 잘 안될 수도 있지만, 좀더 복잡한 형태의 HOF인 경우 많은 양의 중복 코드를 제거할 수 있을 것이다.

이해를 돕기 위해 위의 \_.partial 함수를 직접 구현해 보도록 하자. 구현을 쉽게 하기 위해 인자 2개를 받는 함수의 첫번째 인자만 고정하도록 제한하면, 다음과 같이 간단하게 구현할 수 있다. 단순한 형태의 경우 화살표 함수를 사용하는 것이 더 직관적이므로, 화살표 함수를 사용해서 구현해 보았다.

const partial = (f, v1) => v2 => f(v1, v2);

const add3 = partial(add, 3);
const add5 = partial(add, 5);

console.log(add3(10)); // 13
console.log(add5(10)); // 15
위의 \_.partial 예제와 동일하게 동작하는 것을 볼 수 있을 것이다.

다음으로 넘어가기 전에 좀더 유용한 HOF를 만들어보자. 앞서 말했듯이 함수의 클로저를 이용하면 내부 상태를 갖는 함수를 만들 수 있다. 간단한 예로 함수의 반환값을 0부터 계속 누적시켜서 적용된 값을 반환하도록 하는 HOF를 만들어 보자. 복잡한 형태에서는 화살표 함수에 익숙하지 않으면 더 알아보기가 어려울 수도 있으므로 여기서부터는 function 키워드를 사용하도록 하겠다.

function acc(f) {
let v = 0;
return function() {
v = f(v);
return v;
}
}

const acc3 = acc(add3);

console.log(acc3()); // 3
console.log(acc3()); // 6
console.log(acc3()); // 9
HOF를 이용하면 부수효과를 만들어낼 수도 있다. 간단한 예제로, 결과값을 반환하기 전에 console.log 콘솔에 로그를 출력하도록 하는 HOF를 만들어보자. 이번에도 구현을 간단하게 하기 위해 인자 하나를 받는 함수만 이용하도록 제한하도록 하겠다.

function logger(f) {
return function(v) {
const result = f(v);
console.log(result);
return result;
}
}

const add3Log = logger(add3);

console.log(add3Log(10)); // 13, 13
console.log(add3Log(15)); // 18, 18
실행 결과 로그가 두 번씩 찍히는 것을 볼 수 있다. 즉, 내부적으로 로그를 남긴 후 결과값도 제대로 반환해준다는 것을 확인할 수 있다.

지금껏 3개의 HOF를 직접 만들었다. 이제 이들 HOF를 한 번에 조합해서 새로운 함수를 만들어보자. partial, acc, logger 를 모두 사용하면 다음과 같이 0부터 시작해서 3씩 더한 결과값을 누적시키면서 로그를 남기는 함수를 만들 수 있을 것이다.

const acc3Log = logger(acc(partial(add, 3)));

acc3Log(); // 3
acc3Log(); // 6
acc3Log(); // 9
함수형 프로그래밍은 기본적으로 작은 단위의 범용적인 함수를 만들고 이들을 조합해 가면서 프로그램을 만들어나가는 방식을 취한다. HOF는 이러한 기능 단위의 함수들을 조합해서 재사용할 수 있는 하나의 패턴을 제공함으로써 함수형 프로그래밍에서 아주 중요한 역할을 하고 있다.

사실 HOC라는 이름에는 약간의 허점이 있다. HOF가 함수를 인자로 받아 함수를 반환하는 함수(문장에 함수가 세 번 들어가고 있음에 주목)라면 HOC는 컴포넌트를 인자로 받아 컴포넌트를 반환하는 컴포넌트인 것이 자연스러울 것이다. 하지만 HOC는 사실 컴포넌트가 아닌 함수를 지칭한다. 이 이름에 대한 비판의 목소리도 있지만, HOF와 유사한 개념이라는 것이 더 강조되는 효과도 있으므로, 관대하게 넘어가도록 하자.
https://meetup.toast.com/posts/137
https://meetup.toast.com/posts/137
