/* const isEmpty = obj => {
  if (!obj) {
    //if (obj !== 0 && obj !== false) {
    //  return true;
    //}
    if ([0, false, ""].includes(obj)) {
      return true;
    }
  } else if (typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }

  return false;
};*/

const isEmpty = obj => {
  //console.log(typeof obj);
  //console.log("instanceof Array:", obj instanceof Array);
  //console.log("instanceof Object:", obj instanceof Object);

  /* if (Object.prototype.toString.call(obj) === "[object Object]") {
    //console.log("test", Object.prototype.toString.call(obj));
    return Object.keys(obj).length === 0;
  } else if (Object.prototype.toString.call(obj) === "[object Array]") {
    return obj.length === 0;
  } */

  if (typeof obj === "object") {
    //if (Array.isArray(obj)) {
    //  return !obj.length;
    //}
    return !Object.keys(obj).length;
  } else if (!obj) {
    return !obj;
    //if (obj !== 0 && obj !== false) {
    //  return true;
    //}
    //  return true;
    //}
  } else if (obj instanceof Array) {
    console.log("array");
  }

  return false;
};

console.log(isEmpty("")); //true
console.log(isEmpty(0)); //true
console.log(isEmpty(false)); //true
console.log(isEmpty(true)); //false

console.log(isEmpty([])); //true
console.log(isEmpty([1])); //false
console.log(isEmpty([0])); //false
console.log(isEmpty({})); //true
//https://qiita.com/Quantum/items/ebf6ed48e55692182d85

const isEmpty2 = obj => {
  if (!obj) {
    return true;
  }

  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return !obj.length;
    }
    return !Object.keys(obj).length;
  }

  return false;
};
console.log("==============");
console.log(isEmpty2(undefined));
console.log(isEmpty2(null));
