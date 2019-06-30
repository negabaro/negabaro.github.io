※Ruby2.0 以降
メソッド定義のところで、変数でなくてキーワードを指定する方法があります。Ruby2.0 以降でしか使えませんが、非常に扱いやすいので、Ruby2.0 以降では、基本的に以下の手法を用いる方がよいでしょう。

def hello(name:, age:)
puts "Hello World! #{name}, #{age} years old."
end
1
2
3
def hello(name:, age:)
puts "Hello World! #{name}, #{age} years old."
end
キーワード引数つきメソッドの呼び出し
呼び出しは以下のようにします。

hello(name: "tomochan", age: 43)
Hello World! tomochan, 43 years old.
1
2
hello(name: "tomochan", age: 43)
Hello World! tomochan, 43 years old.

https://uxmilk.jp/22320
https://qiita.com/aeroastro/items/49e18cb7e95a64e0eacf
