#블록을 넘겨준게 맞는지 확인하는법

def method1
  p block_given?
end
  
method1 { p 'block' } #=> true
method1 #=> false

def method1
  yield if block_given?
end
pp "=================="
method1 { p 'block' } #=> "block"
method1 ##에러 안남