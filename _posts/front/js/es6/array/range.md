# Range

Range を作りたい場合、Array.from を使うと、今までよりかはちょっと手軽な方法で記述可能になります。

```
Array.from(Array(5).keys())       // [0,1,2,3,4]
Array.from({length:5}, (k,v)=>v); // [0,1,2,3,4]
```

https://qiita.com/peutes/items/bd6500ef082efa8a08ff
