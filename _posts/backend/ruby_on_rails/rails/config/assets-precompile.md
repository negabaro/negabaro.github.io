Rails.application.config.assets.precompile

Rails.application.config.assets.precompile += %w(\*.js)

assets.precompile은 디폴트로는

Rails のデフォルトの設定だと、application.js に全ての JavaScript ファイルが結合されて配信されるようになっているので、この設定を変更します。

# Sprockets の Precompile 対象を追加する

デフォルトでは application.js と application.css しか対象になっていないため、config/initializers/assets.rb に設定を追加し、全ての JavaScript と CSS ファイルを対象にするようにします。
config/initializers/assets.rb
Rails.application.config.assets.precompile += %w(_.js _.css)

https://qiita.com/necojackarc/items/afa674ab10aafa9784eb
