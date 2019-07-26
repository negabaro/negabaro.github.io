//https://jaeyeophan.github.io/2018/01/10/TS-7-TypeScript-type-system/

interface Named {
  name: string;
}

interface Age {
  age: number;
}

class Person {
  name: string;
}

let p: Named;
p = new Person();

let p2: number;
p2 = new Person(); //Type 'Person' is not assignable to type 'number'.
