Proc(절차, Procedure) 객체 이해하기
루비에서는 Proc 클래스를 통해서 익명 함수를 생성할 수 있습니다. 여기서 Proc은 Procedure의 줄임말로 어떤 처리 과정(절차)을 담고있다는 의미입니다. Proc 또한 일반적인 루비 클래스와 다르지 않으므로 Prow.new 메서드로 객체를 생성할 수 있습니다.

Proc.new
# ArgumentError: tried to create Proc object without a block
설명이 조금 까다로워집니다만, Proc.new 메서드는 블록으로 절차(루비 표현식들)를 넘겨받습니다. 설명이 까다로운 이유는 블록 자체도 익명 함수이기 때문입니다. 루비에서는 메서드 뒤에 do...end 형태로 블록이라는 특별한 문법을 사용할 수 있습니다. do와 end 사이에는 루비 표현식(들)이 들어갑니다. 이 do...end 사이의 표현식들은 바로 실행 되지 않고, 익명 함수로서 메서드에 전달 됩니다. 여기서는 블록에 대해서는 자세히 다루지 않습니다. 중요한 것은 루비 표현식들이 고스란히 함수로 전달된다는 점입니다.

Proc.new도 블록을 통해서 익명 함수를 전달받습니다.

Proc.new do
  puts 'Hello, world!'
end
# => #<Proc:0x007f99f12c6bf8@(pry):2>
Proc.new는 Proc 객체를 반환합니다. 이 생성자 메서드는 넘겨받은 익명 함수에 대해서 어떠한 일도 하지않고, 익명 함수를 그대로 저장해둡니다. 앞서 이야기했듯이 블록에 쓰여진 루비 표현식은 곧바로 실행되지 않습니다. 따라서 puts 'Hello, world!'가 출력되지는 않습니다.

Proc 객체 실행하기
이 Proc 객체는 원하는 시점에 실행할 수 있습니다. 다음 예제에서는 이 Proc 객체를 변수에 대입하고 실행하는 방법을 살펴보겠습니다. Proc 객체를 실행하는 방법은 크게 3가지가 있습니다. 첫번째는 .call() 메서드를 사용한 호출법입니다. 제일 명시적인 표현법입니다. 이외에도 .()과 []와 같은 조금은 낯설게 보이는 방법도 있습니다. .call() 메서드를 사용한 호출법과 작동 방식은 같습니다.

# 여기서는 편의상 do...end 대신 { }을 사용했습니다. 의미는 같습니다.
p = Proc.new { puts 'Hello, world!'}

p.call()
# Hello, world!

p.()
# Hello, world!

p[]
# Hello, world!

https://www.44bits.io/ko/post/ruby-proc-and-lambda