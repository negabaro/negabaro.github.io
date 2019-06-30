```ruby
  ↳ /shared/vendor/bundle/ruby/2.5.0/gems/activerecord-5.2.1/lib/active_record/log_subscriber.rb:98
  User Exists (116.2ms)  SELECT  1 AS one FROM `users` WHERE `users`.`email` = BINARY 'hoshi-papa@naver.com' AND `users`.`provider` = 'email' LIMIT 1
  ↳ /shared/vendor/bundle/ruby/2.5.0/gems/activerecord-5.2.1/lib/active_record/log_subscriber.rb:98
  User Create (17.0ms)  INSERT INTO `users` (`uid`, `encrypted_password`, `name`, `email`, `tokens`, `created_at`, `updated_at`) VALUES ('hoshi-papa@naver.com', '$2a$11$nS.BKmtIHDz51TP.Z4XiO.zVTOFGyXJz8g8hBNH5OM18vUKZOp8yS', 'hoshi-papa', 'hoshi-papa@naver.com', '{}', '2019-04-11 22:11:25', '2019-04-11 22:11:25')
  ↳ /shared/vendor/bundle/ruby/2.5.0/gems/activerecord-5.2.1/lib/active_record/log_subscriber.rb:98
   (35.8ms)  COMMIT
  ↳ /shared/vendor/bundle/ruby/2.5.0/gems/activerecord-5.2.1/lib/active_record/log_subscriber.rb:98

From: /app/app/models/user.rb @ line 8 User#create_default_album:

    6: def create_default_album
    7:   #Album.create
 => 8:   binding.pry
    9: end

```
