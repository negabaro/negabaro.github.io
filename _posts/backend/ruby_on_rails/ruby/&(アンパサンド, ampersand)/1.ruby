
#1. 오브젝트는 &을 수식하고 block을 proc으로 proc을 block으로 변환해줌

#2. &은 proc이아닌 오브젝트에게 to_proc을 불러들여 block으로 변환해줌

#3. Symbol#to_proc은 첫번째 파라메터를 해당 Symbol을 메소드로서 불러 proc을 넘긴다


#:to_s.to_proc === 이하 메소드와 같음

array = [1,2,3]
pp array.map(&:to_s) # :to_s(Symbol) -> xx? using to_proc
# => ["1", "2", "3"]
pp :to_s.class

#to_proc과 같은코드
pepe = Proc.new do |elem|
    elem.send(:to_s)
end
pp "=============="
pp array.map(&pepe) # proc -> block
# => ["1", "2", "3"]

pp "=============="
prc = :to_i.to_proc
p prc.call("ff", 16) #255

pp "=============="
pp :to_i.to_proc # #<Proc:0x00007fc753107558(&:to_i)>

#prc = &:to_i #error  1.ruby:29: syntax error, unexpected &
#sprc = &method(:to_i) # prc = &method(:to_i)

#p prc.call("ff", 16)

pp "=============="
p ["12", "34", "56"].collect {|s| s.to_i }
p ["12", "34", "56"].collect(&:to_i)
#2코드는 같음