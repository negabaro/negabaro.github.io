//https://tsudoi.org/weblog/3360/
function getFirstValue<T>(arr: T[]): T {
  return arr[0];
}

console.log(getFirstValue<string>(["a", "b", "c"]));

console.log(getFirstValue<number>([1, 2, 3]));
