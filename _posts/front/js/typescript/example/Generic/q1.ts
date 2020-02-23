const o1 = {
  age: 23,
  name: "hoge"
};

const o2 = {
  AGE: 31,
  NAME: "foo"
};

function set2to1<
  K1 extends keyof typeof o1,
  K2 extends keyof typeof o2
>(): //key1: typeof o1[K1] extends (typeof o2)[K2] ? K1 : never,
//key2: typeof o2[K2] extends (typeof o1)[K1] ? K2 : never
void {
  //o1[key1] = o2[key2] as any;
}

/////

function set2to2<K1 extends keyof typeof o1, K2 extends keyof typeof o2>(
  key1: typeof o1,
  key2: typeof o1[K1],
  key3: typeof o1[K1] extends (typeof o2)[K2] ? true : false
  //key1: typeof o1[K1] extends (typeof o2)[K2] ? K1 : never,
  //key2: typeof o2[K2] extends (typeof o1)[K1] ? K2 : never
): void {
  //o1[key1] = o2[key2] as any;
}
