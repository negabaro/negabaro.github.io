#class Array
class String
    def include_any?(array)
      array.any? {|i|
        pp self # "a string with many words"
        pp i
        self.include? i
      }
      #self =  "a string with many words"
    end
end

  pp "a string with many words".include_any?(["a", "string"])