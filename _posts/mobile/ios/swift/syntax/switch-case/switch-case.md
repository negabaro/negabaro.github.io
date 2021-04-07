

## 기본 문법

```js
switch 값or식 {
case 값1:
    //처리로직
case 값2:
    //처리로직
case 값3:
    //처리로직
default:
    //처리로직
}
```

## int


```js
var score = 70

switch score {
  case 100:
    print("100점")

  case 70:
    print("70점")

  case 40:
    print("40점")

default:
  print("무야호")
}
```

실행결과: 70점


## 식 추가

switch문에 식을 추가할 수도 있다.

```js
var score = 70

switch score + 30 {
  case 100:
    print("100점")

  case 70:
    print("70점")

  case 40:
    print("40점")

default:
  print("무야호")
}
```

실행결과: 100점


## fallthrough

Objective-Cではcase処理を抜けるためには、breakを指定する必要がありましたが、Swiftのswitchでは不要になりました。

そのため、マッチしたcase処理を実行したあとに、意図的に次のcase処理を実行したい場合にはfallthroughを指定します。

サンプルプログラム

var num = 10

switch num {
  case 10:
    print("10です。")
    num += 10
    fallthrough
  case 20:
    print("20です。")

  case 40:
    print("40です。")

default:
  print("その他の値")
}
実行結果：

10です。
20です。
このようにfallthroughを指定すれば、次のcase文が実行されることがわかりますね！



## 튜플 지정

Tuple（タプル）は配列やディクショナリのように複数の値を保持することができます。

Switch文ではTubleを利用して分岐を行うことが可能です。

サンプルプログラム

let str = ("samurai", "engineer")

switch str {
  case ("samurai", ""):
    print("samurai")

  case ("", "engineer"):
    print("engineer")

  case ("samurai","engineer"):
    print("samurai engineer")

default:
    print("それ以外")
}
実行結果：

samurai engineer

---

let valuePair : (Int , String) = (1, "一")

switch valuePair {
    case (1 , "一" ):
        print("これは数字の1と漢数字の一です。")
    case (2 , "二" ):
        print("これは数字の2と漢数字の二です。")
    default:
        print("すみません、わかりませんでした。")
}

## 복수조건

switchの後の条件に,（コンマ）で区切って複数の条件を指定することができます。

サンプルプログラム

let str = "samurai"

switch str {
  case "samurai","engineer":
  print(str)
default:
  print("その他の値")
}
実行結果：

samurai

## 범위지정

caseでの条件は(数値1…数値2)と指定することで、その範囲の処理で分岐することができます。

サンプルプログラム

let score = 70

switch score {
  case (90...100):
    print("90-100の範囲")

  case (50...89):
    print("50-89の範囲")

  case (1...49):
    print("1-49の範囲")

default:
    print("0")
}
実行結果：

50-89の範囲


## 메소드 지정



---


[Switch文による条件分岐をマスターしよう！]: https://www.sejuku.net/blog/32162