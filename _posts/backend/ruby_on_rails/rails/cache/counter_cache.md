## counter_culture

Railsアプリ向けの、ターボの効いたカウンタキャッシュです。Rails標準のカウンタキャッシュと比べて多くの点が改善されています。

カウンタキャッシュの更新を、値の作成や破棄のほか、値の変更時にも行える
「多階層カウンタキャッシュ」をサポート（訳注: リレーション階層が離れていてもカウンタキャッシュの更新を直接指定できる）
動的なカラム名をサポート: オブジェクトの種類ごとにカウンタキャッシュを分離
カウントの他に合計も出せる
Ruby 2.2.5と2.3.1、およびRailsの最新パッチリリースである3.2、4.0、4.1、4.2、5.0、5.1でテストされています。

インストール
Gemfileにcounter_cultureを追加します。

gem 'counter_culture', '~> 1.0'
次にbundle installを実行します。

データベーススキーマ
必要なカラムをすべてのカウンタキャッシュについて作成しなければなりません。counter_cultureのジェネレータで、マイグレーション用のスケルトンを作成できます。

rails generate counter_culture Category products_count
上を実行すると、以下のようなコードを含むマイグレーションが生成されます。

add_column :categories, :products_count, :integer, null: false, default: 0
注意: gemが正常に機能するには、カラムは必ずNOT NULLに設定し、ゼロ値のデフォルトを設定する必要があります。

既存のデータにカウンタキャッシュを追加する場合は、生成されたマイグレーションに手動で値を設定する必要があります。

利用法
シンプルなカウンタキャッシュ
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category
end

class Category < ActiveRecord::Base
  has_many :products
end
Productモデルにcounter_culture :categoryと書くことで、Categoryモデルのcategoriesテーブルのproducts_countカラムのカウンタキャッシュが最新に保たれます。

多階層カウンタキャッシュ
class Product < ActiveRecord::Base
  belongs_to :sub_category
  counter_culture [:sub_category, :category]
end

class SubCategory < ActiveRecord::Base
  has_many :products
  belongs_to :category
end

class Category < ActiveRecord::Base
  has_many :sub_categories
end
Productモデルにcounter_culture [:sub_category, :category]と書くことで、リレーション階層が離れたCategoryモデルのcategoriesテーブルのproducts_countのカウンタキャッシュを最新に保ちます。カウントキャッシュを指定できる階層レベル数に制限はありません。

カウンタキャッシュは、リレーションの階層レベルごとに指定する必要があります。上のコード例で、CategoryとSubCategoryのそれぞれにproductのカウントが必要な場合は、Productクラスを次のように変更します。

class Product < ActiveRecord::Base
  belongs_to :sub_category
  counter_culture [:sub_category, :category]
  counter_culture [:sub_category]
end
カラム名のカスタマイズ
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: "products_counter_cache"
end

class Category < ActiveRecord::Base
  has_many :products
end
Productモデルにcounter_culture :category, column_name: "products_counter_cache"と書くことで、Categoryモデルのcategoriesテーブルのproducts_counter_cacheカラムのカウンタキャッシュが最新に保たれます。カウントキャッシュを指定できる階層レベル数に制限はありません。

動的なカラム名
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: proc {|model| "#{model.product_type}_count" }
  # product_type属性は ['awesome', 'sucky'] のいずれか
end

class Category < ActiveRecord::Base
  has_many :products
end
増分（delta magnitude）の指定
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: :weight, delta_magnitude: proc { model.product_type == 'awesome' ? 2 : 1 }
end

class Category < ActiveRecord::Base
  has_many :products
end
Productモデルに上のように書くことで、Categoryモデルのweightカラムのカウンタキャッシュが最新に保たれます。productがawesomeなら増分は2、それ以外なら増分は1になります。

次のように、delta_magnitudeに固定の増分を指定することもできます。

class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: :weight, delta_magnitude: 3
end

class Category < ActiveRecord::Base
  has_many :products
end
Productに追加が1件あると、Categoryのweightカラムが3増え、Productで削除が1件あると3減ります。

条件付きカウンタキャッシュ
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: proc {|model| model.special? ? 'special_count' : nil }
end

class Category < ActiveRecord::Base
  has_many :products
end
Productモデルに上のように書くことで、Categoryモデルのspecial_countのカウンタキャッシュが最新に保たれます。productのspecial?がtrueの場合にのみ、special_countを更新します。

カウントの代わりに合計を出す
カウントを実行する代わりに、合計を自動更新することもできます。
この場合、対象のカウンタを1ずつ増やす代わりに、フィールド値の合計で更新します。

カウントを行うオブジェクトの特定のフィールド値をカウンタの増分に使いたい場合は、:delta_columnオプションを使います。

たとえば、Productモデルのテーブルにweight_ouncesフィールドがあり、Categoryモデルのproduct_weight_ouncesにあるすべてのproductについてweightの合計を最新に保つ場合は、次のようにします。

class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: 'product_weight_ounces', delta_column: 'weight_ounces'
end

class Category < ActiveRecord::Base
  has_many :products
end
Productモデルに上のように書くことで、Categoryモデルのproduct_weight_ouncesのカウンタキャッシュが最新に保たれます。
このカウンタキャッシュの値は、Categoryに関連付けられているProductの各レコードのweight_ouncesを合計した値になります。

delta_columnオプションでは、:integerを含むすべての数値型カラムをサポートします。特に、:floatもサポート対象かつテスト済みです。

foreign_key_valuesによる外部キー動的上書き
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, foreign_key_values:
      proc {|category_id| [category_id, Category.find_by_id(category_id).try(:parent_category).try(:id)] }
end

class Category < ActiveRecord::Base
  belongs_to :parent_category, class_name: 'Category', foreign_key: 'parent_id'
  has_many :children, class_name: 'Category', foreign_key: 'parent_id'

  has_many :products
end
上のコードによって、Categoryモデルのcategoriesテーブルのproducts_countカラムのカウントキャッシュが最新に保たれます。各productは、直接のcategoryのカウンタと、そのcategoryの親のカウンタの両方に影響します。カウントキャッシュを指定できる階層レベル数に制限はありません。

カウンタ変更時にタイムスタンプを更新する
counter_culture gemは、カウンタキャッシュ更新時にモデルのタイムスタンプをデフォルトでは更新しません。カウンタキャッシュカラムの更新時にタイムスタンプも更新したい場合は、touchオプションにtrueを指定します。

  counter_culture :category, touch: true
このオプションは、カウンタキャッシュ変更時にキャッシュを無効にする必要がある場合に便利です。

カスタムのタイムスタンプカラム
特定のカウンタキャッシュが変更された場合にのみ更新されるタイムスタンプカラムを独自に指定することもできます。

  counter_culture :category, touch: 'category_count_changed'
上のようにオプションを指定すると、category_counter_cacheの更新時にcategory_count_changedカラムとupdated_atカラムが常に両方とも更新されます。

commit後にカウンタキャッシュを更新する
デフォルトでは、counter_cultureをトリガーした同一のActiveRecordトランザクション内のカウンタキャッシュを更新します（原注: この動作は0.2.3から1.0.0のアップデートで導入されました）（訳注: それ以前はトランザクション外のカウンタキャッシュも更新されました）。

PostgreSQLの古いバージョンでデッドロックが発生するなどの理由でトランザクション外のカウンタキャッシュを更新したい場合は、以下の方法でこの機能をオンにできます。

  counter_culture :category, execute_after_commit: true
ただしトランザクションを扱うfixtureでexecute_after_commitを使うと、更新されたカウンタ値がテストに表示されなくなりますのでご注意ください。


カウンタキャッシュ値を手動で流用する
主要なデータのカウンタキャッシュ値を他の場所で使いたい場合があります。これは、たとえばカウンタキャッシュを既存のデータに追加する場合に必要になります。カウンタキャッシュに含まれる無効な値を検出するために、カウンタキャッシュは定期的に実行することをおすすめします（BestVendor社の場合、週に1度実行しています）。

# Productで定義済みの全カウントを自動で修正する
Product.counter_culture_fix_counts

# Productで定義済みの全カウントを自動で修正する
# ただし:categoryのリレーションについては除く
Product.counter_culture_fix_counts except: :category

# Productの:categoryリレーションについてのみカウントを自動で修正する
# :exceptと:onlyには、同じ階層レベルにあるリレーションの配列も指定できる
# カウントの自動修正を多階層にわたって行う場合は、これではなく、その次の[[ ]]書式が必要
Product.counter_culture_fix_counts only: :category

# Productの2つの階層レベルのリレーション（[:subcategory, :category]）についてのみカウントを自動で修正する
# :exceptと:onlyには配列も指定できる
Product.counter_culture_fix_counts only: [[:subcategory, :category]]
カウント用のcounter_culture_fix_countsメソッドでは、レコードをバッチ処理することでメモリ消費を抑えています。デフォルトのバッチサイズは1000ですが、以下の方法で設定することもできます。

# initializerに追加
CounterCulture.config.batch_size = 100
メソッド呼び出しでも:batch_sizeオプションでサイズを指定できます。

Product.counter_culture_fix_counts batch_size: 100
counter_culture_fix_countsはデバッグ用に、すべての無効な値をハッシュの配列として返します。ハッシュの形式は次のとおりです。

{ entity: カウントを修正するモデル,
  id: カウントが誤っているモデルのid,
  what: 誤ったカウントがあるカラム名,
  wrong: 前回保存されている誤ったカウント,
  right: 修正された正しいカウント }
counter_culture_fix_countsの動作は高速で、クエリ数を最小限に抑えるよう最適化されています。

動的なカラム名を扱う
動的なカラム名が使われているカウンタキャッシュを手動で流用する場合、以下の追加設定が必要です。

class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category,
      column_name: proc {|model| "#{model.product_type}_count" },
      column_names: {
          ["products.product_type = ?", 'awesome'] => 'awesome_count',
          ["products.product_type = ?", 'sucky'] => 'sucky_count'
      }
  # product_type属性は ['awesome', 'sucky'] のいずれか
end
外部キー動的上書きの制限事項
:foreign_key_valuesオプションを使っている場合、「カウンタキャッシュ値を手動で流用する」に記載されている方法はサポートされません。独自のコードを書く必要があります。

paranoia gemによる論理削除について
counter_culter gemは論理削除（soft delete）をサポートしているので、paranoia gemの利用時にもカウンタを正しく更新します。ただし、リストア後に正しくカウントアップされるためには、モデルでcounter_cultureを呼ぶ前にacts_as_paranoidを呼ぶ必要があります。

class SoftDelete < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :company
  counter_culture :company
end
ポリモーフィック関連付け
counter_culture gemは、1階層レベルの限定的なポリモーフィック関連付けをサポートするようになりました。

Railsアプリ向けの、ターボの効いたカウンタキャッシュです。Rails標準のカウンタキャッシュと比べて多くの点が改善されています。

カウンタキャッシュの更新を、値の作成や破棄のほか、値の変更時にも行える
「多階層カウンタキャッシュ」をサポート（訳注: リレーション階層が離れていてもカウンタキャッシュの更新を直接指定できる）
動的なカラム名をサポート: オブジェクトの種類ごとにカウンタキャッシュを分離
カウントの他に合計も出せる
Ruby 2.2.5と2.3.1、およびRailsの最新パッチリリースである3.2、4.0、4.1、4.2、5.0、5.1でテストされています。

---

[Rails向け高機能カウンタキャッシュ gem ‘counter_culture’]: https://techracho.bpsinc.jp/hachi8833/2017_08_03/43698

[counter_cultureで合計値をキャッシュする
]: https://qiita.com/chorori/items/2050f026555156d64b3a

[counter_culture]: https://github.com/magnusvk/counter_culture
