#proc1 = lambda { |arg| p arg }
#proc1.call( '다현', '채영') # => wrong number of arguments (given 2, expected 1) (ArgumentError)

#proc2 = lambda { |arg,arg2| p "#{arg} #{arg2}" }
#proc2.call( '다현', '채영')


proc3 = lambda { |arg| p arg }
proc3.call() # => wrong number of arguments (given 0, expected 1) (ArgumentError)