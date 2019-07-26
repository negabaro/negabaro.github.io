//https://jaeyeophan.github.io/2018/01/10/TS-7-TypeScript-type-system/

class Sana {
  name = "sana";
  age = 22;
}

class Twice {
  name = "twice";
  member_cnt = 9;
}

function idol(obj: Sana | Twice) {
  if (obj instanceof Sana) {
    console.log(obj.name);
    console.log(obj.member_cnt); //error
    console.log(obj.age);
  }

  if (obj instanceof Twice) {
    console.log(obj.name);
    console.log(obj.age); //error
    console.log(obj.member_cnt);
  }
  console.log(obj.name);
  console.log(obj.age); //error
  console.log(obj.member_cnt); //error
}
//typeof와 마찬가지로 instanceof로 필터링 된 block 내부에서 Type checking이 이루어집니다.
