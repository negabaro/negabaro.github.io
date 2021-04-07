

update()はattributesを引数に取れるのでsave()でも出来るよなーと思ってRails Consoleで確認したら出来るときと出来ないときがあったので確認した。

まずはupdateの実装がどうなっているかを公式ドキュメントのupdateで確認。

update()は以下の実装になっている。

```ruby
# File activerecord/lib/active_record/persistence.rb, line 423
def update(attributes)
  # The following transaction covers any possible database side-effects of the
  # attributes assignment. For example, setting the IDs of a child collection.
  with_transaction_returning_status do
    assign_attributes(attributes)
    save
  end
end
```
内部的には assign_attributes してからsaveしているだけ。