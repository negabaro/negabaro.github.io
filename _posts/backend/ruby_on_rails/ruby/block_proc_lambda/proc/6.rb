proc1 = proc { |arg| p arg }
proc1.call( '다현', '채영')

proc2 = proc { |arg,arg2| p "#{arg} #{arg2}" }
proc2.call( '다현', '채영')


proc3 = proc { |arg| p arg }
proc3.call()