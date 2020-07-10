
pp 1.positive?    # => true
pp 0.positive?    # => false
pp -1.positive?   # => false

[0,1,2].each do |i|
  #pp "only first #{i}" if i.positive?
  pp "only first #{i}" unless i.positive?

  pp "i: #{i}"
end