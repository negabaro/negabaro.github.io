class Twice
  def member_count
    pp 9
  end

  private
  def boyfriend
    pp 'xx'
  end
end

Twice.new.member_count
Twice.new.send(:member_count)
Twice.new.send('member_count')

#Twice.new.boyfriend