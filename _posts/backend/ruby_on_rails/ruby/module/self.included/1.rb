module Twice
  def self.included(c)
    p "#{c} include #{self}"
  end
end

class Jyp
  include Twice
end