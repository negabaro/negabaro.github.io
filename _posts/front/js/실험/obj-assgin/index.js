route = {
  params: {
    genre1: "xxx11",
    genre2: undefined,
    genre3: "xxx22",
    genre4: "xxxx44"
  }
};

console.log("!!!", Object.values(route.params));
console.log("!!!22", Object.values(route.params["genre1"]));
console.log("!!!33", Object.values(route.params));

console.log(route.params);
console.log(Object.keys(route.params));
const hasAllOf = (keys, object) => {
  keys.every(param => {
    console.log("param!", param);
    console.log("object!", object);
    console.log(Object.keys(object));
  });
  return keys.every(param => Object.keys(object).includes(param));
};

console.log("result", hasAllOf(["genre1", "genre2", "genre3"], route.params));

const hasAllOf2 = (keys, object) => {
  return keys.every(param => !Object.values(object).includes(undefined));
};

console.log("result", hasAllOf2(["genre1", "genre2", "genre3"], route.params));

const hasAllOf3 = (keys, object) => {
  return keys.every(param => !Object.values(object).includes(undefined));
};

console.log("result", hasAllOf3(["genre1", "genre2", "genre3"], route.params));

const hasAllOf4 = target => {
  target.some(t => t === undefined);
};

const hasAllOf5 = (keys, object) => {
  return keys.some(param => param);
};

const hasAllOf6 = target => {
  // return keys.some(param => param);
  return Object.values(target).some(s => {
    console.log("hhhh", s);
  });
};

console.log(hasAllOf6(["genre1", "genre2"]));

const hasAllOf7 = (target, obj) => {
  // return keys.some(param => param);
  return target.some(s => {
    console.log("hhhh", s);
    console.log("hhhh22", Object.values(obj));
  });
};

console.log(hasAllOf7(["genre1", "genre2"], route.params));

const hasAllOf8 = (target, obj) => {
  console.log("kk");
  return target.map(i => {
    console.log("xx", obj[i]);
    console.log("xx", !!obj[i]);
    console.log("xx", !obj[i]);
    if (!obj[i]) {
      console.log("yy");
      return false;
    }
    return true;
  });
};

console.log(hasAllOf8(["genre1", "genre2"], route.params));

const hasAllOf9 = (target, obj) => {
  // return keys.some(param => param);
  return target.every(s => {
    console.log(obj[s]);
    console.log(!!obj[s]);
    //return !!obj[s];
    return !!obj[s];
    //console.log(!!obj[s]);
    //obj[s] !== undefined;
  });
};

console.log("-----------");
console.log("ss", hasAllOf9(["genre1", "genre2", "genre3"], route.params));
