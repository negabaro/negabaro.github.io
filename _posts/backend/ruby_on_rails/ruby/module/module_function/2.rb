module Test_module
  def normal_method
      # __method__ は実行中のメソッド名を文字列で返す
      puts "called #{__method__}"
  end

  def self.self_method
      puts "called #{__method__}"
  end

  def module_function_method
      puts "called #{__method__}"
  end
  module_function :module_function_method
end

#Test_module.normal_method
# => NoMethodError

Test_module.self_method
# => called self_method

Test_module.module_function_method
# => called module_function_method

include Test_module
Test_module.normal_method