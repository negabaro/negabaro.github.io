## becomes

このような，Aモデルを継承したBモデルがあるときに，AモデルのインスタンスをBにキャストしたいことがあると思います．

class A < ActiveRecord::Base

end

class B < A

end

このようなActiveRecordのキャストにはbecomes()メソッドが使えます．

301 Moved Permanently
http://api.rubyonrails.org

AのインスタンスをBにキャストしたいときは次のようになります．

a = A.new()
b = a.becomes(B)
簡単ですね！

Javaとかの様にb = (B)aでキャストが出来なかったので，困っていました．

https://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-becomes
https://qiita.com/0gajun/items/de0b9250b7026bd935ed
https://stackoverflow.com/questions/2558164/how-to-use-becomes-in-rails
