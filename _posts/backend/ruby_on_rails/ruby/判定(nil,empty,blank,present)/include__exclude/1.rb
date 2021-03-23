class Object
  def included? *params
    params.each do |param|
      return true if param === self 
    end
    false
  end
end

pp "apple".included? "orange", "apple"
