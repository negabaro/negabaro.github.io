class AbstractClass
  def my_print
    puts_string
  end

  # 抽象メソッド
  def puts_string
    raise "Called abstract method: my_print"
  end
end

class SuperClassA < AbstractClass
  def puts_string
    puts "a"
  end
end

class SuperClassB < AbstractClass
  def print_string
    print "a\n"
  end
  
  def puts_string
    puts "b"
  end
end


c = SuperClassA.new
c.my_print

c = SuperClassB.new
c.my_print