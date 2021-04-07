RSpec: how can I mixin a module into RSpec test?

module Share
  def share
  end
end

describe "Share Test" do
   extend Share
end
You can call the methods of the module directly within the tests

4

A common practice in RSpec is to store such logic under spec/support. For instance:

# spec/support/ratings_macros.rb
module RatingsMacros
  ...
end
You then need to load it from your spec_helper:

# spec/spec_helper.rb
...
RSpec.configure do |config|
  ...
  config.include RatingsMacros
You can now call in your tests all the methods defined in the RatingsMacros module.



---------


These are typically saved under spec/support and loaded via spec_helper.rb. Be sure to read the docs to understand how to load the shared code--it is not automagically performed for you.

Once they are defined you can include them like so:

# spec/support/decorated_model.rb
shared_examples "decorated_model" do
  it "can be decorated" do
    subject.should respond_to?(:decorate)
  end
end

# my_class_spec.rb
describe MyClass do
  it_behaves_like "decorated_model"
end


https://stackoverflow.com/questions/20524731/rspec-how-can-i-mixin-a-module-into-rspec-test/20525398