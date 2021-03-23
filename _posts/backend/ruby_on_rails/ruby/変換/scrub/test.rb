

arr = %w( d é f )

p arr



str = "白鷗大学"

p str


p str.scrub('?')


str2 = "\xff"
str2.force_encoding('UTF-8')
p str2
p str2.scrub('?')
