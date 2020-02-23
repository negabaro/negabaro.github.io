[QUESTION] Array.prototype.slice.call로 통일하는 게 좋습니다.??

```js
var array = ['a', 'b', 'c'];
var copy = Array.prototype.slice.call(array);
copy[0] = 'd';
console.log(array); // ['a', 'b', 'c']
```

 copy(복사)라고 하며, 이제는 copy변수가 바뀌어도 array 변수에 영향을 미치지 않습니다. slice함수는 배열을 자르는 함수인데 어떻게 복사가 되냐고요? array.slice(0)이라고 생각하면 됩니다. array를 자르는 데 0개만큼 자르니까 결국 그대로 반환하는거죠.

위의 경우는 Array.prototype.slice.call(array) 대신 array.slice(0)을 해도 되지만, arguments 같은 것(유사배열이라서 배열의 메소드를 사용할 수 없습니다)을 복사할 때를 생각하면 Array.prototype.slice.call로 통일하는 게 좋습니다.


https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d
