class Twice
  def sana_birth_date
    pp "1996/12/29"
  end
  def jihyo_birth_date
    pp "1997/2/1"
  end
end

member = 'sana'
Twice.new."#{member}_birth_date"
Twice.new.send("#{member}_birth_date")