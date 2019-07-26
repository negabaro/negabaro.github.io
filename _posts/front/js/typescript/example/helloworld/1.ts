class HelloWorld {
  constructor(public displayText: string) {}

  test() {
    return this.displayText;
  }
}

var hello = new HelloWorld("HelloWorld");
document.body.innerHTML = hello.test();
