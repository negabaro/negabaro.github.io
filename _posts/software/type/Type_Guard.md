타입 가드(Type Guard)
타입 가드는 타입 단언을 좀 더 깔끔하게 할 수 있도록 도와준다. 앞서 타입 단언에서 소개한 예제에서는 isWizard라는 메소드로 해당 인스턴스가 해당 타입이라는 사실을 확정했다. 하지만 이건 런타임에서만 알 수 있는 사실이고 TypeScript 컴파일러는 알 수 없었다. 타입 가드는 이러한 런타임에서의 타입 체크를 컴파일러에게 알려주는 기능이다.
1
2
3
4
5
6
7
8
class Character {
  isWizard(): this is Wizard {
    return this instanceof Wizard;
  }
  isWarrior(): this is Warrior {
    return this instanceof Warrior;
  }
}
이런식으로 런타임에서 실제 타입검사를 하는 메소드의 리턴타입으로 {variable} is {Type} 같은 문법을 사용해 선언해주면 된다.

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
    character.fireBall(); // Pass
  } else if (character.isWarrior()) {
    character.attack(); // Pass
  } else {
    character.runAway();
  }
}
이제 별도의 타입 단언 문법 없이도 if 블록 안에서 character가 Wizard나 Warrior로 잘 추론된다. 그리고 사실 instanceof 와 typeof 같은 오퍼레이터가 일종의 타입 가드이기도 하다.

1
2
3
4
5
6
7
8
function doSomething(val: string | number) {
  if (typeof val === 'number') {
    val.toFixed(); // Pass, val은 number 타입으로 추론
  } else {
    // Union 타입에서 `number`는 이미 통과했으므로 자동으로 `string`으로 추론됨
    val.toLowerCase(); // Pass, val은 string 타입으로 추론
  }
}
사족: 타입 선언은 언제하는가?
별도의 선언이 없어도 추론이 잘 되는 경우에는 타입 선언을 하지 않고, 그렇지 않은 경우에만 선언하는 것이 편리하고 자연스럽다. 예를 들면,

1
const regex: RegExp = new RegExp(/pattern/);
위와 같은 상황에서 : RegExp 라는 코드는 불필요한 선언으로 간주하고 지운다. 하지만 다음처럼 변수 생성과 동시에 값을 할당하지 않는 경우,

1
2
let regex = null;
regex = new RegExp(/pattern/);
이런 상황에서는 regex 변수의 타입 추론이 제대로 되지 않으므로 타입을 같이 선언해준다.

https://hyunseob.github.io/2017/12/12/typescript-type-inteference-and-type-assertion/