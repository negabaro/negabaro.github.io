안녕하세요. 이번 시간에는 로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage)에 대해 알아보겠습니다. 이름만 봐도 각각의 기능이 뭔지 대충 알겠죠? 영어에 약하신 분들을 위해 간단히 설명드리자면, 로컬 스토리지와 세션 스토리지는 HTML5에서 추가된 저장소입니다. 간단한 키와 값을 저장할 수 있습니다. 키-밸류 스토리지의 형태입니다.

로컬 스토리지와 세션 스토리지의 차이점은 데이터의 영구성입니다. 로컬 스토리지의 데이터는 사용자가 지우지 않는 이상 계속 브라우저에 남아 있습니다. 하지만 세션 스토리지의 데이터는 윈도우나 브라우저 탭을 닫을 경우 제거됩니다. 지속적으로 필요한 데이터(자동 로그인 등)는 로컬 스토리지에 저장하고, 잠깐 동안 필요한 정보(일회성 로그인 정보라든가)는 세션 스토리지에 저장하면 되겠습니다. 하지만 비밀번호같은 중요한 정보는 절대 저장하지 마세요! 클라이언트에 저장하는 것이기 때문에 언제든지 털릴 수 있습니다.

잠깐, 로컬 스토리지랑 세션 스토리지가 나오기 이전에도 브라우저에 저장소 역할을 하는 게 있긴 했죠? 바로 쿠키입니다. 쿠키는 만료 기한이 있는 키-값 저장소입니다.

document.cookie; // _ga=GAX.X.XXXXXXXXX; _gid=GAX.X.XXXXXXXXX; _gat=1
document.cookie하면 현재 쿠키 정보가 나옵니다.(httponly 플래그로 자바스크립트에서 쓸 수 없게 막아둔 쿠키는 나오지 않습니다) 구글 애널리틱스가 쿠키로 저의 정보들을 추적하고 있네요.

이번 시간은 쿠키에 대한 시간이 아니기 때문에 쿠키를 코딩하는 방법에 대해서는 다루지 않겠습니다. 쿠키는 4kb 용량 제한이 있고, 매 서버 요청마다 서버로 쿠키가 같이 전송됩니다. 왜 서버에 쿠키가 전송될까요?

그것을 알기 위해서는 HTTP 요청에 대해 먼저 간단히 알아야 합니다. HTTP 요청은 상태를 가지고 있지 않습니다. 무슨 말인가 하면, 브라우저에서 서버로 나에 대한 정보를 가져오라는 GET /me라는 요청을 보낼 때, 서버는 요청 자체만으로는 그 요청이 누구에게서 오는 지 알 수 없습니다. 그래서 응답을 보낼 수가 없죠. 이 때 쿠키에 나에 대한 정보를 담아서 서버로 보내면 서버는 쿠키를 읽어서 내가 누군지 파악합니다. 쿠키는 처음부터 서버와 클라이언트 간의 지속적인 데이터 교환을 위해 만들어졌기 때문에 서버로 계속 전송되는 겁니다.
이게 문제가 되기도 합니다. 만약 4kb 용량 제한을 거의 다 채운 쿠키가 있다면, 요청을 할 때마다 기본 4kb의 데이터를 사용합니다. 4kb 중에는 서버에 필요하지 않은 데이터들도 있겠죠. 데이터 낭비가 발생하는 겁니다. 바로 그런 데이터들을 이제 로컬 스토리지와 세션 스토리지에 저장할 수 있습니다. 이 두 저장소의 데이터는 서버로 자동 전송되지 않습니다.

두 스토리지는 모두 window 객체 안에 들어 있습니다. Storage 객체를 상속받기 때문에 메소드가 공통적으로 존재합니다. 도메인 별 용량 제한도 있습니다.(프로토콜, 호스트, 포트가 같으면 같은 스토리지를 공유합니다) 브라우저별로, 기기별로 다르긴 하지만 모바일은 2.5mb, 데스크탑은 5mb~10mb라고 생각하시면 됩니다. 작다고 생각하실 수도 있지만 키-값만 저장하는 것이기 때문에 괜찮습니다. 쿠키가 4kb인것을 생각하면 크죠. 이게 부족하다면 50mb를 기본적으로 저장할 수 있는 IndexedDB가 있습니다. 나중에 알아봅시다.

로컬 스토리지
로컬 스토리지는 window.localStorage에 위치합니다. 키 밸류 저장소이기 때문에 키와 밸류를 순서대로 저장하면 됩니다. 값으로는 문자열, 불린, 숫자, null, undefined 등을 저장할 수 있지만, 모두 문자열로 변환됩니다. 키도 문자열로 변환됩니다.

localStorage.setItem('name', 'zerocho');
localStorage.setItem('birth', 1994);
localStorage.getItem('name'); // zerocho
localStorage.getItem('birth'); // 1994 (문자열)
localStorage.removeItem('birth');
localStorage.getItem('birth'); // null (삭제됨)
localStorage.clear(); // 전체 삭제
메소드를 간단히 설명하자면, localStorage.setItem(키, 값)으로 로컬스토리지에 저장한 후, localStorage.getItem(키)로 조회하면 됩니다. localStorage.removeItem(키)하면 해당 키가 지워지고, localStorage.clear()하면 스토리지 전체가 비워집니다.

localStorage.setItem('object', { a: 'b' });
localStorage.getItem('object'); // [object Object]
객체는 제대로 저장되지 않고 toString 메소드가 호출된 형태로 저장됩니다. [object 생성자]형으로 저장되는 거죠. 객체를 저장하려면 두 가지 방법이 있습니다. 그냥 키-값 형식으로 풀어서 여러 개를 저장할 수도 있습니다. 한 번에 한 객체를 통째로 저장하려면 JSON.stringify를 해야됩니다. 객체 형식 그대로 문자열로 변환하는 거죠. 받을 때는 JSON.parse하면 됩니다.

localStorage.setItem('object', JSON.stringify({ a: 'b' }));
JSON.parse(localStorage.getItem('object')); // { a: 'b' }
이렇게 데이터가 지우기 전까지는 계속 저장되어 있기 때문에 유저 커스터마이제이션에 좋을 것 같습니다. 사용자의 설정(보안에 민감하지 않은)이나 데이터들을 넣어두면 됩니다.


https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048