//https://s8a.jp/javascript-object-array-property-function#%E5%AE%9A%E7%BE%A9

var isArray = Array.isArray;

function property(object, path) {
  if (object == null || typeof object != "object") return;
  return isArray(object)
    ? object.map(createProcessFunction(path))
    : createProcessFunction(path)(object);
}

function createProcessFunction(path) {
  if (typeof path == "string") path = path.split(".");
  if (!isArray(path)) path = [path];

  return function(object) {
    var index = 0,
      length = path.length;

    while (index < length) {
      object = object[toString(path[index++])];
    }
    return index && index == length ? object : void 0;
  };
}

function toString(value) {
  if (value == null) return "";
  if (typeof value == "string") return value;
  if (isArray(value)) return value.map(toString) + "";
  var result = value + "";
  return "0" == result && 1 / value == -(1 / 0) ? "-0" : result;
}

//xxxxxxxxxxxxxxxxx
var object = {
  a: {
    b: {
      c: 1,
      d: 2
    }
  }
};

console.log(property(object, "a.b.c"));
// 1

console.log(property(object, "a.b.d"));
// 2

console.log(property(object, "a.b.e"));
// undefined

// 配列でパス指定もできる
console.log(property(object, ["a", "b", "c"]));
// 1

var users = [
  {
    name: "太郎",
    company: {
      name: "A株式会社"
    }
  },
  {
    name: "二郎",
    company: {
      name: "B株式会社"
    }
  },
  {
    name: "花子",
    company: {
      name: "C株式会社"
    }
  }
];

console.log(property(users, "name"));
// ["太郎", "二郎", "花子"]

console.log(property(users, "company.name"));
// ["A株式会社", "B株式会社", "C株式会社"]
