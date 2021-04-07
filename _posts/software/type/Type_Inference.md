Type Inference 타입추론

타입 추론(Type Inference)
타입 추론의 기본적인 동작을 간단한 예제를 통해서 알아보자.

1
2
3
4
let bool = true;
const arr = [1, 2, 3];
const tuple = [true, 1];
bool = 1; // Error!
위의 예제에서 각 변수의 타입은 적절하게 추론되므로 다시 사용할 때 Type Safe 하게 사용할 수 있다. bool의 타입은 boolean으로 추론되므로 number 타입인 1을 할당하려고 하면 에러가 발생한다. arr 변수는 number[], 즉 number 타입의 배열로 추론된다. 이 때 배열의 길이는 항상 고정이 아닌 것으로 추론한다. 즉, 투플이 아니다. 아래의 tuple 변수도 마찬가지로 배열로 추론된다. 만약 투플로 사용하고 싶다면 별 수 없이 타입 선언을 해주어야 한다. 다만 배열의 요소가 각각 boolean과 number이기에 최종적으로 추론되는 타입은 boolean과 number의 유니온 타입의 배열, 코드로 나타내면 (boolean | number)[]이다.

여기에서 배열에서 사용된 요소들의 타입을 각각 추론하여 유니온 타입으로 만들어 내는 방식을 TypeScirpt 에서는 Best common type이라고 부른다.

Best common type
Best common type 은 말 그대로 가장 일반적인 타입이다. 여러가지 자료형이 배열 내부에서 사용되고 있을 때, 그 여러가지 자료형을 포괄할 수 있는 가장 일반적인 자료형을 추론하는 것이다. 그 결과로 위의 예제에서는 true와 1을 포괄할 수 있는 자료형인, (boolean | number)가 추론된 것이다.

Best common type 은 대부분의 경우에 유니온 타입으로 추론되지만 예외적인 케이스도 몇 가지 있다. 먼저 특정 클래스가 다른 클래스를 상속한 경우.

1
2
3
4
5
6
7
8
9
class Parent {
  foo = '';
}

class Child extends Parent {
  bar = '';
}

const arr = [new Parent(), new Child()];
위의 예제에서 arr 변수의 타입은 Parent[]로 추론된다. Parent 타입이 Child 타입을 포괄할 수 있는 타입이므로 그렇게 추론되는 것이다. 하지만 다음의 예제에서는 조금 다르다.

1
2
3
4
5
6
7
8
9
10
11
12
13
class Parent {
  foo = '';
}

class Child1 extends Parent {
  bar = '';
}

class Child2 extends Parent {
  baz = '';
}

const arr = [new Child1(), new Child2()];
여기에서도 분명 Parent 타입은 Child1 타입과 Child2 타입을 포괄할 수 있는 타입이다. 따라서 마찬가지로 Parent[]로 타입이 추론되는 것이 타당해 보이지만, 실제로는 다시 유니온 타입으로, (Child1 | Child2)[]로 추론된다. 이유는 모르겠지만 아마 약간의 기술적인 어려움이 있는 것이 아닐까 예상된다.

함수가 상황에 따라 여러가지 타입의 값들을 리턴하는 경우에서도 리턴 값이 위와 동일한 룰을 따라 추론된다. 다만 상수를 리턴하면 그 값 자체가 타입으로 인식되는 리터럴 타입으로 추론된다.