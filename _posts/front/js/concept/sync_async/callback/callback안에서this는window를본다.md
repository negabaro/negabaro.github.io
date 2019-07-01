ㄴcallback 함수 안에서의 this는 window를 카르킨다.

```
var o = {
    data : 'dummy',
    time : function(){
            window.setTimeout(function(){ //window. 생략 가능
              console.log('this -->', this); // window 객체
              console.log(this.data);}, 1000) // undefined
              // callback 함수 setTimeout() 안에서의 this는 window 객체를 카르킨다.
     }
}

o.time(); // window 객체, undefined
```

# 해결방법1

callback 함수 내의 this 가 window 객체를 가르키는 문제 해결방법 1 (scope)

```
var o = {
    data : 'dummy',
    time : function(){
      var that = this;
      window.setTimeout(function(){
      	console.log(that.data);}, 1000)
        // scope로 인하여 that은 외부 변수 that을 가져온다.
    }
}

o.time(); // 'dummy'
```

# 해결방법2

callback 함수 내의 this 가 window 객체를 가르키는 문제 해결방법 2 (.bind())
function 객체가 갖고 있는 bind() 메소드 MDN 참고
bind() 메소드는 바로 실행되는 것이 아니라 설정을 저장하는 것
주로 callback 함수에서 많이 쓰인다.

```
var o = {
    data : 'dummy',
    time : function(){
      window.setTimeout(function(){
      console.log(this.data);
      }.bind(this), 1000)}
    // 니가 실행될 때, 니가 가르킬 this는 인자를 가르키도록 실행 해! (저장)
    // bind()는 apply(), call()과는 다르게 바로 실행되지 않는다.
}

o.time(); // 'dummy'
```

https://wayhome25.github.io/javascript/2017/02/18/js-oop-1/
https://wayhome25.github.io/javascript/2017/02/18/js-oop-1/
