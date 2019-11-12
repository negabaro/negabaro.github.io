const isFunction = value => {
  return typeof value === "function";
};

const functionValue = value => {
  if (isFunction(value)) {
    return value();
  } else {
    return value;
  }
};

const assert = function(value, message) {
  if (typeof message === "undefined" || message === null) {
    message = "";
  }
  if (value !== true) {
    throw new Error(message);
  }
};

const switch_ = expression => {
  return args => {
    assert(Array.isArray(args), "switch_ function");
    for (let i = 0; i < args.length; i += 1) {
      if (!Array.isArray(args[i])) {
        return args[i];
      } else if (args[i].length === 0) {
        return undefined;
      } else if (args[i].length === 1) {
        return args[i][0];
      } else {
        if (args[i][0] === expression) {
          return functionValue(args[i][1]);
        }
      }
    }
  };
};

var switchValue = "1";
console.log(
  switch_(switchValue)([
    [1, _ => "Val1"],
    [2, _ => "Val2"],
    [3, _ => "Val3"],
    ["1", _ => "ValStr1"],
    "defaultVal"
  ])
);
