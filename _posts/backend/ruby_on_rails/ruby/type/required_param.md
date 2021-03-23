キーワード引数で必須項目
ruby2.1以降ではキーワード引数の特定の属性を必須化できます.
ラベルの後にデフォルト値を書かなければ必須項目となります.

def required_keyword_args(first_name:, last_name:, age: nil)
  "#{first_name}, #{last_name} (#{age.to_s})"
end

p required_keyword_args()
  # ArgumentError
p required_keyword_args(first_name: "Isaac")
  # ArgumentError
p required_keyword_args(first_name: "Isaac", last_name: "Newton")
  # "Isaac, Newton ()"
p required_keyword_args(first_name: "Isaac", last_name: "Newton", age: 30)
  # "Isaac, Newton (30)"