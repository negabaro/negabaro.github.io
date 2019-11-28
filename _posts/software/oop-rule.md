


# 캡슐화, 응집도, 결합도


# 캡슐화 (Encapsulation)

보여줄건 보여주고 보여주지 말건 보여주지 말자

예를 들어 클래스의 모든 멤버가 public 이라고 하자 그러면 마음대로 밖에서 접근할 테고 혹시라도 한가지 라도 바뀌게 되면 그것을 사용한 모든곳에서 변경이 일어나야 하는 마음이 뜨거워지는 상황이 온다 즉 보여주는게 많은 만큼 변경할때의 변경할 것도 많다는 것이다.
최소한으로 보여주고 변경을 줄이자



# 응집도 (Cohesion)

한개의 클래스가 한가지 기능의 얼마나 집중하는가

낮은 재사용성, 유지보수 힘듬, 코드 이해하기 어려움, 변경이 생길시 모두가 힘듬
이라는 기능이 있다 각 기능별로 다른 클래스로 분리 해 놓는 다면 코드 보기도 편하고 이해하기도 쉽고 변경도 쉬워질 것이다.


출처: https://supercoding.tistory.com/29 [Super Coding]

# 결합도 (Coupling)

클래스 와 클래스가 얼마나 연관이 되어있는가

A 클래스와 B 클래스가 서로 많이 겹쳐 있으면 겹쳐 있을 수록 재사용성 유지보수가 힘들어진다 A가 바뀌면 B도 바뀌어야 한다 반대의 경우도 마찬가지 작은 수정에
수많은 곳에서 일어나는 빨간줄에 마음이 메마를것이다
응집도가 높아지면 결합도가 낮아진다


출처: https://supercoding.tistory.com/29 [Super Coding]

출처: https://supercoding.tistory.com/29 [Super Coding]


출처: https://supercoding.tistory.com/29 [Super Coding]

출처: https://supercoding.tistory.com/29 [Super Coding]


https://supercoding.tistory.com/29