Interface: SwiftUI, StoryBoard

SwiftUI と Storyboard が並んでいます。
この選択肢は、SwiftUI を使うか、それ以前の実装方法を使うかを選ぶのとかなり近いです。

![image](https://user-images.githubusercontent.com/4640346/110737075-12e6dd80-8270-11eb-9153-12f5d9633ead.png)

![image](https://user-images.githubusercontent.com/4640346/110737107-1f6b3600-8270-11eb-8ded-a45fa364d66a.png)



Life Cycle: SwiftUI App,UIKit App Delegate


https://teratail.com/questions/244531



従来手法(UIKitとStoryboard)を使った方法の方が分かりやすいし、応用も効くのかなというのが個人的な感想です。

https://qiita.com/os1ma/items/a8b946dba891f01ccc4e

2019 年に登場した、iOS 13 以降でのみ利用可能な新しい UI 実装方法です。
コードで UI を実装することになります。
ざっくり言うと、Flutter での UI 実装と似ていると言われています。

現時点では細かい UI の再現は苦手な場合もあるようです。

なお、SwiftUI と SwiftUI 登場以前の実装方法 (UIKit) は共存可能とのことです。

https://qiita.com/os1ma/items/a8b946dba891f01ccc4e

当然ではありますが、GUI (Storyboard や Xib) で View を構築する方が学習コストや初期実装コストが低いのに対し、UIKit のみで View を構築する方がメンテナンス性・再利用性が高まるのです