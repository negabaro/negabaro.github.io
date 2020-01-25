interface RuleSetRule {
  test?: any;
  use?: RuleSetUse;
}

type RuleSetUse =
  | RuleSetUseItem
  | RuleSetUseItem[]
  | ((data: any) => RuleSetUseItem | RuleSetUseItem[]);

type RuleSetUse2 =
  | RuleSetUseItem2
  | RuleSetUseItem2[]
  | ((data: any) => RuleSetUseItem2 | RuleSetUseItem2[]);

type RuleSetUseItem2 = boolean | RuleSetLoader;

type ff = "keke" | "koko";

type RuleSetUseItem =
  | boolean
  | string
  | RuleSetLoader
  | ((data: any) => string | RuleSetLoader);

interface RuleSetLoader {
  /**
   * Loader name
   */
  loader?: string;
  /**
   * Loader options
   */
  options?: RuleSetQuery;
  /**
   * Unique loader identifier
   */
  ident?: string;
  /**
   * Loader query
   */
  query?: RuleSetQuery;
}

type RuleSetQuery = string | { [k: string]: any };

const hoge: RuleSetRule = {
  test: /\.(png|jpe?g|gif|svg|webp)$/i,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 1000,
        name: "[path][name].[ext]"
      }
    }
  ]
};

console.log(hoge.use);
//https://teratail.com/questions/207119?modal=q-comp
//質問してみた

hoge.use["xxx"];

let popo: RuleSetUse2;
let popo2: RuleSetUse2 = [];
let papa: RuleSetUseItem;
let papa2: string;

//let kaka = [true];

//popo = ( xx ) => { return 'xx' } //ok
//popo = papa //ok
//popo = papa2 //ok

//popo = 'xx';
//popo = ( xx ) => { return true } //ok
popo = xx => {
  return kaka[0];
}; //ok

popo = xx => {
  return kaka;
}; //ok

let popo3: RuleSetUse2 = [
  {
    loader: "url-loader",
    options: {
      limit: 1000,
      name: "[path][name].[ext]"
    }
  }
];

const keke34 = [...popo3];

let koko1: RuleSetRule[] = [
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 1000,
          name: "[path][name].[ext]"
        }
      }
    ]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 1000,
          name: "[path][name].[ext]"
        }
      }
    ]
  }
];

koko1[0].use[0];

let cc: ff;
cc = "keke";
