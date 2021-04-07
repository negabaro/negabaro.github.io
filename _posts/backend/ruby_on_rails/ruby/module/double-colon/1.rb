class Twice
  def initialize
    p "root Twice"
  end
end

module Jyp
  class Twice
    def initialize
      p "in module Twice"
    end
  end

  ::Twice.new # => "root Twice"
  #Twice.new # => "in module Twice"
end