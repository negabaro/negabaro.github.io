myarray = { val1: '1', val2: '2', val3: '3', val4: '4' }


#if myarray.include? 'val1' || myarray.include? 'val2' || myarray.include? 'val3' || myarray.include? 'val4'
#  pp 'success'
#end

class String
    def include_any?(array)
      array.any? {|i| self.include? i}
    end
end

pp "a string with many words".include_any?(["a", "string"])


#(myarray & ["val1", "val2", "val3", "val4"]).present?

#https://stackoverflow.com/questions/8026300/check-for-multiple-items-in-array-using-include-ruby-beginner/8026362