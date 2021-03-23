require "base64"

basic_enc   = Base64.encode64('ab?cd~')
pp basic_enc

pp Base64.decode64(basic_enc)  



urlsafe_enc = Base64.urlsafe_encode64('ab?cd~') # => "YWI_Y2R-ZQ=="
pp urlsafe_enc
pp Base64.urlsafe_decode64(urlsafe_enc) # => "ab?cd~e"


pp "-----------"
pp Base64.strict_decode64(urlsafe_enc)
# `unpack1': invalid base64 (ArgumentError)
