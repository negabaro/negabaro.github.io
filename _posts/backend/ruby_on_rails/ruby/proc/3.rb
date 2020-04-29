# 1
hello_1 = Proc.new do |name|
    puts "Hello, #{name}" # 最後に評価される式の値が戻り値
  end
  
  # 2
  hello_2 = proc do |name|
    puts "Hello, #{name}" # 最後に評価される式の値が戻り値
  end
  
hello_1.call("bob")
hello_2.call("cathy")
hello_2.call("cathy",'') #에러 안남.. lambda라면 파라메터 값 체크해서 틀리면 에러 뿜어줌