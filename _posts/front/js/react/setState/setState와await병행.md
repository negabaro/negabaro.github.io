아니에요 저도 setState가 비동기로 작동하기 때문에 await 붙이고 그랬었는데 옳바른 사용법이 아니었어요.

https://medium.com/@saturnuss/setstate-%EB%8A%94-await%EC%99%80-%EC%82%AC%EC%9A%A9%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%95%A0%EA%B9%8C-7b02581f6df4

페이스북 게시물에 자세히 댓글 달아드렸습니다. async/await는 setState와 작동하지 않습니다. 작동하는 것처럼 보일 뿐이에요.

기본적으로 async await는 Promise와 함께 작동합니다. React의 setState는 비동기적으로 작동하지만 Promise based function이 아니기 때문에 정확히 말하면 async await는 setState와 맞물려 작동하는 것은 아닙니다. await가 setState 이후 코드의 job schedule을 뒤로 미루고 await가 undefined(setState가 Promise를 리턴하지 않기 때문에)로 resolve된 이후에 나머지 코드가 실행돼서 setState가 async await와 작동하는 것 "처럼" 보일 뿐입니다. 아래 링크를 확인해보세요.

https://stackoverflow.com/questions/47019199/why-does-async-await-work-with-react-setstate?fbclid=IwAR3X2lQc6zDTacve0PUZ0P6NXWz6yhI5Tvzr_-QHFiowwpGI1J9HPwtvd-s

setState는 promise를 리턴하지 않기 때문에 await을 쓴다고 순서가 보장 되는 건 아닙니다. 다만 promise가 아니어도 await을 앞에 붙이면 그 이하 코드가 defer나 timeout과 동일하게 지연 실행하게 됩니다.
