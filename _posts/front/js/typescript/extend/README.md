
```
<T extends string>
```

とすることで、ジェネリック型のTは、string型を継承することになり、string型に制約されることになります。
そのため、<string>以外の型指定をすると、コンパイルエラーになります。

https://tsudoi.org/weblog/3360/