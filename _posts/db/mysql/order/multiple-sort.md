複数のカラムでソートする場合は、複数カラムでソートしたインデックスを作成する必要があります。Railsマイグレーションでは以下のような感じで記述します。
add_index(:faults, [:priority, :created_at], order: {priority: :asc, created_at: :desc)

https://techracho.bpsinc.jp/hachi8833/2018_01_11/50793