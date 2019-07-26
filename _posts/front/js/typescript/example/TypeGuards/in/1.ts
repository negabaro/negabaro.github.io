//https://jaeyeophan.github.io/2018/01/10/TS-7-TypeScript-type-system/
interface A {
  x: number;
}
interface B {
  y: string;
}

function execute(q: A | B) {
  if ("x" in q) {
    // q: A
  } else {
    // q: B
  }
}

//A 또는 B를 유니온 타입으로 받을 수 있는 execute 함수 내에서 각각에 대해 다른 처리를 할 경우,
//in이라는 오퍼레이터를 사용할 수 있습니다. 해당 오퍼레이터는 check하고자 하는 타입에
//해당 프로퍼티가 존재하는지의 유무를 판단할 수 있습니다
