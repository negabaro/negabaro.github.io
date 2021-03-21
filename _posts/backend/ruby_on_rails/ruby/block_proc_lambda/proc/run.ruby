

toast = Proc.new do
    puts 'Cheers!'
end

toast.call
toast.call
toast.call

pp "============================"

doYouLike = Proc.new do |aGoodThing|
  puts 'I *really* like '+aGoodThing+'!'
end
   
doYouLike.call 'chocolate' #I *really* like chocolate!
doYouLike.call 'ruby' #I *really* like ruby!


pp "============================"
proc1 = Proc.new { |par1| p par1 }
proc1.call("arg") #=> "arg"
proc1["arg"]
pp "============================"
proc2 = Proc.new { p "proc" } 
##Proc.newによってブロック（{ p "proc" })をオブジェクト化したproc1を作成。
proc2.call #=> "proc"
##Proc.newによって作成されたproc1を.callで呼び出す。
proc2[] #[]로도 실행가능한건 메소드 오브젝트 뿐만이 아니었군..