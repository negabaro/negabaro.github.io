pp -1.negative?   # => true
pp 0.negative?    # => false
pp 1.negative?    # => false


[0,1,2].each do |i|
  pp 'only first' if i.negative?

  pp "i: #{i}"
end