레전드급 어프로치

```ruby
module Speedable
  def speed
    "This car runs super fast!"
  end
end

class PetrolCar
  include Speedable
  def fuel
    "Petrol"
  end
end

class DieselCar
  include Speedable
  def fuel
    "Diesel"
  end
end
```

# Testing Uncoupled Mixins with RSpec

The only difference between Minitest and RSpec is the syntax. The logic behind the testing strategy is the same.

```ruby
describe FastCar
  before(:each) do
    @test_obj = Object.new
    @test_obj.extend(Speedable)
  end

  it "reports the speed" do
    expect(@test_obj.speed).to eq "This car runs super fast!"
  end
end
As you can see, the strategy is the same. We use a plain Object and extend its singleton class. Then, we set the expectations in our tests.
```

```ruby
class DummyTestClass
  include Speedable
end

describe FastCar
  let(:dummy) { DummyTestClass.new }

  it "reports the speed" do
    expect(dummy.speed).to eq "This car runs super fast!"
  end
end
```
Again, the major difference here is the syntax. We introduce a new DummyTestClass class, where we mix in the Speedable mixin. Then, using RSpec’s let syntax, we create a new object of the DummyTestClass class and set our expectations on it.

https://semaphoreci.com/community/tutorials/testing-mixins-in-isolation-with-minitest-and-rspec


# Testing Coupled Mixins with RSpec
Here is the first strategy:

```ruby
describe Reportable
  before(:each) do
    @test_obj = Object.new
    @test_obj.extend(Reportable)

    class << @test_obj
      def fuel
        "diesel"
      end
    end
  end

  it "reports the fuel type" do
    expect(@test_obj.report).to eq "This car runs on diesel."
  end
end
And the second strategy:

class DummyCar
  include Reportable

  def fuel
    "gasoline"
  end
end

describe Reportable
  let(:dummy) { DummyCar.new }

  it "reports the fuel type" do
    expect(dummy.report).to eq "This car runs on gasoline."
  end
end
```

# Outro

In this tutorial, we reminded ourselves what Mixins are, how they work in Ruby, and how they improve our classes. We identified two types of Mixins, learned about different mixin testing strategies and covered testing with examples written in the two most popular testing libraries for Ruby, RSpec and Minitest.

Although the examples that we covered are quite small, these strategies are applicable to larger mixins as well. What strategies do you prefer when testing Mixins? What are the drawbacks with the strategies that you use? Feel free to join the discussion in the comments below.

P.S. Would you like to learn how to build sustainable Rails apps and ship more often? We’ve recently published an ebook covering just that — “Rails Testing Handbook”