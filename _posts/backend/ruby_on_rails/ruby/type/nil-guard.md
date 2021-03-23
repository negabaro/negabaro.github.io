nilガード
def nil_guard( val=nil )
  val ||= "default"
end

p nil_guard()
  # "default"
p nil_guard( "test" )
  # "test"
本来nilガードはその変数が未定義でもその場で定義もできちゃうところが強力ですが、引数処理にも使えます.
引数デフォルトにval="default"としてもいいですが、nilが格納された変数が明示的に渡される場面も多いのでnilを防ぎたい局面では有効です.

p nil_guard( false )
  # "default"
falseを明示的に引数に渡したいときは注意です.