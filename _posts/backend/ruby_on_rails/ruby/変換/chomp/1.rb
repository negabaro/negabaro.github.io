row = ["[残り24時間](24時間経過)\r", "(23時間経過)\r", "(3時間経過)\r"]

#row.chomp("\r")

row.each do |r|
 p r.chomp("\r")
end

p "==========="

row.each do |r|
  p r.split("\r")
 end


p "==========="

str = "\rdahyun"
str2 = "dah\ryun"
str3 = "dahyun\r"

p str.chomp("\r")
p str2.chomp("\r")
p str3.chomp("\r")

p "==========="

p str.split("\r")
p str2.split("\r")