def test
  yield
end


#test # no block given (yield) (LocalJumpError)

#test Proc.new { pp 'test'} # wrong number of arguments (given 1, expected 0) (ArgumentError)

#test 'test' # wrong number of arguments (given 1, expected 0) (ArgumentError)

test { pp 'test'}