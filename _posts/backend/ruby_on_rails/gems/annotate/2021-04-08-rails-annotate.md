---
layout: post
title:  "rails annotate gem 사용방법"
tags:	rails/gem/cancancan
---

## annotate란


각 모델의 스키마 정보를 자동으로 파일에 커맨트로 남겨주는 Gem이다.

해당 db에 귀속된 파일에서 작업시 db스키마 정보를 알고 싶을때 db/schma.rb에 이동해서 확인하는 작업이 절약되서 유용한 gem이라고 생각

그 외에도 config/routes.rb의 설정을 커맨트로 남겨주는 기능도 있어서 일일이 `rails routes`를 실행해서 확인하는 작업도 없앨 수 있다.

더 자세한 내용은 [annotate]을 참고



## 설치방법

### bundle install

```ruby
gem 'annotate'
bundle install
```

### annotate:install

```ruby
bundle exec rails g annotate:install
```

### 설정파일 

`annotate:install`를 실행하면 `lib/tasks/auto_annotate_models.rake`에 설정파일이 생기는 여기서 여러가지 커스텀설정이 가능하다.


#### 동작확인

여기까지 하면 기본설정은 끝이다. 아래 커맨드로 동작확인을 해보자

```ruby
$ rails g model User name:string email:string age:integer
$ rails db:migrate
```

이런식으로 migrate를 실행해주면 `Annotated (3): app/models/user.rb, ...`이라는 메시지가 표시되며 자동으로 파일 선두행에 스키마 정보를 입력해준다.

추가되었을때/변경되었을때도 정상적으로 입력해줌.

```ruby
app/models/user.rb
# == Schema Information 
#
# Table name: users
#
#  id         :integer          not null, primary key
#  age        :integer
#  email      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
end
```

## 수동실행

수동으로 annotate를 실행해주는것도 가능하다.

```
$ bundle exec annotate
$ bundle exec annotate --exclude fixtures # fixtures빼고 다 실행
$ bundle exec annotate --exclude tests,fixtures,factories,serializers# model파일만 생성 
```

## 커맨트 수동으로 삭제하는 방법

```
$ bundle exec annotate --delete
$ bundle exec annotate --routes --delete # ルーティング情報(後述)を削除する
```

## 제일 밑에 커맨트를 입력하게 하는 방법

아래 설정은 before부분을 after로 변경하면 파일 하단에 커맨트를 입력해준다.

```ruby
lib/tasks/auto_annotate_models.rake
# 'position_in_class' => 'before'
```


## 루팅설정 커맨트해주는 방법

```ruby
$ bundle exec annotate --routes
```

결과

```ruby
#config/routes.rb
# == Route Map
#
#                    Prefix Verb URI Pattern                                                                              Controller#Action
#        rails_service_blob GET  /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET  /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET  /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT  /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```


## annotate --help 결과

그 외 옵션은 --help를 참고

```
annotate --help
Usage: annotate [options] [model_file]*
        --additional-file-patterns path1,path2,path3
                                     Additional file paths or globs to annotate, separated by commas (e.g. `/foo/bar/%model_name%/*.rb,/baz/%model_name%.rb`)
    -d, --delete                     Remove annotations from all model files or the routes.rb file
    -p [before|top|after|bottom],    Place the annotations at the top (before) or the bottom (after) of the model/test/fixture/factory/route/serializer file(s)
        --position
        --pc, --position-in-class [before|top|after|bottom]
                                     Place the annotations at the top (before) or the bottom (after) of the model file
        --pf, --position-in-factory [before|top|after|bottom]
                                     Place the annotations at the top (before) or the bottom (after) of any factory files
        --px, --position-in-fixture [before|top|after|bottom]
                                     Place the annotations at the top (before) or the bottom (after) of any fixture files
        --pt, --position-in-test [before|top|after|bottom]
                                     Place the annotations at the top (before) or the bottom (after) of any test files
        --pr, --position-in-routes [before|top|after|bottom]
                                     Place the annotations at the top (before) or the bottom (after) of the routes.rb file
        --ps, --position-in-serializer [before|top|after|bottom]
                                     Place the annotations at the top (before) or the bottom (after) of the serializer files
        --w, --wrapper STR           Wrap annotation with the text passed as parameter.
                                     If --w option is used, the same text will be used as opening and closing
        --wo, --wrapper-open STR     Annotation wrapper opening.
        --wc, --wrapper-close STR    Annotation wrapper closing
    -r, --routes                     Annotate routes.rb with the output of 'rake routes'
        --models                     Annotate ActiveRecord models
    -a, --active-admin               Annotate active_admin models
    -v, --version                    Show the current version of this gem
    -m, --show-migration             Include the migration version number in the annotation
    -k, --show-foreign-keys          List the table's foreign key constraints in the annotation
        --ck, --complete-foreign-keys
                                     Complete foreign key names in the annotation
    -i, --show-indexes               List the table's database indexes in the annotation
    -s, --simple-indexes             Concat the column's related indexes in the annotation
        --model-dir dir              Annotate model files stored in dir rather than app/models, separate multiple dirs with commas
        --root-dir dir               Annotate files stored within root dir projects, separate multiple dirs with commas
        --ignore-model-subdirects    Ignore subdirectories of the models directory
        --sort                       Sort columns alphabetically, rather than in creation order
        --classified-sort            Sort columns alphabetically, but first goes id, then the rest columns, then the timestamp columns and then the association columns
    -R, --require path               Additional file to require before loading models, may be used multiple times
    -e [tests,fixtures,factories,serializers],
        --exclude                    Do not annotate fixtures, test files, factories, and/or serializers
    -f [bare|rdoc|yard|markdown],    Render Schema Infomation as plain/RDoc/Yard/Markdown
        --format
        --force                      Force new annotations even if there are no changes.
        --frozen                     Do not allow to change annotations. Exits non-zero if there are going to be changes to files.
        --timestamp                  Include timestamp in (routes) annotation
        --trace                      If unable to annotate a file, print the full stack trace, not just the exception message.
    -I, --ignore-columns REGEX       don't annotate columns that match a given REGEX (i.e., `annotate -I '^(id|updated_at|created_at)'`
        --ignore-routes REGEX        don't annotate routes that match a given REGEX (i.e., `annotate -I '(mobile|resque|pghero)'`
        --hide-limit-column-types VALUES
                                     don't show limit for given column types, separated by commas (i.e., `integer,boolean,text`)
        --hide-default-column-types VALUES
                                     don't show default for given column types, separated by commas (i.e., `json,jsonb,hstore`)
        --ignore-unknown-models      don't display warnings for bad model files
        --with-comment               include database comments in model annotations
```

---

[annotate]: https://github.com/ctran/annotate_models

[【Rails】annotateの使い方]: https://qiita.com/kou_pg_0131/items/ae6b5f41c18b2872d527