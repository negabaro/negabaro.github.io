https://qiita.com/kidach1/items/565c2c077ae8d15fe3a8

ails 公式のプラグイン機構で、Rails のあらゆるコンポーネントは Railtie の機能を保有している。

Railtie に基づいたプラグインを部品として組み合わせていくことで、Rails の初期化処理（イニシャライザ）やジェネレータ（rails generate ~）、Rake タスク、設定項目（config）等々コアな部分を手軽に拡張していくことが出来る。
その本体は

```
module MyPlugin
  class Railtie < Rails::Railtie
    # config.my_plugin = ...
    # initializer "my_lugin.set_configs" ...
  end
end
```

Railtie こそが Rails の世界を司る
※ パーフェクト Ruby on Rails 引用の、Railtie/Engine/Application の関係を示した疑似コード。

```
module Rails

  class Railtie
  end

  class Engine < Railtie
  end

  class Application < Engine
  end

end
```

Railtie が全ての基本となり、さらに Engine があり、その上に Application（日常的な文脈における所謂「Rails」）がある。
