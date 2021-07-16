## git upstream


fork사용시 자주 사용하는 개념으로

fork한 리포지토리를 upstream이라 지칭하고 fork해서 지정한 리포지토리에 
내가 JpyRepo를 fork해서 TwiceRepo라는 이름으로 내 github저장소에 복사했다면

upstream은 JypRepo이고 origin은 TwiceRepo가 된다.

github의 fork를 사용하지 않더라도 그러한 구조로 리포지토리를 운영한다면 상류가 upstream이 된다.


Upstream, Downstream의 일반적인 개념
upstream과 downstream은 두 레포간의 관계에 따라 정의되는 상대적인 개념이다. 어떤 한 레포가 절대적으로 업스트림이거나 다운스트림이 아니라는 소리이다.

비유적으로 설명하자면 upstream은 영어 뜻 그대로 하천의 윗부분(상류?)라고 할 수 있다. 물줄기가 위에서 밑으로 내려올 때, 그 위에서 원천이 되는 source를 upstream이라고 칭하는 것이다.

내 래포가 myRepo이고 다른 레포가 otherRepo라 하자. 내가 otherRepo로부터 pull from 해오고(당겨오고) push to한다면 내 myRepo가 downstream, otherRepo가 upstream으로 정의된다.

하나의 업스트림에 여러 개의 다운스트림이 있을 수 있다.

 

Origin과 Upstream의 차이
어떤 때는 remote origin이라고 하고, 어떤 때는 remote upstream이라고 하고..

원격저장소가 remote인건 알겠는데 그럼 origin은 뭐고 upstream은 뭐지?

이는 깃허브 fork 맥락에서 이해되어야 한다.

내가 다른 사람의 레포를 포크해왔을 때에 upstream은 일반적으로 오리지널 레포(다른 사람의 레포)를 의미한다. 즉 내가 OtherRepo를 fork해왔다고 할 때에 이 OtherRepo가 오리지널 레포이고 upstream은 이를 지칭하는 것이다.

한편 origin은 내 포크를 의미한다. 레포가 클론될 때에 디폴트 리모트는 origin이라고 불린다. 그러니까 내 포크를 myRepo라고 할 때, 클론하면 이것이 내 레포가 origin이 된다. 내가 오리지널 레포의 변화를 추적하고 싶으면 upstream이라는 이름의 리모트를 추가해야 한다.

https://blog.aaronroh.org/120
https://pythonq.com/so/git/284676
https://developer-alle.tistory.com/315