//https://jaeyeophan.github.io/2018/01/10/TS-7-TypeScript-type-system/

//사용자에 의해 type으로 정의된 타입에 대해서,
//즉 TypeScript 내부에서 지원하는 primitive type이 아닌
//사용자 정의 타입에 대해서 타입 검사를 수행할 때, .kind를 사용할 수 있습니다.

type Foo = {
  kind: "foo"; // Literal type
  foo2: number;
};
type Bar = {
  kind: "bar"; // Literal type
  bar2: number;
};

function execute(arg: Foo | Bar) {
  if (arg.kind === "foo") {
    console.log(arg.foo2); // OK
    console.log(arg.bar); // Error!
    console.log(arg.kind);
  }
}

//위 코드에서 처럼 type 키워드를 사용하여 별도 타입을 지정할 때, kind라는 프로퍼티를 추가하여 타입 검사를 수행할 수 있습니다.
