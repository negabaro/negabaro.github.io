//TypeAssertion = Type주장

// <>을 사용하거나
//as 키워드를 사용할 수 있습니다.
//두 가지 모두 동일하지만 tsx와 함께 사용하기 위해서는 as 키워드를 사용하는 것이 좋습니다.
//[!] 이 Type Assertion은 Type Casting과는 다릅니다.
//자세한 내용은 DailyEngineering - 타입 추론과 타입 단언을 참고해주세요!
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type Todos = Todo[];

const initialState: Todos = [
  {
    id: 0,
    text: "Study RxJS",
    completed: false
  }
];

//위 코드에서 Todos에 해당하는 타입을 제대로 지정해줬지만 뭔가 아쉬움이 남을 수 있는데요,
//이 때 두 가지 방법을 사용할 수 있습니다.

//using <>

const initialState2: Todos = [
  <Todo>{
    id: 0,
    text: "Study RxJS",
    completed: false
  }
];

const initialState3: Todos = [
  {
    id: 0,
    text: "Study RxJS",
    completed: false
  } as Todo
];
