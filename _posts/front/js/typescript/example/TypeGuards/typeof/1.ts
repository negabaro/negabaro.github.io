
//.kind Literal Type Guard
//https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/substr
//subtr

function setNumberOrString(x: number | string) {

  if ( typeof x === 'string' ) {
    console.log(x.subtr(1)); // Error
    console.log(x.substr(1)); // OK
  }else {
    console.log(typof x); // number
  }
  x.substr(1); 

}