//https://teratail.com/questions/147634

let talkData = [
  {
    id: 7,
    checkedin: false
  },
  {
    id: 6,
    checkedin: false // ここを true に変えたい
  },
  {
    id: 5,
    checkedin: false
  },
  {
    id: 4,
    checkedin: true
  },
  {
    id: 3,
    checkedin: false
  },
  {
    id: 2,
    checkedin: false
  },
  {
    id: 1,
    checkedin: true
  }
];

const res1 = talkData.filter(item => {
  if (item.id == 1) return true;
});

console.log("res1", res1);
//checkedin

const res2 = talkData.filter(item => {
  if (item.id == 1);
});
console.log("res2", res2);

const res3 = talkData.filter(item => {
  item.id == 1;
});
console.log("res3", res3);

const res4 = talkData.filter(item => item.id == 1);
console.log("res4", res4);
//-----------------------------
const res5 = (talkData.filter(item => item.id == 1).checkedin = false);
console.log("res5", res5);
console.log("talkData", talkData);

//소모소모 filter는 복수가 올수있으니 1:1매칭 대입안됨!!!

const res6 = (talkData.find(el => el.id == 1).checkedin = false);
console.log("res6", res6);
console.log("talkData", talkData);

//직접 변경할려면 find로 ㅇㅋ?
