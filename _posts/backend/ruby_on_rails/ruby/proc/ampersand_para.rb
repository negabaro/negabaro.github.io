#proc은 블록을 옮기기 편하게 하기위해 만들어진 오브젝트

#그러면 메소드에 블록을 넘겨줄때 proc으로 만들어서 넘겨줘야하나?
#그렇게 하지않고 메소드에서 명시적으로 블록을 받아서 해당 블록을 
#proc으로 바꿔주는 방법도 가능


def methodda(&ppp)
  pp ppp ##<Proc:0x00007fb09901a698@ampersand_para.ruby:14>
  pp ppp.class #Proc
  ppp.call #sss
end

methodda { p 'sss'}

pp "===================="

# keke = { p 'yyy' } unexpected tSTRING_BEG, expecting do or 


#keke2 = { p 'zzz' }.to_proc

# 블록은 그냥 변수에 넣을 수가 없구나..
#pp keke.class
#methodda keke

#proc.new({p 'hhh'}) # ampersand_para.ruby:27: syntax error, unexpected '}', expecting end-of-input
#Proc.new({p 'hhh'}) # syntax error, unexpected '}', expecting end-of-input


Proc.new { p 'hhh' }.call

keke3 = Proc.new { |arg| puts arg }
keke3.call 'xx'