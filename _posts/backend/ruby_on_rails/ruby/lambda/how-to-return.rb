

# proc과의 차이2 리턴 빠지는 범위
def foo
    f = Proc.new { return :foo }#
    f.call
    return
  end
  
  def foo2
    f = proc { return :foo2 } #
    f.call
    return
  end
  
  def bar
    f = lambda { return :bar }
    f.call
    return  #!
  end
  
  def h
    yield
  end
  
  def hoge
    h{ return :hoge } #
    nil
  end
  
  p foo()
  #=> :foo
  p foo2()
  #=> :foo2
  p bar()
  #=> nil
  p hoge()
  #=> :hoge
  #p h { return :hh}

  #return                     next                     break
  #Proc.new    メソッドを抜ける            手続きオブジェクトを抜ける  例外が発生する
  #proc        メソッドを抜ける            手続きオブジェクトを抜ける  例外が発生する
  #lambda      手続きオブジェクトを抜ける   手続きオブジェクトを抜ける  手続きオブジェクトを抜ける
  #イテレータ   メソッドを抜ける            手続きオブジェクトを抜ける  メソッドを抜ける

  #https://qiita.com/naotospace/items/0163d4f8803a63f5fb17

# proc.new의 경우 리턴을 만나면 그대로 메소드를 종료한다
# call -> proc!!
pp "========================="
def proc_method
  proc = Proc.new { return p "proc!!"}
  proc.call
  p "proc method"
end
proc_method

def lambda_method
  lambda1 = lambda { return p "lambda"}
  lambda1.call
  p "lambda method" # 얘까지 실행해줌
end
lambda_method
#lambda의 경우 아주 우직하게 리턴을 만나서 끝까지 메소드를 실행시킨다..


