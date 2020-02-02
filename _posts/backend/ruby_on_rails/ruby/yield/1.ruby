def animal(name)
    yield(name)
    yield("호랑이")
    yield("사자")
    yield("코끼리")
    yield(name)
    yield("하마")
  end
animal("하이에나") {|i| puts "#{i}는 생각했다. 저녁으로 무엇을 먹을지를!"}
pp "=========================================="
animal("뱀") do |i|
    puts "#{i}는 생각했다. 저녁으로 무엇을 먹을지를!"
end

pp "=========================================="
def programming
  yield puts "누군가에게 사랑을 주고자 한다면 다가가기 위해"
end


programming {puts "노력을 해야 한다"}
# puts다음으로 넘긴 블록값이 실행되는군..!


#기본적으로 메소드에 블록을 넘겨줄 수 있고 yield는 받아온 블록을 실행해준다
# http://blog.naver.com/PostView.nhn?blogId=biud436&logNo=220219816399&redirect=Dlog&widgetTypeCall=true&directAccess=false