#https://ref.xaio.jp/ruby/classes/enumerable/any
words = [nil, nil, "mouse", nil] #true
puts words.any?
pp "================"
puts words.all? #すべてtrueじゃないため
#words2 = [nil, nil, 0, nil] true
#words2 = [nil, nil, "", nil] true

words2 = [nil, nil, nil, nil] #false
puts words2.any?
pp "================"
words3 = ["dog", "hippopotamus", "mouse", "pig"] #true
words3 = ["dog", "xx", "mouse", "pig"] #false
puts words3.any? {|w| w.size > 10 }


pp "================"
myarray = ['val1'] #true
myarray = ['val5'] #false
values = ["val1", "val2", "sval3", "val4"] #.to_set
pp values
pp myarray.any? { |x| values.include?(x) }


#https://stackoverflow.com/questions/8026300/check-for-multiple-items-in-array-using-include-ruby-beginner/8026362
