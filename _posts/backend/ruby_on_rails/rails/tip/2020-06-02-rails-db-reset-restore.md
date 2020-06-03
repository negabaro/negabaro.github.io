---
layout: post
title:  "rails6.0 mysql db백업후 restore하는법"
author: negabaro kim
categories: rails
tags:	rails tip
---


# 기본컨셉

mysqldump커맨드로 덤프후 
db:migrate:reset실행
mysql커맨드로 덤프한 커맨드를 리스토어


# 코드


```ruby
# lib/tasks/db.rake
namespace :db do
  desc 'Dump the database to tmp/dbname.dump'
  task dump: %i[environment load_config] do
    config = ActiveRecord::Base.configurations[Rails.env]
    ignore_table_option = %w[ar_internal_metadata schema_migrations].map { |table| "--ignore-table=#{config['database']}.#{table}" }.join(' ')
    sh "mysqldump --single-transaction -h #{config['host']} -u #{config['username']} -p#{config['password']} #{config['database']} --no-create-info #{ignore_table_option} > tmp/#{config['database']}.dump"
  end

  desc 'Restore the database from tmp/dbname.dump'
  task restore: %i[environment load_config] do
    config = ActiveRecord::Base.configurations[Rails.env]
    sh "mysql -h #{config['host']} -u #{config['username']} -p#{config['password']} #{config['database']} < tmp/#{config['database']}.dump"
  end

  desc 'Dump and reset and restore'
  task dump_reset_restore: %i[environment load_config] do
    Rake::Task['db:dump'].invoke
    Rake::Task['db:migrate:reset'].invoke
    Rake::Task['db:restore'].invoke
  end
end
```


# 실행

```ruby
rails db:dump_reset_restore
```

### ignore_table_option


백업에 제외할 테이블이 있으면 `ignore_table_option`에 추가해줘서 실행
