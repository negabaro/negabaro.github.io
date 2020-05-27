module One
  def hello
    puts 'hello from module One'
  end
end

module Two
  def self.included(base)
    base.class_eval do
      include One
    end
  end
end

class ExampleClass
  include Two
end

ExampleClass.new.hello # => hello from module One

#https://stackoverflow.com/questions/5160780/what-does-self-includedbase-do-in-ruby-on-rails-restful-authentication