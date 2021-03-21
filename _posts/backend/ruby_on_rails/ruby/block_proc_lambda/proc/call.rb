p = Proc.new { puts '다현!'}

p.call()
# 다현!

p.()
# 다현!

p[]

p.yield