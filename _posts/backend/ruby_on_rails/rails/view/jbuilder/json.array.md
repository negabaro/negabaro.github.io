# xx

```ruby
json.array! @tweets do |tweet|
  json.title tweet.title
  json.text  tweet.text
end

# [{"title": "タイトル1", "text": "テキスト1"}, {"title": "タイトル2", "text": "テキスト2"}]
```

特定のキーでまとめて、配列を回したい場合は以下のように記述します。

# xx

```ruby
index.json.jbuilder
json.tweet do
  json.array! @tweets, :title, :text
end

# {"tweet": [{"title": "タイトル1", "text": "テキスト1" }, {"title": "タイトル2",  "text": "テキスト2"}] }
```

https://qiita.com/ryouzi/items/06cb0d4aa7b6527b3645
