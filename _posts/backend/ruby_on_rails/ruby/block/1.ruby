def method2
  yield('arg')
end
  
method2 { |parameter| p parameter } 