特殊化（Specialization）
特殊化は、 コンポーネントの役割を specialize ても明確なコンポーネントで作られています。 状態に応じて、特定のコンポーネントが区別がされたとき特殊化を利用すれば、よりセマンティックなコードを書くことができます。

```js
  const RedButton =（）=> <Button className = "red">
  const BlueButton =（）=> <Button className = "blue">
  // {this.props.theme === RED？  <RedButton>：<BlueButton>}
```
