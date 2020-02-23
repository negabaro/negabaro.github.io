def shuffle(str)
    str.chars.shuffle.join
end

#그냥 메소드를 부를때
pp ['Ruby', 'Java', 'Perl'].map { |name| shuffle(name) } #["buRy", "aJva", "lePr"]
pp shuffle('').class #String
pp "========================"
# method object사용시
pp &method(:shuffle) #아무것도안보임. 에러는 안나는데
pp self.method(:shuffle) # #<Method: main.shuffle>  <<이게 메소드 오브젝트
pp self # main
#pp &method(:shuffle).call  # 2.ruby:1:in `shuffle': wrong number of arguments (given 0, expected 1) 
pp self.method(:shuffle).call #2.ruby:1:in `shuffle': wrong number of arguments (given 0, expected 1) (ArgumentError)


pp ['Ruby', 'Java', 'Perl'].map(&method(:shuffle)) #["Rbyu", "vaJa", "lerP"]