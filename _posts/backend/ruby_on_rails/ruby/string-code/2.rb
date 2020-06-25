pp "45".to_i.chr #-
pp "126".to_i.chr #~
pp "127".to_i.chr #\x7F
pp "127".to_i.chr(Encoding::UTF_8) #\u007F
pp "128".to_i.chr #\x80
#pp "8211".to_i.chr #2.rb:5:in `chr': 8211 out of char range (RangeError)
pp "8211".to_i.chr(Encoding::UTF_8)