rubyではhashのキーがstringかsymbolかを間違えてはまることがよくあります.
active supportのstringify_keysを使うとハッシュのキーをstringに変換できます.
どちらの形式でもうまく動くようにメソッドが設計されていると親切だと思います.

require "active_support"
require "active_support/core_ext"

def stringify( hash )
  hash = hash.stringify_keys
end

p stringify( january:"winter", february:"winter" )
  # {"january"=>"winter", "february"=>"winter"}