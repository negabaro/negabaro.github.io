decorator랑 비슷한 효과임

Model の Decorator か Object#extend で View 用のロジックを使えるようにする
Model のインスタンスを View に渡す前に Decorator クラスでラップして、 View 用のインスタンスを作る方法です。
この場合、View用のメソッドが Model に結びつくので Helper より扱いやすい場合があります。
Decorator クラスは initialize で Model インスタンスを受け取るクラスを定義するだけでも十分ですが、 gem としては Draper や ActiveDecorator があります。
Draper は dacorate メソッドを呼ぶなどの方法で明示的にデコレートする必要がありますが、ActiveDecorator は render するときに自動的にデコレートします。
私の好みとしては Draper の方が Association のデコレートがしっかりしていたり、Model名以外の decorator を使用することもできるので好きです。

Object#extend を使う場合も Decorator を使ったときと得られるものは似ています。
module に View 用のメソッドを定義してコントローラでモデルのインスタンスに対して追加します。

```ruby
module UserViewLogic
  def full_name
    # last_name と first_name は User モデルのメソッド
    "#{last_name} #{first_name}"
  end
end

class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @user.extend(UserViewLogic)
    # p @user.full_name #=> "馬場 一樹"
  end
end
```

https://qiita.com/kbaba1001/items/e265ad1e40f238931468