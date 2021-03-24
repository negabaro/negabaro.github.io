symbolize_keys
stringify_keysの逆をやりたいときはsymbolize_keysです.

require "active_support"
require "active_support/core_ext"

def symbolize( hash )
  hash = hash.symbolize_keys
end

p symbolize( "january"=>"winter", "february"=>"winter" )
  # {:january=>"winter", :february=>"winter"}
ネストされたハッシュのキーをsymbolizeするにはdeep_symbolize_keysを使います.