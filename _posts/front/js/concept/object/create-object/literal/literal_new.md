# Literal방식에 new를 하면?

JSON も new ??
JSON で書いたオブジェクトも new したくなる時があります。

```
var Dog = {
    name:"じろー",
}

var a_dog = new Dog(); //=>TypeError: object is not a function
```

이것은 `{} (= Object )`가 정의한 변수는 constructor 함수가 아닌 Object화가 가능한 함수가 아니므로 (new가 가능한 인스턴스)
JSON은 자바스크립트의 오브젝트 기술의 서브셋일 뿐 constructor가 아니므로 초기화가 불가능

これは、`{} (= Object )` がで定義された変数はコンストラクタ関数ではなく、Object のオブジェクト化可能な関数でもない（≠ new 可能なインスタンス)。JSON は Javascript のオブジェクト記述のサブセットであり、コンストラクタ関数がなく、初期化できない

function の中に this.XXX をいっぱい書くのは面倒だし、JSON でパパっと定義したいですよね

### Reference Link:

http://takuya-1st.hatenablog.jp/entry/2014/07/05/191953
