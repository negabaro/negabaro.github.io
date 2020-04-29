class Hello
    # 名前を保持するクラス変数
    @@name = nil
    
    # クラスの初期化メソッド
    def initialize(name)
      #self.hoge
      hoge('xx')
      @@name = name
    end
    
    def hoge(val)
        pp "hoge #{val}"
    end
    # クラスのインスタンスメソッド
    def talk
      puts "hello, #{@@name}"
    end
    
  end
   
  # classのnewメソッドに引数を渡す
  hello = Hello.new("jobs")
   
  # newメソッドからinitializeメソッドに渡って初期化された名前が使用される
  hello.talk