Mobx-State-Tree
선언 방식이 class 문법이 아니고 객체 리터럴 방식 a = {} 으로 action, observable 을 선언하는 방식이라 직관성이 떨어지고 기존 react component 선언이 class 문법을 주로 사용하는데 이질감이 느껴집니다.

특징 - 모델객체를 생성할 때 객체차제 타입을 지정할 수 있는 기능을 제공함.

직관성 - 1/5
객체-컬렉션 편의 메소드 - X
rest-api method - X

Json-Mobx
모델라이브러리 이긴하나 원래값을 되돌리는 목적으로 만들어 진 듯 하며 찾고자하는 모델라이브러리의 목적에 부합하지 않았습니다.

직관성 - 1
객체-컬렉션 편의 메소드 - X
rest-api method - X

Mobx-Rest - 직접테스트완료
모델생성과 rest api method 및 객체 관리 자체 편의 메소드가 제공됨 유력한 후보였으나 테스트로 사용해본결과 Model List 구조에서 array가 observable 안되는 경우가 있었습니다.

직관성 - 4/5
객체-컬렉션 편의 메소드 - 4/5
Rest Api Method - 4/5

Libx - 직접 테스트 완료
모델 선언 방식은 직관적임, 모델간에 관계를 맺을 수도 있음, 모델 객체를 자체를 편의 메소드도 제공됨 다만 rest-api method는 없음 다른 객체와 관계 맺는 것이 조금 직관성이 떨어짐, 객체를 생성하고 다루는 방식이 별도의 제공되는 메소드를 이용해야지만 의도한대로 동작해서 혼란스럽고 개발시에 많은 삽질을 요구할 듯 합니다. collection을 지정된 모델에 매핑 할때 object.assign 즉 기존 모델 class에 attribute를 추가하는게 아니라 완전히 대체 해버립니다. 그래서 Model class 에 메소드나 기본 property를 선언 해놓고 api 호출한 데이터의 property를 추가하고 싶을 경우에는 사용 할 수가 없었습니다.

직관성 - 4/5
객체-컬렉션 편의 메소드 - 4/5
Rest Api Method - X

Mobx-Collection-Store
모델선언방식이 이상함 클래스안에 프로퍼티를 선언하는게 아니고 클래스를 생성해놓고 이후에 프로퍼티를 추가하는 형태 (직관성이 떨어짐) rest-api method가 포함된건 mobx-jsonapi-store를 사용해야합니다.

같은 라이브러린데 rest-api 로 호출한 객체를 생성하는 거라서 따로 써야됨

직관성 - 1/5
객체-컬렉션 편의 메소드 - 3/5
Rest Api Method - X

Mobx-Model
모델 선언 시 프로퍼티를 선언하는 방식이 static 으로 선언하게 되어 있습니다. 관계도 설정할 수 있는데 좀 번잡스러운 느낌, rest-api method 제공되는데 제일 번잡스럽습니다.

직관성 - 1/5
객체-컬렉션 편의 메소드 - 1/5
Rest Api Method - X

Mobx-Spine
모델선언은 직관적이나 관계형성 serialize, 객체 관리 편의 메소드가 미제공, rest-api method는 제공되나 store에 선언하는 방식임 전제적으로 좀 빈약합니다.

직관성 - 2/5
객체-컬렉션 편의 메소드 - X
Rest Api Method - 1/5

Mmlpx
모델선언 직관적임, 특이점은 DI 방식을 적용 @inject 데코레이션으로 다른 mobx 스토어나 mobx model 객체를 Inject 할 수 있습니다.(spring과 유사함) 그러나 객체나 컬렉션 자체 편의 메소드는 없고, rest-api method 없음, 특징으로는 snapshot기능이 있어서 변경되기 전 데이터로 돌리기 하는 기능이 있는 있습니

http://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html
