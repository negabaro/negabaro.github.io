//https://qiita.com/coa00/items/7af3677e0515cf9f5afd
//出力したJSをちゃんと眺めるとわかるのですが、
//ロードする順番が親より先に子をよんでしまった場合に発生します。
//親より先に子がロードされる。

//https://qiita.com/tkrkt/items/d01b96363e58a7df830e
//継承
//両方可能。Interfaceで継承できるのはもちろん、
//交差型を使うとTypeでも継承めいたことができる。

// interfaceの継承
interface IPoint2D {
  x: number;
  y: number;
}
interface IPoint3D extends IPoint2D {
  z: number;
}

let ii: IPoint3D;
ii = {
  x: 1,
  y: 2,
  z: 3
};

let ii2: IPoint3D = {
  x: 1,
  y: 2,
  a: 3, //Object literal may only specify known properties, and 'a' does not exist in type 'IPoint3D'.
  z: 4
};

// typeの継承もどき
type TPoint2D = {
  x: number;
  y: number;
};
type TPoint3D = TPoint2D & {
  z: number;
};

let tt: TPoint3D = {
  x: 1,
  y: 2,
  z: 3,
  a: 4 //error
};
