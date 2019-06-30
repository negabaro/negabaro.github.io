■ その 3：child!

最後が child!メソッドです。ブロックを引数に取り、現在の要素内に配列の子要素を追加します。

```ruby
json.users do
  json.child! do
    json.name 'yamada'
    json.email 'yamada@example.com'
  end

  json.child! do
    json.name 'yamada2'
    json.email 'yamada2@example.com'
  end
end
```

## 結果：

```ruby
users: [
  {
    name: "yamada",
    email: "yamada@example.com"
  },
  {
    name: "yamada2",
    email: "yamada2@example.com"
  }
]
```

しかしながら実際には Jbuilder テンプレートの中で配列を構築しなければいけないパターンはあまりなさそうで、このメソッドの有用な使い方はよく分かりませんでした。

ひょっとすると既存の配列の最初や最後に、そのテンプレート特有の要素を追加する場合等に利用できるかもしれません。

```ruby
json.array!(@items) do |item|
json.extract! item, :name, :number
end

json.child! do
json.name 'DUMMY'
json.number 9999
end
```

## 結果：

```ruby
[
{
name: "yamada1",
number: 1
},
{
name: "yamada2",
number: 2
},
{
name: "DUMMY",
number: 9999
}
]
```

以上です。

http://tech.gmo-media.jp/post/90700224919/rails-jbuilder-merge-ignore-nil-child
