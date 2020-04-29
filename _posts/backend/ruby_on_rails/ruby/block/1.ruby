#파라메터 블록(?)에 특정값을 전달할 수 있다
def method2
  yield('arg')
end
  
method2 { |parameter| p parameter } 