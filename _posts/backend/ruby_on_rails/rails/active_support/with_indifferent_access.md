with_indifferent_access
active supportのwith_indifferent_accessメソッドを使うと、stringでもsymbolでもアクセスできるハッシュを作成できます.
ハッシュが拡張されたActiveSupport::HashWithIndifferentAccessオブジェクトが返されます.

require "active_support"
require "active_support/core_ext"

def indifferent_access( hash )
  hash = hash.with_indifferent_access
  p hash[:january]
  p hash["january"]
  p hash[:february]
  p hash["february"]
  p hash[:march]
  p hash["march"]
end

indifferent_access( "january"=>"１月", "february"=>"２月", march: "３月" )
  # "１月"
  # "１月"
  # "２月"
  # "２月"
  # "３月"
  # "３月"