---
layout: post
title: "Rails5.2 Shrine을 이용한 로컬 파일 업로드"
author: negabaro kim
categories: rails
tags: rails gem
---

Rails Shrine을 이용해서 로컬환경에 파일업로드를 해봅시다.

### Gemfile

```
gem "shrine"
```

bundle install

### initializers파일 추가

app/config/initializers/shrine.rb
에 이하 파일을 추가

```
require "shrine"
require "shrine/storage/file_system"

# Upload Directory
Shrine.storages = {
cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"),
store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"),
}

# Plugin
Shrine.plugin :activerecord
```

### 디비 컬럼 추가

image_data 컬럼 추가

User테이블에 이미지 정보를 넣는 컬럼 추가

여기서 중요한것은 image라는 컬럼을 추가하기 위해서는
컬럼명 뒤에 「\_data」를 무조건 붙여야 합니다.

그러므로 「image_data」컬럼을 추가합니다.

```
rails g migration add_image_data_to_users image_data:text
rails db:migrate
```

### 모델에 Shrine

app/uploaders/user_image_uploader.rb

```
class UserImageUploader < Shrine
end
```

app/models/User.rb

```
class User < ApplicationRecord
  include UserImageUploader[:image]
end
```

### 스트롱 파라메터

이하와 같이 컨트롤러에 스트롱 파라메터 설정을 추가

이때 중요한것은 image_data가 아닌 image를 추가할것.

```
def user_params
params.require(:user).permit(:content, :image)
end
```

### View작성

scaffold로 작성한view에 image컬럼을 추가해봅시다.
컨트롤러에서와 마찬가지로 image_data 가 아니고 image라고 설정할것.

```

<%= form_with(model: user, local: true) do |form| %>
<% if user.errors.any? %>

<div id="error_explanation">
<h2><%= pluralize(user.errors.count, "error") %> prohibited this user from being saved:</h2>

      <ul>
      <% user.errors.full_messages.each do |message| %>
        <li><%= message %></li>
      <% end %>
      </ul>
    </div>

<% end %>

  <div class="field">
    <%= form.label :content %>
    <%= form.text_area :content, id: :note_content %>
  </div>

<!-- 추가한 부분  -->
  <div class="field">
    <%= form.label :image %>
    <%= form.file_field :image %>
  </div>
<!-- 추가한 부분 끝 -->

  <div class="actions">
    <%= form.submit %>
  </div>
<% end %>
```

```
<%= form.file_field :image %>
```

이 부분이 포인트

### 결과

`app/config/initializers/shrine.rb`에

`cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"),`

이라는 설정을 추가했었으므로

업로드한 파일이 Rails루트의 `public/uploads/store/`에 파일이 추가되었다면
정상적으로 작동했다는걸 알 수 있습니다.

### 헤맨 부분

업로드할 s3 bucket에 이하와 같은 bucket policy설정이 필요했다.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::bucket-name/*"
        }
    ]
}
```

Reference Link:

```
https://github.com/shrinerb/shrine
http://programming-beginner-memo.com/?p=664
https://codyeatworld.com/2017/04/18/rails-uploading-images-confidently-with-shrine-rb/
```
