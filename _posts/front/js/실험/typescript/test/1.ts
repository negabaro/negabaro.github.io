type Hoge = HasiasPETSlots;
interface HasiasPETSlots {
  adSlotId: string;
  size: string;
  adUnitPath: string;
}

//var iasPETSlots = [] as Hoge[]; //success
var iasPETSlots = [] as HasiasPETSlots[]; //success
iasPETSlots.push({
  adSlotId: "xx",
  size: "xxx",
  adUnitPath: "xxx"
});
