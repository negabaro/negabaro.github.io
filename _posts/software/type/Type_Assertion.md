타입 단언(Type Assertion)
TypeScript 의 타입 추론 기능은 매우 강력하지만 어쩔 수 없는 한계가 존재한다. 타입 단언은 TypeScript 컴파일러가 타입을 실제 런타임에 존재할 변수의 타입과 다르게 추론하거나 너무 보수적으로 추론하는 경우에 프로그래머가 수동으로 컴파일러한테 특정 변수에 대해 타입 힌트를 주는 것이다.

다음 예제를 살펴보자.

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
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
class Character {
  hp: number;
  runAway() {
    /* ... */
  }
  isWizard() {
    /* ... */
  }
  isWarrior() {
    /* ... */
  }
}

class Wizard extends Character {
  fireBall() {
    /* ... */
  }
}

class Warrior extends Character {
  attack() {
    /* ... */
  }
}

function battle(character: Character) {
  if (character.isWizard()) {
    character.fireBall(); // Property 'fireBall' does not exist on type 'Character'.
  } else if (character.isWarrior()) {
    character.attack(); // Property 'attack' does not exist on type 'Character'.
  } else {
    character.runAway();
  }
}
이 코드는 컴파일 에러를 낸다. Character 클래스에는 fireBall, attack 메소드가 선언조차 되어있지 않기 때문이다. 하지만 프로그래머 입장에서 바라보면 isWizard라는 메소드를 통해 확실히 그 캐릭터가 Wizard 인스턴스라는 걸 보장할 수 있다면, if 블록 안에서는 당연히 fireBall이라는 메소드를 사용할 수 있어야 한다.

이 때, 타입 단언으로 적절한 타입을 다시 선언해줄 수 있다.

1
2
3
4
5
6
7
8
9
function battle(character: Character) {
  if (character.isWizard()) {
    (character as Wizard).fireBall(); // Pass
  } else if (character.isWarrior()) {
    (character as Warrior).attack(); // Pass
  } else {
    character.runAway();
  }
}
해당 변수가 실제로 Wizard 인스턴스가 아니더라도 as 키워드를 통해서 타입 단언을 해줄 수 있기 때문에, 타입 단언은 주의해서 사용해야 한다. 실제로도 as any 라는 치트키로 대부분의 컴파일 에러를 해결할 수 있다. 하지만 이런 키워드가 코드 베이스에 득시글 거릴 수록 TypeScript 를 사용해서 얻는 장점이 점차 사라져가기 때문에, 기왕 TypeScript 를 사용하기로 마음 먹었다면 as와 any는 가능한 적게 사용하는 것이 좋다. 물론, 아예 사용하지 않기는 어렵다.

타입 단언이 타입 캐스팅이 아닌 이유
타입 단언은 타입을 변경한다는 사실 때문에 타입 캐스팅과 비슷하게 느껴질 수 있다. 타입 단언이 타입 캐스팅이라고 불리지 않는 이유는 런타임에 영향을 미치지 않기 때문이다. 타입 캐스팅은 컴파일타임과 런타임에서 모두 타입을 변경시키지만 타입 단언은 오직 컴파일타임에서만 타입을 변경시킨다.

<Type> vs as Type
타입 단언 문법은 <Type> 과 as Type 으로 두 종류다. 아래처럼 사용할 수 있다.

1
2
(<Wizard>character).fireBall();
(character as Wizard).fireBall();
그냥 보기에는 <Type> 키워드가 좀 더 깔끔해보이지만, 대개 as Type 키워드가 추천된다. React 와 React 에서 빼놓을 수 없는 문법인 JSX 를 사용하는 경우 <Type> 키워드는 JSX 의 문법과 겹치기 때문에 불편한 면이 있다