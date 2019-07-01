特定の React コンポーネントの子要素に親要素から props を暗黙的に渡す方法

React の Children.map メソッドで children をループで検査して、props を渡したいコンポーネントなら cloneElement で props を追加します。React コンポーネントに static メンバを追加すると、親要素から child.type.displayName のようにアクセスできるので、それでコンポーネントを特定します。用意したコンポーネント以外を子要素に入れられたくない場合は、console.warn などで警告を出してあげると親切です。

https://qiita.com/keito_jp/items/a0f86ee87f8dca558434
