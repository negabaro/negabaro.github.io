```js
const children = this.props.children;

const childrenWithProps = React.Children.map(children, child =>
  React.cloneElement(child, { doSomething: "hoge" })
);
```

https://blog.mudatobunka.org/entry/2016/08/14/182333
https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children

React.cloneElement() は this.props.children をカスタマイズする以外にもいろいろな用途で使えるはずです。
