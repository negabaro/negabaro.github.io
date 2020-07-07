@@hoge5 = "xx"
p defined? @@hoge5 #=> "class variable"

p defined? hoge

hoge2 = nil
p defined? hoge2

hoge3 = ""
p defined? hoge3


@hoge4 = "xx"
p defined? @hoge4 #=>  "instance-variable"

