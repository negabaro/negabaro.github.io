has_secure_passwordでauthenticateメソッドが追加される仕組み

class User < ActiveRecord::Base
  has_secure_password
end

user = User.new
user.authenticate('password')
動的にメソッドが追加される仕組みにより、これ以上無いくらいすっきりモデルの定義が書けますよね。

自作のGemなどでこんなAPIを作りたいと思ったので、調べました

結論
見かけ上は、下記のコードで同等の振る舞いを持たせることが可能です。

secure_password.rb
module SecurePassword
  def has_secure_password
    include SecurePassword::InstanceMethodsOnActivation
  end

  module InstanceMethodsOnActivation
    def authenticate
      true
    end
  end
end
active_record.rb
require_relative './secure_password'

class ActiveRecord
  extend SecurePassword
end
user.rb
require_relative './active_record'

class User < ActiveRecord
  has_secure_password
end
とすると、

require_relative './user.rb'

user = User.new
puts user.authenticate
#=> true
となります

https://qiita.com/acro5piano/items/416c08a808c850e0477e