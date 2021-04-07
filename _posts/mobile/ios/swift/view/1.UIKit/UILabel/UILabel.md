

https://bite-sized-learning.tistory.com/175

## 'CGRectMake' is unavailable in Swift

let labelTag = UILabel(frame: CGRectMake(0, 0, 100, 100))
以下のように修正

let labelTag = UILabel(frame: CGRect(x: 0, y: 0, width: 100, height: 100))
Swift3の俗に言われる破壊的な変更で文法を変える必要有り、ver3x移行は安定を目指していくとの事なので早めに慣れていった方がいいのかもしれない。