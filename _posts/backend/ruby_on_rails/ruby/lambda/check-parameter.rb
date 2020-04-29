#Proc.newやprocで作成したProcオブジェクトよりメソッドの動きに近い動きをする
#主な違いは2つある。

# Proc이랑 비슷하지만 더 메소드에 가까운 특징을띔 
# proc과의 차이는 2가지


# 파라메터 수를 체크해줌
proc = lambda do |a, b, c|
    p [a, b, c]
  end
#proc.call(1, 2) # => ArgumentError: wrong number of arguments (2 for 3)
proc.call(1, 2, nil) #[1, 2, nil]
proc.call(1, 2, 3) #[1, 2, 3]

