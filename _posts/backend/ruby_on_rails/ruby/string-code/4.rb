
pp "ｱ" =~ /[ -~｡-ﾟ]/
pp "ア" =~ /[^ -~｡-ﾟ]/
pp "-------"
str = "-"
pp str.encoding
pp str =~ /[ -~｡-ﾟ]/
#pp str =~ /[^ -~｡-ﾟ]/
str = "‒"
pp str.encoding
pp str =~ /[ -~｡-ﾟ]/
#pp str =~ /[^ -~｡-ﾟ]/


str = "–"
pp str.encoding
pp str =~ /[ -~｡-ﾟ]/
#pp str =~ /[^ -~｡-ﾟ]/

str = "−"
pp str.encoding
pp str =~ /[ -~｡-ﾟ]/
#pp str =~ /[^ -~｡-ﾟ]/

str = "ー"
pp str.encoding
pp str =~ /[ -~｡-ﾟ]/
#pp str =~ /[^ -~｡-ﾟ]/