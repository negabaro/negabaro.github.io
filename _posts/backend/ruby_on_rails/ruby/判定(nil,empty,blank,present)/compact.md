ここからRails（Active Support）の導入を前提とします。

compact
nilの要素を消してくれる

[nil].present? #=> true
[nil].compact.present? #=> false
