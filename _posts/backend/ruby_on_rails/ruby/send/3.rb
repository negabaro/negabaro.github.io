class Twice
  private
  def boyfriend
    pp 'xx'
  end
end

#Twice.new.boyfriend # private method `boyfriend' called 
Twice.new.send(:boyfriend) #"xx"
Twice.new.send('boyfriend')
#Twice.new.public_send('boyfriend') #private method `boyfriend' called
#Twice.new.public_send(:boyfriend) #private method `boyfriend' called
#Twice.new.public_send(:instance_eval, :boyfriend) #`instance_eval': no implicit conversion of Symbol into String (TypeError)
Twice.new.public_send(:instance_eval, 'boyfriend')
