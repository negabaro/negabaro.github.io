
ログレベルについて
Railsが生成するログには以下の５段階のレベルというものが存在する。
ログレベルは情報の必要度が低→高の順で、0→5の数値が充てられている。

ログレベル	名称	内容
0	debug	デバッグ情報など
1	info	一般的な情報
2	warn	警告
3	error	制御可能なエラー
4	fatal	プログラムをクラッシュさせるような制御不可能なエラー
5	unknown	常に記録されるべき不明なエラー
https://docs.ruby-lang.org/ja/latest/library/logger.html

設定したログレベル以上のもののみファイルに保存される。（例：設定したログレベルが3の場合は3,4,5が保存される）

Railsのデフォルトのログレベルは0となっており、何も変更しなければ全てのログが上記のファイルに保存される。

デフォルトのログ出力レベルを変更する
config/環境/設定ファイルでconfig.log_levelを指定することにより、環境ごとに標準で保存するログレベルを変更できる。
config.log_levelをシンボル型の名称(:debug, :fatal)で指定する。

これにより、development環境では全てのログを表示するが、production環境ではエラーログのみ保存するなどと言ったことができる。

config/environments/production.rb
# production環境ではログレベルがerror以上（error|fatal|unknown）のみ保存される
config.log_level = :error
config/environments/development.rb
# development環境では全てのログレベルを保存する
# ※デフォルトがdebug=レベル0になっているため、実際にはlog_level = :debugを設定する必要はない
config.log_level = :debug

The available log levels are: :debug, :info, :warn, :error, :fatal, and :unknown, corresponding to the log level numbers from 0 up to 5 respectively. To change the default log level, use

config.log_level = :warn # In any environment initializer, or
Rails.logger.level = 0 # at any time


# default

# 동적으로 로그

動作モードによってデフォルトのログレベルが決められています。

動作モード(RailsEnv)	デフォルトのログレベル
development	:debug
test	:debug
production	:info


ログレベルを動的に変更する
特定のメソッド内だけでログレベルを:debugに変更したりといったことも可能です。

class UsersController < ApplicationController
  def index
    Rails.logger.level = Logger::DEBUG   # Rails.logger.level = 0 でもOK
  end
end

URLに与えるパラメータで制御することもできますね。ApplicationController内にbefore_filterでセットするとよいでしょう。

class ApplicationController < ActionController::Base
  before_filter :set_debug_mode

private
  def set_debug_mode
    if params[:debug]
      Rails.logger.level = Logger::DEBUG
    end
  end
end
こうするとURLのパラメータにdebugをつけた場合

http://localhost/users/2?debug
ログレベルが:debugになります。


http://rails.hatenadiary.jp/entry/2013/02/06/181430
https://stackoverflow.com/questions/12180690/set-logging-levels-in-ruby-on-rails

https://qiita.com/sobameshi0901/items/b963e7046e2ae8b8e813

