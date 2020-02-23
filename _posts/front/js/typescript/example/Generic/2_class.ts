//https://tsudoi.org/weblog/3360/

class AAA<T> {
  public value: T;

  constructor(t: T) {
    this.value = t;
  }

  public getValue(): T {
    return this.value;
  }
}

var aaa0: AAA<string> = new AAA<string>("hello");
console.log(aaa0.getValue());

var bbb0: AAA<number> = new AAA<number>(100);
console.log(bbb0.getValue());
