const kaka = [
  {
    loader: "url-loader",
    options: {
      limit: 1000,
      name: "[path][name].[ext]"
    }
  }
];

console.log(kaka[0]);
console.log("==============");
console.log(kaka);
console.log("==============");
console.log(kaka[0].options.limit);
