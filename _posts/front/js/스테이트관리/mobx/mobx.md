![image](https://user-images.githubusercontent.com/4640346/53172406-9a7d3780-3628-11e9-9994-bc12321205af.png)

redux의 dispatch, action의 개념에 익숙한 유저라면 약간 생소할 수 있다. 각각의 상태를 좀 더 자세히 살펴보자.

state : 어플리케이션의 데이터 상태이다. 개념적으로 mobx는 spreadsheet와 유사하다고 한다. objects, arrays, primitives, references의 그래프의 형태로 어플리케이션을 구성하게 된다. 이것들은 spreadsheet의 data cells이 될 것이다.
derivations : 파생값이라고 한다. 어플리케이션으로부터 자동으로 계산되는 모든 값을 뜻하게 된다. 이 값들은 간단한 값에서부터 복잡한 시각적 html 표현까지 다양한 값이 될 수 있다. spreadsheet의 개념과 비교하자면 차트를 들 수 있다.
Reaction : reaction은 derivations와 유사한 개념이다. 가장 큰 차이점은 값을 생성하지 않는 함수라는 것이다. 대신 자동으로 특정 작업들을 수행시켜 주고, 이는 대체로 I/O(input, output)과 연관된 작업들이다. reaction은 적당할 때에 자동으로 DOM을 업데이트 하게 해주고 네트워크 요청을 하도록 해준다.
Action : action은 state를 변경하는 모든 것을 말한다. 이 action들은 모두 동기적으로 처리된다.
위에 개념들은 redux를 사용했던 사람들이나 spreadsheet를 모르는 사람(본인 포함)이 처음 보았을 때 굉장히 생소한 개념들 일 수 있다. 때문에 실제로 react와 mobx를 이용한 간단한 프로젝트를 진행하면서 mobx의 개념과 기능들을 간단하게 살펴보도록 하자.

# Observable State (관찰 받고 있는 상태)

# Computed Value (연산된 값)

# Reactions (반응)

# Actions (액션; 행동)

## observable

observable 함수는 Observable State 를 만들어줌

```
import { observable, reaction, computed, autorun } from 'mobx';

// **** Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2
});
```

이렇게 Observable State 를 만들고나면 MobX 가 이 객체를 "관찰 할 수" 있어서 변화가 일어나면 바로 탐지해낼수있습니다.

```
import { observable, reaction, computed, autorun } from 'mobx';
```

##reaction
특정 값이 바뀔 때 어떤 작업을 하고 싶다면 reaction 함수를 사용합니다.

한번 a 나 b 가 바뀔 때 console.log 로 바뀌었다고 알려주도록 코드를 작성해보겠습니다.

```
import { observable, reaction, computed, autorun } from 'mobx';

// Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2
});

// **** 특정 값이 바뀔 때 특정 작업 하기!
reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`a 값이 ${value} 로 바뀌었네요!`);
  }
);

reaction(
  () => calculator.b,
  value => {
    console.log(`b 값이 ${value} 로 바뀌었네요!`);
  }
);

calculator.a = 10;
calculator.b = 20;
```

콘솔쪽을 보시면 다음과 같이 나타날 것입니다.

a 값이 10 로 바뀌었네요!
b 값이 20 로 바뀌었네요!

## 2-2. MobX 스토어 분리시키기

MobX 에도 리덕스처럼 스토어라는 개념이 있습니다. 리덕스는 하나의 앱에는 단 하나의 스토어만 있지만, MobX 에서는 여러개를 만들어도 됩니다. 이번에는, 한번 카운터의 상태 관련 로직을 스토어로 따로 분리시키는 작업을 해보도록 하겠습니다.

스토어 만들기
MobX 에서 스토어를 만드는건 생각보다 간단합니다. 리덕스처럼 리듀서나, 액션 생성함수.. 그런건 없습니다. 그냥 하나의 클래스에 observable 값이랑 함수들을 만들어주면 끝!

### Reference Link:

```
http://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html
https://hyunseob.github.io/2017/10/07/hello-mobx/
https://medium.com/@jsh901220/mobx-%EC%B2%98%EC%9D%8C-%EC%8B%9C%EC%9E%91%ED%95%B4%EB%B3%B4%EA%B8%B0-a768f4aaa73e
https://velog.io/@velopert/MobX-1-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-9sjltans3p
https://velog.io/@velopert/MobX-2-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-MobX-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-oejltas52z
```
