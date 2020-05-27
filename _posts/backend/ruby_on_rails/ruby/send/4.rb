class Twice
  attr_accessor :name
  attr_accessor :secret
  def initialize name3
    @name = name3
    @name = name
    @secret = secret || 'real'
  end

  def age(num)
    
    puts "#{@name}의 #{@secret}나이는 #{num}살입니다."
  end
end


t = Twice.new('sana')
t.send(:age, 23)
t.send("name=", 'dahyun')
t.send(:age, 21)

t.send("secret=", 'unreal')
t.send(:age, 21)