# method object는 proc object와 상당히 유사하다
# to_proc을 이용해서 proc가 되는것도 가능하다
# method object는 레시버가 고정되는 문제등으로 인해 proc에 비해 인기가없다.

def shuffle(str)
    str.chars.shuffle.join
end

pp self.method(:shuffle) ##<Method: main.shuffle>
pp self.method(:shuffle).to_proc ##<Proc:0x00007facbf0ade08 (lambda)>

pp "=========================="
s = "Ruby"
m = s.method(:upcase) # 메소드 오브젝트 만들기
pp m
pp "=========================="
m = "Ruby".method(:upcase) 
p m.receiver # => "Ruby" # 레시버는 누구인가

pp "=========================="
m = "Ruby".method(:upcase) 
p m.name # method name은 누구인가

pp "========================="
# 사용하는법 how
# call을 사용해서 메소드 오브젝트를 실행한다
m = "Ruby".method(:upcase)
p m.call # => "RUBY"
p m[] # => "RUBY"

pp "========================="
# 왜 사용하는가? why? 레일즈의 경우인데

#User.human_attribute_name(:name)
#User.human_attribute_name(:last_name)
#이런게 반복될때

#han = User.method(:human_attribute_name)

#han[:name]
#han[:last_name]

#or

#han.call(:name)
#han.call(:last_name)


#이런식으로 짦게 정의해주는게 가능


# 루비를 예로

x = 2989

p x.to_s # => "2989" （デフォルトは 10 進法）
p x.to_s(2) # => "101110101101"
p x.to_s(16) # => "bad"

pp "==========================="
#위 코드를 오브젝트 메소드로??

m = 2989.method(:to_s)

p m.call # => "2989"
p m.call(2) # => "101110101101"
p m.call(16) # => "bad"
pp "==========================="
# 여기다 call -> [] 까지 바꿔보면?

m = 2989.method(:to_s)

p m[]   # => "2989"
p m[2]  # => "101110101101"
p m[16] # => "bad"


#조금 짦아지긴했는데  메리트가 별론데??

# https://qiita.com/scivola/items/f1f8d3b5593f3b61f25a