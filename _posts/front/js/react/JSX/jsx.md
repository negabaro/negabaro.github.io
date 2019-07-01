```js
/ This uses JSX syntax.
var helloWorld = <div>Hello World!</div>;

// And this is what the JSX syntax compiles into in JavaScript:
var helloWorld = React.createElement(
  "div",
  null,
  "Hello World!"
);

// And this produces a plain old JavaScript object that looks something like this:
var helloWorld = {
    key: null,
    props: {
        children: "Hello World!" // more stuff in here
    },
    ref: null,
    type: "div"
    // more stuff in here
};
```

React.createElement()를 사용하여 컴포넌트를 정의
사실 JSX로 작성된 element 또는 Component는 React.createElement()로 컴파일됩니다. React에서 일종의 sugar syntax를 제공하는 셈입니다. 즉 1번 case의 예제 코드는 다음과 같이 컴파일됩니다.

```js
class Hello extends React.Component {
  render() {
    return React.createElement("div", null, `Hello React World`);
  }
}
```

### Reference Link:

https://jaeyeophan.github.io/2017/05/19/React-2-Elements-and-Component/
https://medium.com/@fay_jai/react-elements-vs-react-components-vs-component-backing-instances-14d42729f62
https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
