assert_valid_keys
active supportのassert_valid_keysは許可するハッシュキーだけを通して、それ以外のものが含まれたら例外を投げます.


require "active_support"
require "active_support/core_ext"

def assert_args( **args )
  args.assert_valid_keys(:first_name, :last_name)
end

assert_args( first_name: "Issaac" )
  # last_nameが足りないが例外にはならない
assert_args( first_name: "Issaac", last_name: "Newton" )
  # 許可リストのキーしか含まないため問題なし
assert_args( first_name: "Issaac", last_name: "Newton", age: 30 )
  # 許可リスト以外のキー(age)が含まれるため例外
  # Unknown key: :age. Valid keys are: :first_name, :last_name (ArgumentError)