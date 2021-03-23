str = "export keke=true"
str2 = "export keke = true"
str3 = "export keke= true"
str4 = "export keke =true"

REGEXP = /(\w+)=(\w+)/

p str.scan(REGEXP).to_h # => {"keke"=>"true"}
p str2.scan(REGEXP).to_h # => {}
p str3.scan(REGEXP).to_h # => {}
p str4.scan(REGEXP).to_h # => {}
p "===================="

REGEXP_V2 = /(\w+)=["']?(\w+)["']?/

p str.scan(REGEXP_V2).to_h # => {"keke"=>"true"}
p str2.scan(REGEXP_V2).to_h # => {}
p str3.scan(REGEXP_V2).to_h # => {}
p str4.scan(REGEXP_V2).to_h # => {}
p "===================="

REGEXP_V3 = /(\w+)\s*=\s*["']?(\w+)["']?/

p str.scan(REGEXP_V3).to_h # => {"keke"=>"true"}
p str2.scan(REGEXP_V3).to_h # => {"keke"=>"true"}
p str3.scan(REGEXP_V3).to_h # => {"keke"=>"true"}
p str4.scan(REGEXP_V3).to_h # => {"keke"=>"true"}
p "===================="
str5 = "export keke=http://keke.com"
str6 = "export keke = http://keke.com"
str7 = "export keke =http://keke.com"
str8 = "export keke= http://keke.com"

REGEXP_V4 = /([\w|_]+)\s*=\s*"(.*)"\s*/

p str5.scan(REGEXP_V4).to_h # => {}
p str6.scan(REGEXP_V4).to_h # => {}
p str7.scan(REGEXP_V4).to_h # => {}
p str8.scan(REGEXP_V4).to_h # => {}