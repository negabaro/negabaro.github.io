# 原則(renderToString の場合)

server-side rendering では、サーバー側で React.renderToString で生成した HTML の DOM 構造とブラウザ側で React.render して生成された Component の DOM 構造が同じである必要があります。
これは HTML に付与される data-react-checksum という値を使って比較しています。

renderToString

https://qiita.com/koba04/items/a62a30c6934466ea8dea
https://www.popit.kr/react-%EC%84%9C%EB%B2%84%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81/
https://dev-momo.tistory.com/entry/React-Server-Side-Rendering
