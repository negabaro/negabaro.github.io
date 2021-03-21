def doSelfImportantly someProc
    puts 'Everybody just HOLD ON!  I have something to do...'
    someProc.call
    puts 'Ok everyone, I\'m done.  Go on with what you were doing.'
    
end
   
sayHello = Proc.new do
    puts 'hello'
end
   
sayGoodbye = Proc.new do
    puts 'goodbye'
end

doSelfImportantly sayHello
pp "========================================================================="
doSelfImportantly sayGoodbye

# 이런식으로 메소드를 파라메터로 넘겨서 실행이 가능!!