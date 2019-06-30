# module과 class 비교

![image](https://user-images.githubusercontent.com/4640346/53331240-c4d63a00-3933-11e9-8f12-610243e93011.png)

## class

인스턴스화: 가능
용도: 객체 생성
super class: module
상속: 가능
include: 불가능
extend: 불가능
method: 클래스 메소드 & 인스턴스 메소드

## module

인스턴스화: 불가능
용도: mixin 기능. namesapce
super class: object
상속: 불가능
include: 가능(다른 클래스나 모듈로 include할 수 있음)
extend: 가능
method: 모듈 메소드 & 인스턴스 메소드

## 그외 차이

### 실행방법의 차이

#### module의 실행방법

```
include moduleName
method
```

#### class의 실행방법

```
class = className.new
class.method
```

### class에서는 module을 호출할 수 있지만 module에서는 class를 호출할 수 없음

```
class Parent
  include Son
end
```

↑OK

```
Module Son < Parent

end
```

↑NG

### Reference Link:

```
https://weicomes.tistory.com/109
https://hashcode.co.kr/questions/1312/ruby%EC%97%90-%ED%81%B4%EB%9E%98%EC%8A%A4%EB%9E%91-%EB%AA%A8%EB%93%88%EC%9D%80-%EB%AD%90%EA%B0%80-%EB%8B%A4%EB%A5%B8%EA%B0%80%EC%9A%94
https://qiita.com/miyazawa_shi/items/ad587553041a8a484415
https://qiita.com/fukumone/items/2dd4d2d1ce6ed05928de
```
