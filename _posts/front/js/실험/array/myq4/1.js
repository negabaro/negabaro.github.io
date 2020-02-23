const hoge = { 0: {}, 1: {}, 100: {} };

console.log(hoge);
const hoge2 = { 0: {}, 1: {}, 100: {} };

const hoge3 = { ...hoge, ...hoge2 };
console.log(hoge3);

const hoge4 = { list: [hoge, hoge2] };

console.log(hoge4);
console.log("=============");
//const foge = { 0: {}, 1: {}, 100: {} };
const foge = [{ 0: {}, 1: {}, 100: {} }];
console.log(foge);
const foge2 = [{ 0: {}, 1: {}, 100: {} }];

//const foge3 = {};
const foge3 = [];

const foge9 = [...foge, ...foge3];
console.log(foge9);
