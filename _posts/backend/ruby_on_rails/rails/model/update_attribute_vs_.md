update_attribute vs save vs create vs assign_attributes vs update_attribute

# update_attribute

# save

# create

# update

## 複数のカラムを更新する（update メソッド）

```
user.update( name: "やっぱり鈴木", email: "suzuki@test.co.jp" )
# 更新成功時 => true、更新失敗時 => false
```

## カラムに直接代入して更新する

```
user.name = "やっぱり鈴木"
user.save
```

## １つのカラムを更新する（update_attribute メソッド）

update_attribute メソッドは、バリデーションは行われないので注意してください。

```
user.update_attribute(:name, "やっぱり鈴木")
```

https://ruby-rails.hatenadiary.com/entry/20140724/1406142120#ar-update

# assign_attributes

# 複数のレコードを更新する - update(id, attributes)メソッド

指定した id かその配列に該当するレコードを、指定した属性のセット(ハッシュ)で更新する。
バリデーションは行われないので注意してください。

```
# idが1のレコードのsaleをtrueにdiscount_rateを0.2に更新する
# idが2のレコードのnameをproduct2に更新する
product = { 1 => { sale: true, discount_rate: 0.2 }, 2 => { name: 'product2' } }
Product.update(product.keys, product.values)
```

# update_all(updates)メソッド

SQL の update 文の set 句と where 句を指定して、更新する。
バリデーションは行われないので注意してください。

```
Product.update_all("price = 1.1*price", "title like '%水着'")
```

# reload メソッド

更新したカラムを DB と同じにする。
使用する箇所としては、ユニットテストぐらいしかほぼない。

```
user.email #=> tanaka@test.co.jp
user.update_attribute( {email: "Validatioエラーするemail"} ) # => false
user.email # =>  DBは更新されていないが、値は "Validatioエラーするemail"になってる
user.reload.email
user.email #=> tanaka@test.co.jp
```

### Reference Link:

https://ruby-rails.hatenadiary.com/entry/20140724/1406142120#ar-update
