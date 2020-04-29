#proc {} 이렇게 해도 만들어지는구낭

proc8 = proc { p 'hogege'}
proc8.call

#Proc.new{ } による方法
#proc{ } による方法
#lambda{ } による方法
#->{ }による方法(lambdaによって作成されたProcオブジェクトと同じ性質をもつオブジェクトを作成する。）

#4가지 방법이 있다

proc1 = Proc.new { |arg| puts arg } ## Proc.new{ } による方法
proc1.call 'hh'
pp "================"
proc2 = proc { |arg| puts arg } ##proc{ } による方法

proc3 = lambda { |arg| puts arg } ##lambda{ } による方法
proc4 = ->(word) { puts word } ##->{ } による方法
proc5 = -> { puts "proc" } ##->{ } による方法