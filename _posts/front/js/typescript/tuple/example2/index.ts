type Append<Elm, T extends unknown[]> = ((
  arg: Elm,
  ...rest: T
) => void) extends ((...args: infer T2) => void)
  ? T2
  : never;

type AtLeast<N extends number, T> = AtLeastRec<N, T, T[], []>;
// type AtLeast<N, T> = AtLeastRec<N, T, T[], []>;
type AtLeastRec<Num, Elm, T extends unknown[], C extends unknown[]> = {
  0: T;
  1: AtLeastRec<Num, Elm, Append<Elm, T>, Append<unknown, C>>;
}[C extends { length: Num } ? 0 : 1];

// ---------- 使用例 ----------
const arr: AtLeast<3, number> = [0, 1]; // これはエラー
const arr22: AtLeast<3, number> = [0, 1, 2]; // これはOK

const arr3: AtLeast<5, number> = [0, 1, 2]; // これはエラー
const arr4: AtLeast<5, number> = [0, 1, 2, 3, 4]; // これならOK
