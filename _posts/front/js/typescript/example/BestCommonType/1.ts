//‘누가봐도 이 변수는 이 타입이다.’라는 것에 대해 TypeScript가 지원해주는 것을 타입 추론 이라고 합니다.

let name2 = `sana`;
//name이라는 변수는 string 타입의 변수가 됩니다.
//그렇기 때문에 굳이 : string이라고 타입을 지정해주지 않아도 다음과 같이 에러가 발생합니다.

name2 = 1; //Type '1' is not assignable to type 'string'

//example2

const mixedArr = [0, 1, `jbee`];

//number에 해당되는 value와 string에 해당하는 value가 공존하기 때문에
//위 코드에서 mixedArr은 (number | string)[]의 타입을 갖게 됩니다.
//이렇게 여러 타입이 공존하는 경우에 추론하여 지정되는 타입을 Best common type이라고 합니다.
