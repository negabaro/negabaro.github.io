## gradle이란

그래들(이하 Gradle)은 그루비(Groovy)를 기반으로 한 빌드 도구이다. Ant와 Maven과 같은 이전 세대 빌드 도구의 단점을 보완하고 장점을 취합하여 만든 오픈소스로 공개된 빌드 도구이다.




## Gradle의 특징
Gradle은 앞서 살펴본 Ant와 Maven이 가진 장점을 모아 만들었다. 의존성 관리를 위한 다양한 방법을 제공하고 빌드 스크립트를 XML 언어가 아닌 JVM에서 동작하는 스크립트 언어 ‘그루비’ 기반의 DSL(Domain Specific Language)를 사용한다.

그루비(Groovy)는 자바 문법과 유사하여 자바 개발자가 쉽게 익힐 수 있는 장점이 있으며 Gradle Wrapper를 이용하면 Gradle이 설치되지 않은 시스템에서도 프로젝트를 빌드할 수 있다.


## build.gradle

설치가 완료되면 빌드 파일인 build.gradle 파일을 생성해보자. build.gradle 파일은 빌드 스크립트라고 하며 엄밀히 말하면 빌드 구성 스크립트(Build Configuration Script)라고 한다.

의존성이나 플러그인 설정 등과 같은 빌드에 필요한 설정을 하게 된다.

---
https://willbesoon.tistory.com/93

https://madplay.github.io/post/what-is-gradle#:~:text=Gradle%EC%9D%80%20%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%3F,%EA%B3%B5%EA%B0%9C%EB%90%9C%20%EB%B9%8C%EB%93%9C%20%EB%8F%84%EA%B5%AC%EC%9D%B4%EB%8B%A4.
