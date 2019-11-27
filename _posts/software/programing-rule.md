---
layout: post
title:  "프로그래밍 법칙"
author: negabaro kim
categories: software
tags:	software
---


# 1. 파레토 법칙 (Pareto principle) 



  : 80 대 20 법칙, 전체 결과의 80%가 전체 원인의 20%에서 일어나는 현상

    (80% of the time spent on a software project is invested in 20% of the functionality.)



  소프트웨어의 개발 80%를 20%의 기능을 개발하는데 소비한다. 프로그램 사용자의 20%가 80%의 부하를 발생시킨다. 등으로 사용이 된다. 프로젝트를 설계할 때 이 법칙을 감안해서 설계를 하면 프로젝트를 위험에 빠트리게 하는 위험요소들을 사전에 파악하고 관리가 가능할 것이다. (예를 들어서 중요한 기능을 먼저 구현하던지 특정 사용자들에게서 집중적으로 자원이 소모되는 것을 감안해서 설계 하고 테스팅한다.)



출처: https://hongjinhyeon.tistory.com/138 [생각대로 살지 않으면 사는대로 생각한다.]

출처: https://hongjinhyeon.tistory.com/138 [생각대로 살지 않으면 사는대로 생각한다.]



# 3. 콘웨이 법칙(Conway’s law)

코드 구조는 개발팀의 구조를 따라간다는 법칙. 

(organizations which design systems ... are constrained to produce designs which are copies of the communication structures of these organizations)



 예를 들면, 컴파일러를 네개의 그룹에서 만든다면 컴파일러는 네 단계로 구성된다.  이것은 어떻게 보면 당연한 결과인데, 팀의 구조다 다르면 콤포넌트로 분리되서 서로 인터페이스로 연계가 된다. 이것에는 장단점이 존재하게 되는데 적절한 수준에서 구조를 정리하고 팀이 분리되어 있더라도 통합이 필요한 것은 통합을 해서 적정수준으로 코드구조를 관리해야한다.



출처: https://hongjinhyeon.tistory.com/138 [생각대로 살지 않으면 사는대로 생각한다.]

출처: https://hongjinhyeon.tistory.com/138 [생각대로 살지 않으면 사는대로 생각한다.]


# 데메테르의 법칙(디미터의 법칙)
메테르 법칙은 최소 지식의 원칙 이라고도 하는데 모르는 사람한테 일시키지 말자는 원칙이다.

출처: https://supercoding.tistory.com/29 [Super Coding]

Actor a = WorldManager.GetActorManager().GetActor("asdf");

이러지 말라는 이야기이다 자신과 직접적인 관련이 있는 클래스에게 일을 시켜야
한다 모듈간의 의존성을 낮추어 준다 Singleton 패턴도 이 법칙을 위반한 다고 할 수 있다 하지만 너무 이 법칙을 지켜야만 한다 라는 마인드는 설계가 더 복잡해 질 수 있으므로 참고 정도만 하자


출처: https://supercoding.tistory.com/29 [Super Coding]

別名最小知識の法則。デメテルは、豊穣の女神。アスペクト指向などの研究であった「デメテルプロジェクト」に由来。

基本的な考え方は、任意のオブジェクトが自分以外（サブコンポーネント含む）の構造やプロパティに対して持っている仮定を最小限にすべきであるという点にある。

単純化して説明すると、オブジェクトの"メンバーのプロパティ/メソッド"を直接触らないようにするということ。

// デメテルの法則に違反している
console.log(aStudent.class.grade)

// デメテルの法則に違反していない
console.log(aStudent.getGrade())

できる限り、サブコンポーネントに関する知識を持たずにすむように実装するための原則。

https://supercoding.tistory.com/29
https://smjeon.dev/etc/law-of-demeter/
https://www.slideshare.net/SangminLim/ss-63457159
https://blog.aliencube.org/ko/2013/12/06/law-of-demeter-explained/


# 위쓰의 법칙(Wirth's Law,ヴィルトの法則)
「ソフトウェアは、ハードウェアが高速化するより急速に低速化する」という経験則。
http://ja.wikipedia.org/wiki/%E3%83%B4%E3%82%A3%E3%83%AB%E3%83%88%E3%81%AE%E6%B3%95%E5%89%87

計算資源が豊富になると富豪的プログラミングで、生産性に寄与するようにフレームワーク等が進化するので、
ハードウェアが進歩しても、ソフトウェアの速度は変わらないように感じるということだろう。

하드웨어가 진화해도 소프트웨어의 속도는 변하지 않는다(소프트웨어는 하드웨어보다 빨리 느려지므로)

유명한 수학자이자 소프트웨어(컴퓨터공학자)인 Niklaus Wirth가 1995년 관찰한 것으로 "소프트웨어는 하드웨어가 빠르게되는 것보다 더 빨리(급하게) 느려진다" (software is getting slower more rapidly than hardware becomes faster.) 것입니다.



# 브룩스의 법칙(ブルックスの法則)
「遅れているソフトウェアプロジェクトへの要員追加は、プロジェクトをさらに遅らせるだけだ」という経験則。
これの言い換えである「9人の妊婦を集めても、1ヶ月で赤ちゃんを出産することはできない」はとてもわかりやすい。

これが成り立つ背景としては、「プロジェクトへの習熟までに時間がかかること」「コミュニケーションコストが増大すること」が挙げられている。
http://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AB%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AE%E6%B3%95%E5%89%87

# コンウェイの法則
organizations which design systems ... are constrained to produce designs which are copies of the communication structures of these organizations

—M. Conway[2]
http://en.wikipedia.org/wiki/Conway%27s_Law

「システムを設計する組織は、自分たちの組織のコミュニケーション構造をそっくりそのままコピーした設計を生み出してしまう」という原則。

事実近年の研究では、組織構造がバグの再現率に最も寄与するという研究結果も出ている。
http://research.microsoft.com/apps/pubs/default.aspx?id=70535

# ホフスタッターの法則
「いつでも予測以上の時間がかかるものである — ホフスタッターの法則を計算に入れても。」
という自己言及的な見積もりに関する法則。
http://ja.wikipedia.org/wiki/%E3%83%80%E3%82%B0%E3%83%A9%E3%82%B9%E3%83%BB%E3%83%9B%E3%83%95%E3%82%B9%E3%82%BF%E3%83%83%E3%82%BF%E3%83%BC#.E3.83.9B.E3.83.95.E3.82.B9.E3.82.BF.E3.83.83.E3.82.BF.E3.83.BC.E3.81.AE.E6.B3.95.E5.89.87

# 驚き最小の原則
インタフェースの2つの要素が互いに矛盾あるいは不明瞭だったときに、その動作としては人間のユーザやプログラマが最も自然に思える（驚きが少ない）ものを選択すべきだとする考え方である。
http://ja.wikipedia.org/wiki/%E9%A9%9A%E3%81%8D%E6%9C%80%E5%B0%8F%E3%81%AE%E5%8E%9F%E5%89%87

インタフェース設計のユーザビリティに関する原則。

# ボーイスカウトの規則
ボーイスカウトが、来る前よりも帰った後の方が山をきれいにしておくことにちなんだ規則。
ソフトウェア開発においては「モジュールをチェックインする際には、必ずチェックアウト時よりも美しくする」ことを意味する。

http://www.amazon.co.jp/exec/obidos/ASIN/4873114799/

# YAGNI
"You ain't gonna need it"の略。「そりゃ必要にならんよ」てな意味。XPに関する格言で、必要になるまで実装するなという意味。
http://ja.wikipedia.org/wiki/YAGNI

# DRY
"Don't Repeat Yourself"の略。「同じことを繰り返すな」という意味。

DRY 原則がうまく適用されたとき、システムに対するいかなる要素の変更も、論理的に関連のない他の要素の変更にはつながらない。さらに、論理的に関連した要素は予測できる形で統一的に変更され、したがってそれらの変更は同期が取れたものとなる。
http://ja.wikipedia.org/wiki/DRY

# KISS
"Keep it simple, stupid" の略。「シンプルにしておけバカ」という意味。

http://ja.wikipedia.org/wiki/KISS%E3%81%AE%E5%8E%9F%E5%89%87

この原則の起源と思われる似た概念がいくつかある。たとえば「オッカムの剃刀」。アルバート・アインシュタインの格言「何事もできるだけ単純な方がいい。ただし単純にしすぎてはならない」。レオナルド・ダ・ヴィンチの「単純であることは究極の洗練だ」の言葉。アントワーヌ・ド・サン＝テグジュペリの「完璧とは、これ以上加えられないときではなく、これ以上削りとれないときに達成されるようだ」。

# SOLID
オブジェクト指向設計に関する原則の頭文字をとって「SOLID」とまとめられた原則集。
http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)

頭文字	略語	コンセプト
S	SRP	Single Responsibility Principle（単一責務の原則）
「クラスを変更する理由は１つでなければならない」
O	OCP	Open/closed principle（開放閉鎖の原則）
「クラスは拡張に対して開き、修正に対して閉じていなければならない」
L	LSP	Liskov substitution principle（リスコフの置換原則）
「派生型はその基本型と置換可能でなければならない」
I	ISP	Interface segregation principle（インターフェース分離の原則）
「クライアントが利用しないメソッドへの依存を強制してはならない」
D	DIP	Dependency inversion principle（依存性逆転の原則）
「上位のモジュールは下位のモジュールに依存してはならない。どちらのモジュールも「抽象」に依存すべきである。」


TODO!!!
https://qiita.com/hirokidaichi/items/d6c473d8011bd9330e63