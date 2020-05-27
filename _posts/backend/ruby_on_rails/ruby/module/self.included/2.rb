module YourModule
  def self.included(base)
    base.extend(ClassMethods)
  end
 
  module ClassMethods
    def hello
      puts 'Hello!'
    end
  end
 
  def bye
    puts 'Bye!'
  end
end