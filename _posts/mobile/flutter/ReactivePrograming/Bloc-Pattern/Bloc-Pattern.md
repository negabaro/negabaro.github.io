

## Bloc Pattern

Bloc 패턴이 쓰이는 이유?

UI와 비즈니스 로직을 분리해 개발을 원활히 하고자 함입니다.
비즈니스 로직은 데이터베이스 조회나 서버와의 통신 등 데이터를 처리하는 부분을 말합니다.
UI와 비즈니스 로직을 분리하면, UI를 수정하는 일이 비즈니스 로직에 영향을 미치지 않고 비즈니스 로직의 변경이 UI에 영향을 미치지 않게 됩니다. 테스트가 용이해지고, UI의 변경이 손쉬워집니다. 또한 위젯 build 횟수가 줄어들게 됩니다. 성능면에서도 이점이 있죠.
기존의 MVC와 유사합니다.
 

Bloc 패턴 그림
UI Screen
B L O C
Data Provider
 

Bloc 패턴을 앱에다 어떻게 적용할까?
앱에 블락 패턴을 쓰려면 3가지를 해야합니다.

Bloc을 만들고 필요한 로직을 구현한다.
BlocProvider을 만든다. BlocProvider는 로직(Bloc)을 UI에 건내주기만 합니다. Provider(제공자)란 이름에 맞는 역할이지요.
BlocProvider를 통해 건내받은 Bloc을 StreamBuilder와 연결합니다.



BLOC는 비즈니스 로직을 네트워크나 저장소에서 분리하고 UI 화면 사이에서 이벤트 및 데이터를 수신하고 전달하는 비즈니스 로직 패턴입니다.

BLOC는 추가로 Reactive Programming을 기본 기술로 사용하여 이벤트와 데이터 흐름을 처리합니다. Reactive Programming은 데이터 스트림을 비동기적으로 처리해야하는 문제를 해결하는 방법입니다. BLOC는 Reactive Programming을 사용하기 때문에 rxdart를 사용합니다.

BLoCパターンは、Business Logic Componentの略ですね。

ビジネスロジックを1つのコンポーネントとして管理することで、UIと明確に責務を分割するために利用するアーキテクチャであると私は解釈しています。

BLoCパターンについては、下の動画でみっちり解説されているので参考にしましょう。
参考：https://www.youtube.com/watch?v=PLHln7wHgPE


## FlutterでBLoCパターンアーキテクチャを導入した理由
FlutterでBLoCパターンのアーキテクチャを導入した理由としては下記です。

単純にファイルごとの責務分割をしてデータの流れを一方通行にしたかったため
楽にリビルドを最小限に抑える実装にしたかったため
状態を一箇所にまとめることでコードの見通しがよくしたかったため
Flutterで開発している時に、1ファイルで結構なんでも出来てしまっていました。

それこそ、サーバーへリクエストして、レスポンスのJsonをデコードしてモデルにオブジェクトをマッピングして、マッピングされたデータを取り出して、UIに描画するみたいなことが、1ファイルで出来てしまったのです。

ファイルがきちんと責務分割されていない上に、色んな方向にデータが飛び交っていたことから、開発メンバーが機能追加したら原因不明のバグ(解析にアホほど時間がかかるという意味の)が頻繁に起きていました。

また、状態管理について特に何も考えていなかったため、Android StudioのFlutter Performanceを見ると、えげつないくらいリビルドが走っていました。

それと、ページ遷移をする際にNavigator.of(context).push()の引数でオブジェクトを渡しまくっていて、Widgetごとに状態を管理する状況で、状態管理が超絶煩雑になってしまっており、新しいページを追加したり、機能追加するたびに脳内のメモリが持って行かれていました。

とにかく、カオスな状況を打開したくて、BLoCパターンのアーキテクチャを導入しようと思ったわけです。

## 메모

BLoCパターンでは、Streamを利用するため、アーキテクチャ導入を検討している人は、async libraryについて理解しておく必要があると思っています。

※上記のBLoCパターンでは、Dart標準のStreamではなくRxDartを利用している


---

【Dart/Flutter】導入したBLoCパターンアーキテクチャについて全体像をまとめてみた
https://qiita.com/arthur_foreign/items/4b1bf1892439780c4690

https://www.youtube.com/watch?v=PgEvawMlRgQ
https://github.com/sudar-life/flutter-bloc-sample
https://centbin-dev.tistory.com/34#:~:text=BLOC%EB%8A%94%20%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4%20%EB%A1%9C%EC%A7%81%EC%9D%84,%EB%82%98%ED%83%80%EB%82%B4%EB%8A%94%20%EC%BD%94%EB%93%9C%EB%A7%8C%20%EC%9E%88%EC%96%B4%EC%95%BC%20%ED%95%A9%EB%8B%88%EB%8B%A4.&text=BLOC%20%EA%B0%9D%EC%B2%B4%20%EC%83%81%ED%83%9C%EA%B0%80%20%EB%B3%80%EA%B2%BD,%EB%93%A4%EB%8F%84%20%EC%A6%89%EC%8B%9C%20%EB%B3%80%EA%B2%BD%EB%90%A9%EB%8B%88%EB%8B%A4.