useState라는 Hook을 사용하면

# state를 재사용 할 수 있게 해줄 뿐만 아니라,

# 비교적 덜 무거운 함수형 컴포넌트에도 state를 사용할 수 있다

https://dev-momo.tistory.com/entry/React-Hooks

이 함수가 호출되고 나면 배열을 반환하는데요, 그 배열의 첫번째 원소는 상태 값이고, 두번째 원소는 상태를 설정하는 함수입니다

useState 를 사용 할 땐 코드의 상단에서 import 구문을 통하여 불러오고, 다음과 같이 사용합니다.

const [value, setValue] = useState(0);
이러한 문법을 처음 보셔서 헷갈릴 수도 있을 것 입니다. 이 문법은 배열 비구조화 할당 문법입니다. 다음 코드는 배열 비구조화 할당의 더 쉬운 예제입니다.

const array = ['dog', 'cat', 'sheep'];
const [first, second] = array;
console.log(first, second); // dog cat

https://velog.io/@velopert/react-hooks
