Nested contexts can help you here, but keep it shallow (typically one level deep). There are two variables to consider in each example: givens (starting state) and what method is being invoked. You can group things by method or state:

# by method
describe Stack do
  describe "#push" do
    it "adds an element to an empty stack"
    it "adds an element to a non-empty stack"
  end

  describe "#pop" do
    it "returns nil from an empty stack"
    it "returns the last element of a non-empty stack"
    it "removes the last element from a non-empty stack"
  end
end

# by state
describe Stack do
  context "when empty" do
    specify "push adds an element"
    specify "pop returns nil"
  end

  context "when not empty" do
    specify "push adds an element"
    specify "pop returns last element"
    specify "pop removes last element"
  end
end

https://stackoverflow.com/questions/9228282/rspec-large-spec-files-organisation