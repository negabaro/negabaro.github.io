Ruby / Rails関連
 2020.04.27
週刊Railsウォッチ（20200427前編）Railsで避けたい8つのミス、ridgepole導入の注意点、RDS ProxyのPostgreSQL対応ほか
 hachi8833 & 
 
 
 
 シェア
 
 ツイート
 
 ブックマーク
 
 LINE
こんにちは、hachi8833です。

つっつきボイス:「近所のビアパブに注文しておいたビール取りに行ってた🍺」「お疲れさまです！」「最近酒類の販売免許が飲食店向けに割と簡単な手続きで申請できるようになったじゃないですか」「あ、酒の持ち帰りは居酒屋の免許とは別なのか😳」「持ち帰りだと販売として扱われるので☺️」「なるほど〜」「本来だと酒販免許を取るのはかなり面倒なんですけど、その店は5日ぐらいで取れたって😋」「そういえば都内で店やってる知り合いも2日で取れたって言ってました😋」「都内だと特に早いらしい」「ではつっつき始めましょう〜」

参考: 酒類のテイクアウト販売が可能になる「期限付酒類小売業免許」とは？─ 免許の概要から申請のポイントまで | 日本酒専門WEBメディア「SAKETIMES」

各記事冒頭には⚓でパーマリンクを置いてあります: 社内やTwitterでの議論などにどうぞ
「つっつきボイス」はRailsウォッチ公開前ドラフトを（鍋のように）社内有志でつっついたときの会話の再構成です👄
毎月第一木曜日に「公開つっつき会」を開催しています: お気軽にご応募ください
⚓Rails: 先週の改修（Rails公式ニュースより）
⚓Active Recordのremove_indexにif_exists:オプションが追加
PR: Add `if_exists` option to `remove_index` by eileencodes · Pull Request #38967 · rails/rails
# activerecord/lib/active_record/connection_adapters/postgresql/schema_statements.rb#L451
-       def remove_index(table_name, column_name = nil, options = {}) #:nodoc:
+       def remove_index(table_name, column_name = nil, options = {}) # :nodoc:
          table = Utils.extract_schema_qualified_name(table_name.to_s)

          if column_name.is_a?(Hash)
            options = column_name.dup
            column_name = options.delete(:column)
          end
          if options.key?(:name)
            provided_index = Utils.extract_schema_qualified_name(options[:name].to_s)
            options[:name] = provided_index.identifier
            table = PostgreSQL::Name.new(provided_index.schema, table.identifier) unless table.schema.present?
            if provided_index.schema.present? && table.schema != provided_index.schema
              raise ArgumentError.new("Index schema '#{provided_index.schema}' does not match table schema '#{table.schema}'")
            end
          end

+         return if options[:if_exists] && !index_exists?(table_name, column_name, options)
+
          index_to_remove = PostgreSQL::Name.new(table.schema, index_name_for_remove(table.to_s, column_name, options))
+
          algorithm =
            if options.key?(:algorithm)
              index_algorithms.fetch(options[:algorithm]) do
                raise ArgumentError.new("Algorithm must be one of the following: #{index_algorithms.keys.map(&:inspect).join(', ')}")
              end
            end
+
          execute "DROP INDEX #{algorithm} #{quote_table_name(index_to_remove)}"
        end
つっつきボイス:「remove_indexにif_existsオプションを渡す必要のある巨大プロジェクトは大変そう😆」「😆」「本来ならRails標準のActiveRecord::Migrationを使うべきかなと😆」「ridgepoleみたいなものを使う方がいいのかなという気もするけど🤔」

リポジトリ: winebarrel/ridgepole: Ridgepole is a tool to manage DB schema. It defines DB schema using Rails DSL, and updates DB schema according to DSL. (like Chef/Puppet)
「if_existsを使うシチュエーションだとインデックス名が同じでオプション名が同じでないものについては管理できてないことになるだろうから、if_existsしたインデックスがMigrationで作られたインデックスと同一であることまでは保証しきれないんじゃないかという気がしますね😆」「付け焼き刃というか😆」「RailsのMigrationにSQL書いて追加したインデックスとかまでは検出できなさそうな予感😆」「むしろif_existsに頼る状況にならないようにしたい☺️」

「想像ですけどif_existsが欲しい理由ってもしかすると、db:migrateを含むコードが途中でコケるとインデックスだけ中途半端に作られてしまうからif_existsしたいということだったりして？」「あ〜😳」「それってRails開発中のあるあるなんですけど😆、本当ならMigrationがコケたときに安全にロールバックするようにすべきかなと思いますし☺️」「productionリリース後の方がif_existsつけたいかも🤔: remove_indexを2回叩いてMigrationが落ちたら手動で修正するしかありませんし」

このプルリクは、remove_indexにif_existsオプションを渡すことで、インデックスが削除済みの場合に無視されるようにする。この動作は、カラムのif/if_not_exists（#38352）や、add_indexの:if_not_exists（#38555）の動作に合わせてある。
この改修はGitHubでのMigrationでインデックスが削除済みならraiseしたくない場合に有用であることに気づいた。このおかげでremove_indexのモンキーパッチを削除できる。
index_name_for_removeメソッド呼び出しの後でraiseすることも検討したが、こちらのメソッドだとインデックスが存在しない場合はメソッドが実行される前にraiseする。これをリファクタリングするコミットもやってみたが、熟慮の結果、他の実装よりもこちらの方がより明快で素直だと考えた。
今回の変更ではadd_indexのテストにバリデーションも少し追加してある。
編集したメソッドのnodocの修正をよろしく。
同PRより

⚓ridgepoleの注意点
「…ridgepoleといえば、最近ridgepoleが入ってるプロジェクトをやったんですけど、それはそれはカオスでしたよ😇: 何も考えずにridgepoleが導入されてて、もう苦労しかないので何とかして消し去りたいけどめんどくさいのでそのままです🤢」

「ridgepoleのようなマイグレーターではup/down以外のデータのMigrationを扱えないのが面倒😅」「普通にMigrationしようとしたらridgepoleがいてできませんでした😇」「ridgepoleには特定の操作にフックを仕込むとかないですよね？」「はい、ありません😆: なのでわざわざデプロイしてrakeタスク叩いてもう1回デプロイして、というバカバカしい手順を踏むしかなくて😭」「ああ、たしかにそれしかできなくなりますね😅」「Rails標準のMigrationなら全部やれたのに…💢」「Migrationには時系列がありますけど、ridgepoleにはありませんし😆」「なので個人的にはridgepoleキライです」「自分も好きというほどではありませんが☺️」

「クックパッドさんはridgepole入れるにあたって『Migrationは行わない』と決めてますね↓」「困ったらデータを消しても良いようなプロトタイピングや小規模開発とか、Migrationに代わるデータの管理運用がちゃんとした確立されているプロジェクトで用途に合わせてridgepoleを使うのは別に良いと思うんですが、代わりの運用方法がないまま何も考えずにridgepoleが導入されてたのがつらかった😢」「Migrationが必要な案件にridgepoleが入ってたとは😳」「まあRailsのMigrationもひどいのを書かれたら同じくつらいので、チームメンバーのモラルが必要なのは変わりませんし、結局プロジェクトの方針次第ですね☺️」「db/schema.rbは大規模開発に完全に向いてないと思います😤」

元記事: クックパッドにおける最近のActiveRecord運用事情 - クックパッド開発者ブログ
「ところでMigrationだとGitの履歴とMigrationファイルの履歴が二重になるよねみたいな話をどこかで聞いたような気がします」「うぅんそれはちょっと違うかな: スキーマの履歴を管理するだけならridgepoleとGitでもいいんでしょうけど、Migrationはスキーマ履歴の管理だけじゃなくてスキーマ更新以外のデータ移行のような作業も含められますし、それがRailsのMigrationのメリットだと思うんですけどね🧐」「Migrationは履歴を知るためのものじゃなくてデータベースを運用するための機能ですから🧐」「う、失礼しました😅」

⚓touch_attributes_with_timeがキーワード引数を取るよう修正
commit: touch_attributes_with_time takes keyword arguments · rails/rails@2fac5de
関連コミット: touch_attributes_with_time takes keyword arguments · rails/rails@404e1a0
# activerecord/lib/active_record/counter_cache.rb#L52
          if touch
            names = touch if touch != true
-           updates.merge!(touch_attributes_with_time(*names))
+           names = Array.wrap(names)
+           options = names.extract_options!
+           touch_updates = touch_attributes_with_time(*names, **options)
+           updates.merge!(touch_updates)
          end
つっつきボイス:「@kamipoさんによる修正です」「例のキーワード引数関連の修正ですね☺️」「このテストだけtime: Time.now.utcが書いてある↓あたりが試行錯誤感」「キーワード引数対応はまだ先がありそう…」

# activerecord/test/cases/counter_cache_test.rb#L264
  test "reset multiple counters with touch: true" do
    assert_touching @topic, :updated_at do
      Topic.update_counters(@topic.id, replies_count: 1, unique_replies_count: 1)
-     Topic.reset_counters(@topic.id, :replies, :unique_replies, touch: true)
+     Topic.reset_counters(@topic.id, :replies, :unique_replies, touch: { time: Time.now.utc })
    end
  end
⚓rename_columnするとMySQLのカラムコメントが消えるのを修正
PR: Preserve column comment on renaming column by islam-taha · Pull Request #38995 · rails/rails
# activerecord/lib/active_record/connection_adapters/abstract_mysql_adapter.rb#L663
        def rename_column_for_alter(table_name, column_name, new_column_name)
          column  = column_for(table_name, column_name)
          options = {
            default: column.default,
            null: column.null,
-           auto_increment: column.auto_increment?
+           auto_increment: column.auto_increment?,
+           comment: column.comment
          }

つっつきボイス:「コメントが消えてたとは😆」「rename_columnの実装レベルの話か: abstractのMySQLアダプタを修正しているし」「所定のオプションだけ通すようにしてたところに漏れがあったっぽい」「バグですね」

⚓6.1でretry_jitter = 0.15がデフォルトで入る
PR: Add retry_jitter to 6.1 new framework defaults by eugeneius · Pull Request #38993 · rails/rails
# railties/lib/rails/application/configuration.rb#L159
        when "6.1"
          load_defaults "6.0"

-         if respond_to?(:active_job)
-           active_job.retry_jitter = 0.15
-         end
-
          if respond_to?(:active_record)
            active_record.has_many_inversing = true
          end
@@ -172,6 +168,7 @@ def load_defaults(target_version)
          end

          if respond_to?(:active_job)
+           active_job.retry_jitter = 0.15
            active_job.skip_after_callbacks_if_terminated = true
          end

          if respond_to?(:action_dispatch)
            action_dispatch.cookies_same_site_protection = :lax
          end
つっつきボイス:「前に話題にしたjitterがデフォルトで入るようになりました（ウォッチ20191216）」「こういうのはデフォルトがありがたい😋」「リトライのジッターだし大丈夫でしょう☺️」「これで困るようならたぶんアプリの設計の方がおかしい😆」

⚓Webpackerのintegrityチェックが削除された
PR: Remove yarn integrity check by rossta · Pull Request #2518 · rails/webpacker
# lib/webpacker/configuration.rb#L66
  def check_yarn_integrity=(value)
-   data[:check_yarn_integrity] = value
- end
-
- def check_yarn_integrity?
-   fetch(:check_yarn_integrity)
+   warn "Webpacker::Configuration#check_yarn_integrity=(value) has been deprecated. The integrity check has been removed from Webpacker so changing this setting will have no effect."
  end
つっつきボイス:「Webpackerの修正ですが、昨日bundle updateした後でDockerのRails起動が急に速くなって気づきました」「yarnのintegrityチェックをやめたということ？」「プルリクコメントに、yarnの作者自身がyarn checkは使うなと言ってるのが引用されてました😆」「しかもyarn 2.0でyarn check削除されてるからそれもあって削ったのね😆」「お前のせいで起動遅かったのかと😭」

⚓番外: DHHが#38588をrevert
元記事: Revert “Deprecate rendering templates with . in the name” by dhh · Pull Request #39012 · rails/rails
# actionview/lib/action_view/template/resolver.rb#L229
      def find_template_paths_from_details(path, details)
-       if path.name.include?(".")
-         ActiveSupport::Deprecation.warn("Rendering actions with '.' in the name is deprecated: #{path}")
-       end
-
        query = build_query(path, details)
        find_template_paths(query)
      end
つっつきボイス:「先週のウォッチ20200413で取り上げた#38858のdeprecationをDHHがrevertしてました」「ああ、影響範囲割とでかいんじゃないのって話したヤツ？」「ですです」「deprecation自体を取りやめるということは、確実に検出できるまで差し止めるということでしょうね☺️」

文字列の式展開で誤ってdeprecation warningがトリガされるのが修正されるまでは#38858をrevertしておく。
同コミットより

⚓Rails
⚓Railsで避けたいありがちな8つのミス
元記事: 8 Most Common Rails Mistakes Developers Should Avoid | Medium
つっつきボイス:「既視感ありまくりですけど、まとめてくれているのがいいかなと思って」「N+1問題にcredentialにファットコントローラもファットモデルもやめろ話とかね☺️」「別サービスを呼び出すときはなるべく非同期にと」「?付きの述語メソッドはtrueかfalseを返せというのは命名の話ね😆」「そうしない人がいるのか…😅」「メモ化を使うな、って書いてるのかと思ったらメモ化を使わないミステイクという話か😳」「この見出しの英文、統一感ないですね😆」「ミステイクにnotを付けるのはわかりにくい〜😆」「命名ルールに従う、にnotが付いてないとミステイクにならないんじゃ？」「こっちも整合してない😆」「ともあれ基本的な内容ですね☺️」「たぶん反論は出ないでしょう😆」

見出しを統一してみました。

ミス1: N+1クエリをチェックしない
ミス2: コンフィグが安全でない
ミス3: コントローラのロジックが多すぎる
ミス4: モデルのロジックが多すぎる
ミス5: 外部サービス呼び出しが非同期化されてなくてブロックされる
ミス6: 述語メソッド（?で終わるメソッド）がtrue/falseを返さない
ミス7: メモ化を使ってない
ミス8: Railsの命名ルールに沿ってない

https://medium.com/@jummanihunny/top8-common-mistakes-avoided-by-ruby-on-rails-developers-1786e70266f0