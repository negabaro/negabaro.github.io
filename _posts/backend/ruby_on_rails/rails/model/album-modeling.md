---
layout: post
title: "xx"
author: negabaro kim
categories: xx
tags: xx
---

```ruby
rails g model Album  title:string user_id:integer item_id:integer
```

```ruby
rails g model AlbumItem album_id:integer item_id:integer
```

app/models/albums.rb

app/models/user.rb

has_many :albums

# xx insert

```ruby
Album.create(title: 'test', user_id: 1)
   (0.4ms)  BEGIN
  User Load (0.8ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1
  Album Create (31.6ms)  INSERT INTO `albums` (`title`, `user_id`, `created_at`, `updated_at`) VALUES ('test', 1, '2019-04-11 12:06:09', '2019-04-11 12:06:09')
   (26.3ms)  COMMIT

```

# xx insert2

```ruby
AlbumList.create(album_id: 1, item_id: 1)
   (18.5ms)  SET NAMES utf8mb4,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
   (0.4ms)  BEGIN
  Album Load (0.8ms)  SELECT  `albums`.* FROM `albums` WHERE `albums`.`id` = 1 LIMIT 1
  AlbumList Create (7.1ms)  INSERT INTO `album_lists` (`album_id`, `item_id`, `created_at`, `updated_at`) VALUES (1, 1, '2019-04-11 12:35:53', '2019-04-11 12:35:53')
   (39.7ms)  COMMIT
=> #<AlbumList id: 1, album_id: 1, item_id: 1, created_at: "2019-04-11 12:35:53", updated_at: "2019-04-11 12:35:53">
```

```ruby
 AlbumList.create(album_id: 1, item_id: 2)
   (0.6ms)  BEGIN
  Album Load (0.7ms)  SELECT  `albums`.* FROM `albums` WHERE `albums`.`id` = 1 LIMIT 1
  Item Load (0.6ms)  SELECT  `items`.* FROM `items` WHERE `items`.`id` = 2 LIMIT 1
  AlbumList Create (1.6ms)  INSERT INTO `album_lists` (`album_id`, `item_id`, `created_at`, `updated_at`) VALUES (1, 2, '2019-04-11 12:47:41', '2019-04-11 12:47:41')
   (73.7ms)  COMMIT

```

```ruby
rails g model AlbumList album_id:integer item_id:integer
```

```ruby
irb(main):003:0> Album.all.first.user
  Album Load (1.4ms)  SELECT  `albums`.* FROM `albums` ORDER BY `albums`.`id` ASC LIMIT 1
Traceback (most recent call last):
        1: from (irb):3
NoMethodError (undefined method `user' for nil:NilClass)
```

```ruby
Album.create(title: 'test', user_id: 1)
   (0.4ms)  BEGIN
  User Load (0.8ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1
  Album Create (31.6ms)  INSERT INTO `albums` (`title`, `user_id`, `created_at`, `updated_at`) VALUES ('test', 1, '2019-04-11 12:06:09', '2019-04-11 12:06:09')
   (26.3ms)  COMMIT
=> #<Album id: 1, title: "test", user_id: 1, created_at: "2019-04-11 12:06:09", updated_at: "2019-04-11 12:06:09">
```

```ruby
Album.all.first.user
  Album Load (1.4ms)  SELECT  `albums`.* FROM `albums` ORDER BY `albums`.`id` ASC LIMIT 1
  User Load (1.5ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1
=> #<User id: 1, provider: "email", uid: "kaka@naver.com", allow_password_change: false, name: "pepe", nickname: "negabaro22", image: "", email: "kaka@naver.com", created_at: "2018-12-11 10:21:34", updated_at: "2019-03-25 15:07:47", image_data: "{\"id\":\"user/1/image/ac98fc11084c39386b45ac72588801...">

```

```ruby
 User.all.first.albums
  User Load (1.0ms)  SELECT  `users`.* FROM `users` ORDER BY `users`.`id` ASC LIMIT 1
  Album Load (0.7ms)  SELECT  `albums`.* FROM `albums` WHERE `albums`.`user_id` = 1 LIMIT 11
=> #<ActiveRecord::Associations::CollectionProxy [#<Album id: 1, title: "test", user_id: 1, created_at: "2019-04-11 12:06:09", updated_at: "2019-04-11 12:06:09">]>
```

```ruby
rails g model AlbumListItems album_list_id:integer item_id:integer
Running via Spring preloader in process 1126
[WARNING] The model name 'AlbumListItems' was recognized as a plural, using the singular 'AlbumListItem' instead. Override with --force-plural or setup custom inflection rules for this noun before running the generator.
      invoke  active_record
      create    db/migrate/20190411125337_create_album_list_items.rb
      create    /models/album_list_item.rb
      invoke    test_unit
      create      test/models/album_list_item_test.rb
      create      test/fixtures/album_list_items.yml
```

```ruby
AlbumListItem.create(album_list_id: 1, item_id: 1)
   (0.8ms)  BEGIN
  AlbumList Load (1.0ms)  SELECT  `album_lists`.* FROM `album_lists` WHERE `album_lists`.`id` = 1 LIMIT 1
  Item Load (0.6ms)  SELECT  `items`.* FROM `items` WHERE `items`.`id` = 1 LIMIT 1
  AlbumListItem Create (1.3ms)  INSERT INTO `album_list_items` (`album_list_id`, `item_id`, `created_at`, `updated_at`) VALUES (1, 1, '2019-04-11 21:31:10', '2019-04-11 21:31:10')
   (25.5ms)  COMMIT
=> #<AlbumListItem id: 1, album_list_id: 1, item_id: 1, created_at: "2019-04-11 21:31:10", updated_at: "2019-04-11 21:31:10">
irb(main):096:0>

```

```ruby
 AlbumItem.create(item_id: 1, album_id:1)
   (0.4ms)  BEGIN
  Album Load (0.7ms)  SELECT  `albums`.* FROM `albums` WHERE `albums`.`id` = 1 LIMIT 1
  Item Load (0.7ms)  SELECT  `items`.* FROM `items` WHERE `items`.`id` = 1 LIMIT 1
  AlbumItem Create (0.7ms)  INSERT INTO `album_items` (`album_id`, `item_id`, `created_at`, `updated_at`) VALUES (1, 1, '2019-04-11 21:45:58', '2019-04-11 21:45:58')
   (29.2ms)  COMMIT
=> #<AlbumItem id: 1, album_id: 1, item_id: 1, created_at: "2019-04-11 21:45:58", updated_at: "2019-04-11 21:45:58">
```

```ruby
User.all.first.albums.first.items
  User Load (1.5ms)  SELECT  `users`.* FROM `users` ORDER BY `users`.`id` ASC LIMIT 1
  Album Load (1.2ms)  SELECT  `albums`.* FROM `albums` WHERE `albums`.`user_id` = 1 ORDER BY `albums`.`id` ASC LIMIT 1
  Item Load (1.4ms)  SELECT  `items`.* FROM `items` INNER JOIN `album_items` ON `items`.`id` = `album_items`.`item_id` WHERE `album_items`.`album_id` = 1 LIMIT 11
=> #<ActiveRecord::Associations::CollectionProxy [#<Item id: 1, title: "testest", video_id: "m5Wc87i4S_Y", start_time: "14:10", end_time: "14:16", description: "She is kind of person who is always very clear abo...", auto_play_cnt: 100, created_at: "2018-11-27 09:52:40", updated_at: "2019-03-19 17:45:07", category_id: nil, user_id: 1>, #<Item id: 2, title: "~나 다름없어 | 하고 다니는거 보면 결혼한 사이나 다름없어 - 자연스러운 생활 영어표현 ...", video_id: "kqWJb9GbcLc", start_time: "7:58", end_time: "8:03", description: "When you see how they are together, they're practi...", auto_play_cnt: 100, created_at: "2018-11-30 00:05:56", updated_at: "2019-03-19 17:45:07", category_id: nil, user_id: 1>]>
```
