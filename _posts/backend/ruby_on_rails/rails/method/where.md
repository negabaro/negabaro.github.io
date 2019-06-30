User.where(id: [1, 5, 7])
上記コードは以下の SQL を発行する。

SELECT \* FROM users WHERE users.id IN (1, 5, 7)

https://qiita.com/Narikazu3/items/34901bef5cf59df1a995

```
items = [
  @invitation_user1.id,
  @invitation_user2.id,
  @user1.id,
  @user2.id,
  @profile1.id,
  @profile2.id
]
```

```
@activities = Version.where("item_id IN (?)", items)
# or equivalently:
@activities = Version.where(:item_id => items)
```

https://stackoverflow.com/questions/9867744/how-to-pass-data-to-in-query-in-rails-3

Use array instead of string.

For example

```
ids = [ @invitation_user1.id, @invitation_user2.id, @user1.id, @user2.id ]
```

Then easily you can find the records by

```
@versions = Version.find_all_by_id(ids)
```

This will result the query you expected.

```
SELECT "versions".* FROM "versions" WHERE (item_id IN (19,20,4,1))
```
