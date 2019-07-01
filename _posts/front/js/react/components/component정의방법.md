# 컴퍼넌트 정의 방법

1. React.createClass를 이용
2. function이용
3. class이용(ES6)

# example

```js
// 1) As a function of props
const Button = ({ children, color }) => ({
  type: "button",
  props: {
    className: "button button-" + color,
    children: {
      type: "b",
      props: {
        children: children
      }
    }
  }
});

// 2) Using the React.createClass() factory
const Button = React.createClass({
  render() {
    const { children, color } = this.props;
    return {
      type: "button",
      props: {
        className: "button button-" + color,
        children: {
          type: "b",
          props: {
            children: children
          }
        }
      }
    };
  }
});

// 3) As an ES6 class descending from React.Component
class Button extends React.Component {
  render() {
    const { children, color } = this.props;
    return {
      type: "button",
      props: {
        className: "button button-" + color,
        children: {
          type: "b",
          props: {
            children: children
          }
        }
      }
    };
  }
}
```

Component는 ES6의 class문법을 사용하여 정의할 수 있고 React.createClass 문법을 통하여 정의할 수 있고, stateless한 Component에 대하여 functional Component 방식으로 정의할 수 있습니다.

class문법을 사용하여 React.Component를 extends 하는 방식으로 컴포넌트를 정의.

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello React World!</h1>;
  }
}
```

React.createClass(…) 를 사용하는 방법도 있지만 요즘 잘 사용되지 않는 추세입니다.

### Reference Link:

https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
https://velopert.com/2994
https://jaeyeophan.github.io/2017/05/19/React-2-Elements-and-Component/
