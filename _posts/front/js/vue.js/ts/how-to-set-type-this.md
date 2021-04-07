this에type
VueJS with typescriptでしばしば遭遇するProperty 'XXX' does not exist on type 'CombinedVueInstanceの解消法

安直な解決方法
手っ取り早く解決するなら型を無視するのが楽です。

// @ts-ignore
this.someMethod()
@ts-ignoreを書くと次の行の型検査がスキップされます。
またはもっと安易にthisをanyにキャストするという方法もあります。

(this as any).someMethod()
しかし、まぁ負けたような気がするのであまりお勧めではありません。



https://qiita.com/shunjikonishi/items/3774486d37af80d1ae47