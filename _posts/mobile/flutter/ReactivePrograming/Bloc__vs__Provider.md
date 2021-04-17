Provider가 주목받게된 배경
 

Provider 는 올해 Google IO (2019 Google IO) 에서 추천되면서 큰 주목을 받았습니다.

원래 커뮤니티에서 만든 플러그인인데 구글에서 공식으로 추천을 한 거죠.

 

작년 구글 IO 떄 구글은 Bloc 패턴을 사용하길 권했습니다.

Bloc 패턴은 UI와 데이터 처리 로직(비즈니스 로직)을 분리하는 방식입니다.

 

플러터는 UI도 코드다 보니, 잘 관리 안 해주면

코드가 한 클래스에 너무 많이 몰리는 문제가 있었습니다.

 

이를 해결하기 위해 나온 게 Bloc 패턴입니다.

그런데 BLoc 패턴은 사용하기 너무 어렵다는 사람이 많았습니다.

단순한 로직을 짜려고 해도 4개 정도는 클래스를 만들어야 했죠.

 

반면 Provider 패턴을 쓰면 데이터 공유나 로직의 분리를 좀 더 간단히 할 수 있습니다.

 

## 프로바이더 패턴을 쓰는 이유는?
 

a. 관심사의 분리 (separation of concerns)
관심사의 분리는 디자인 원칙의 하나입니다.

보통 관심사는 어떤 코드가 하는 일을 말합니다.

UI를 담당하는 코드, 네트워크를 담당하는 코드, 데이터를 담당하는 코드 등

코드를 역할에 따라 나눌 수 있죠.

 

보통은 한 클래스가 여러 역할을 할 수록, 클래스가 커지고 관리가 어렵게 됩니다.

따라서 클래스가 하나의 역할(관심)만 갖도록, 클래스를 나누죠.

 

이게 바로 관심사의 분리입니다.

 

Provider나 Bloc 패턴을 쓰는 이유는 관심사의 분리를 위해서에요.




---

素のBLoC自前実装はともかく、blocパッケージは色々手厚くて良いかもとは思いつつ、僕は以下の理由で今のところ採用したいとは思いません。
Provider/Riverpodでbuilderコールバックを使わずにフラットに書くスタイルが気に入っている
Provider/Riverpodからblocに変えることで受ける恩恵が思い浮かばない



https://medium.com/flutter-jp/state-1daa7fd66b94
https://software-creator.tistory.com/26