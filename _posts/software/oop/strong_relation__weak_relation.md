



Car 클래스에 선언된 engine 객체는 Car 객체가 new로 생성될 때 함께 생성되고 객체(myCar)가 null이 되면 함께 제거된다. 수명주기를 함께 하므로 강한 관계가 된다.

class Engine { }
class Car {  
  private engine;
  constructor(engine: Engine) {
    this.engine = new Engine();
  }
}
let engine = new Engine();
let myCar = new Car(engine);
car 객체에 null이 할당돼 제거되더라도 engine 객체는 Car 클래스 외부에 선언돼있으므로 제거되지 않는다. 수명주기를 함께 하지 않으므로 약한 관계가 된다.





https://velog.io/@denmark-banana/TypeScript-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%99%80-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4