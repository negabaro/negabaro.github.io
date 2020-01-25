var ki = [
  {
    loader: "url-loader",
    options: {
      limit: 1000,
      name: "[path][name].[ext]"
    }
  }
];

console.log(ki);
console.log(ki[0].loader);

console.log(ki[0].options.limit);
