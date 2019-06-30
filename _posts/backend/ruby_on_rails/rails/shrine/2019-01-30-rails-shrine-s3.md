---
layout: post
title: "Rails5.2 Shrine을 이용한 S3 파일 업로드"
author: negabaro kim
categories: rails
tags: rails gem
---

[이전 포스트]({% post_url 2019-01-30-rails-shrine-local %})에서 Rails Shirne을 이용해
로컬 환경에 파일 업로드 하는 방법을 알아봤습니다.

이번 포스트에서는 이전 포스트에 이어서 Shrine을 이용해서 aws S3에 파일을 업로드하는 방법을 알아봅시다.

### Gemfile파일 추가 bundle install

```
#Upload images to Amazon S3
gem 'aws-sdk'
```

### aws에 접근하기 위한 억세스키 설정

현재 테스트중인 환경이 rails5.2이므로 credentials.yml.enc
에다가 AWS억세스키와 시크릿키를 추가해주었습니다.

```
EDITOR="vim" bin/rails credentials:edit

aws:
    access_key_id: xx
    secret_access_key: xx
```

### initializers파일 수정

config/initializers/shrine.rb
딱 S3에 접근하기위한 미니멀 설정은 이하와 같습니다.

```
require "shrine"
require 'shrine/storage/s3'

s3_options = {
  region: "ap-northeast-1",
  bucket: "bucket-name",
  access_key_id: Rails.application.credentials.dig(:aws, :access_key_id),
  secret_access_key: Rails.application.credentials.dig(:aws, :secret_access_key)
}

# URL options for CloudFront CDN
url_options = {
  public: true,
  host: 'xxxx'
}


# The S3 storage plugin handles uploads to Amazon S3 service, using the aws-sdk gem.
Shrine.storages = {
  # With Shrine both temporary (:cache) and permanent (:store) storage are first-class citizens and fully configurable, so you can also have files cached on S3.
  cache: Shrine::Storage::S3.new(prefix: 'cache', upload_options: { acl: 'public-read' }, **s3_options),
  store: Shrine::Storage::S3.new(prefix: 'store', upload_options: { acl: 'public-read' }, **s3_options)
}


# Plugin
Shrine.plugin :activerecord
```

### 동작확인

![image](https://user-images.githubusercontent.com/4640346/52006379-50b09e00-250f-11e9-991a-8d8489ec45df.png)

뷰에서 위와같은 파일을 업로드후

AWS S3의 이하 패스에 정상적으로 파일이 등록되는걸 확인했습니다.

```
Amazon S3/s3-bucket-name/cache/user/user/1/image
```

Reference Link:

```
https://github.com/shrinerb/shrine
http://programming-beginner-memo.com/?p=664
https://codyeatworld.com/2017/04/18/rails-uploading-images-confidently-with-shrine-rb/
```
