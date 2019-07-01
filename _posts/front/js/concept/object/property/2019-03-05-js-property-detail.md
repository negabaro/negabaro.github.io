# 프로퍼티 여우 꼬리 잡기

위에서 봤던 코드를 조금 더 꼬아볼까요?(이해가 충분히 되셨거나 우선 정의를 이해한 정도로 충분하시다면 아래는 안 보셔도 됩니다.)

```
function Obj() {
     var personProfile = 'foo baz';

     personProfile.get =

         this.getPersonProfile = function () {
             return personProfile;
      }
     this.appendSchoolToPersonProfile = function () {
         personProfile += ' school';
     }
 }

 var obj = new Obj();
 console.log(obj.getPersonProfile()); //undefined
```

이 코드의 핵심적인 부분은 다음과 같습니다. Obj라는 함수의 프로퍼티인 personProfile는 객체입니다. 그런데 이 personProfile의 프로퍼티인 get이 Obj의 프로퍼티인 getPersonProfile을 담고 있습니다. 정확하게는 reference를 담고 있다는 것이죠? 이렇게 되면 자신의 꼬리를 물고 뱅뱅도는 여우같은 코드네요.

이걸 console에서 출력을 하면 undefined가 뜨지만 에러는 아니네요.
[출처][javascript] property란 무엇인가?|작성자 AIdev

# color와`_color`

다음은 프로퍼티 color와 다시 그 안의 프로퍼티 \_color의 관계를 조금 더 살펴보겠습니다.

```
 function Pen() {
	     this._color = null;
	     this.color = 0;
	 }

Object.defineProperties(Pen.prototype, {
	    color: {
	        get: function () {
	            return this._color;
	        },
	        set: function (value) {
	            this._color = value;
	        }
	     }
	 });

	var pen = new Pen();

	console.log(pen._color); // 0
	console.log(pen.color);  // 0;
```

위 코드를 동작시키면 둘다 0이 콘솔에 출력됩니다. 함수 Pen에서 \_color는 분명 null값을 입력 받고 있지만 color에 5가 전해지면서 set 메소드에 의해서 5라는 값이 설정되는 것이죠.

이런 다양한 프로퍼티의 모습을 보면 역시 JavaScript가 비교적 자유로운 언어라는 것을 실감하게 되는 것 같습니다.
[출처][javascript] property란 무엇인가?|작성자 AIdev
