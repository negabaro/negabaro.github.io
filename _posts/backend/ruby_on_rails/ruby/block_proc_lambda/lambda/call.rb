
l = lambda do |x|
  puts "dahyun #{x}"
end

l.call('cuty') # => dahyun cuty

l.yield('sexy') # =>  dahyun sexy

l.('pretty') # => dahyun pretty

l['kawaii'] # =>  dahyun kawaii
