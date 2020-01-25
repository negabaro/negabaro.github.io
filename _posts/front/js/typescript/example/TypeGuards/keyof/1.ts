//keyof = union インタフェースをunion型にする

const o22 = {
  AGE: 31,
  NAME: "foo"
};

function test(key1: keyof o22) {}
//key1 -> (parameter) key1: string | number | symbol

function test2(key1: keyof typeof o22) {}

//typeof 로 o22을 인터페이스화
//인터페이스화된 `typeof 022`를 keyof 지정하면 해당 인터페이스의 key값만 가져옴
//key1 -> (parameter) key1: "AGE" | "NAME"
