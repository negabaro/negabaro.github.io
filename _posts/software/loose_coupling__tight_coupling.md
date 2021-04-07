강한결합 느슨한결합이라고 부른다

密結合(みつけつごう)・疎結合（そけつごう）


느슨한 결합이 의존성이 높고


강한결합은 의존성이 있어 보수할때
기존의 로직에 영향을 줘 버그를 일으킬 가능성이 높다.


rails는 강한결합을 전제로 만들어진 프레임워크다.


왜 rails는 강한결합으로 만들었을까?

COC를 베이스로 

https://wa3.i-3-i.info/word17578.html


느슨한 결합과 강한 결합 ( Loose Coupling VS Tight Coupling ) 이란?





1.간단정의



 느슨한 결합(Loose Coupling)은 다른 클래스를 직접적으로 사용하는 클래스의 의존성을 줄이는 것이고 강한 결합(Tight Coupling)은 클래스와 객체가 서로 의존하고 있는 것이다. 일반적으로 강한 결합은 좋지않다. 왜냐하면 유연성과 코드의 재사용성을 줄이기 때문이다. 또한 변경을 더 어렵게 하고 시험 가능성(testability)을 지연시킨다.





2.강한 결합 ( Tight Coupling )



 강하게 결합된 객체(Tightly Coupled Object)는 다른 오브젝트에 대한 상당히 많은 정보를 필요로 하고 보통 두 객체간의 인터페이스들에게 서로 높은 의존성을 가지고 있다. 타이트하게 연견된 애플리케이션에서 하나의 객체를 변경하는 것은 많은 다른책체들을 변경을 요구한다. 작은 애플리케이션에서는 변경점들을 확인하고 쉽고 놓칠수 있는 가능성도 적지만 많약에 큰 프로젝트이면 그렇지 않다. 그러나 느슨하게 연결된 오브젝트(Loosely Coupled Objects)들은 서로 의존성이 없다.



출처: https://hongjinhyeon.tistory.com/141 [생각대로 살지 않으면 사는대로 생각한다.]

3. 느슨한 결합 (Loose Coupling)



 느슨한 결합은 하나의 콤포넌트의 변경이 다른 콤포넌트들의 변경을 요구하는 위험을 줄이는 것을 목적으로 하는 시스템에서  콤포넌트 간의 내부 의존성을 줄이는 것을 추구하는 디자인 목표다. 느슨한 결합은 시스템을 더욱 유지 할 수 있도록 만들고, 전체 프레임워크를 더욱 안정적으로 만들고 시스템의 유연성을 증가하게 하려는 의도를 가진 포괄적인 개념이다.





출처: https://hongjinhyeon.tistory.com/141 [생각대로 살지 않으면 사는대로 생각한다.]

3-2 장점



-시험 가능성(testability)을 향상시킨다.

-인터페이스에 대한 프로그램의 GOF 원칙(구현 하지 않기)을 준수하는데 도움을 준다.

-The benefit is that it's much easier to swap other pieces of code/modules/objects/components when the pieces aren't dependent on one another.

-높은 변경가능성, 하나의 모듈은 예측하지 않는 방법으로 다른 모듈을 깨지 않는다. 

-IRemote 인터페이스만 준수하면 TV 뿐만아니라 다른 장비도 연동이 가능하다.



출처: https://hongjinhyeon.tistory.com/141 [생각대로 살지 않으면 사는대로 생각한다.]