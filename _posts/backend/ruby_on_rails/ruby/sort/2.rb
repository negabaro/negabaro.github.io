ary2 = ["9", "7", "10", "11", "8"]
#p ary2.sort
ary2.sort{|a, b| 
  p "a: #{a.to_i}"
  a.to_i <=> b.to_i 
}