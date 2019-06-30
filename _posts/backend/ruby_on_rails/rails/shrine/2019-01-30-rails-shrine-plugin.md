---
layout: post
title: "Shrine에서 사용하는 플러그인을 알아보자"
author: negabaro kim
categories: rails
tags: rails gem
---

# 이전 포스트

#### [Rails5.2 Shrine을 이용한 로컬 파일 업로드]({% post_url 2019-01-30-rails-shrine-local %})

#### [Rails5.2 Shrine을 이용한 S3 파일 업로드]({% post_url 2019-01-30-rails-shrine-s3 %})

이전 포스트에 이어서 Shrine의 플러그인에 대해 알아보자.

### plugin :store_dimensions

extract image dimensions only for this uploader and its descendants
업로드한 파일의 가로,세로 길이를 보존하게 해준다.

plugin적용전과 후의 디비 업데이트문의 차이를 보자.

#### before

```
 UPDATE `users` SET `image_data` = '{\"id\":\"24aa732e5eaccc160e142391ee16c128.jpg\",\"storage\":\"store\",\"metadata\":{\"filename\":\"twice-dahyun-3.jpg\",\"size\":39332,\"mime_type\":\"image/jpeg\"}}', `updated_at` = '2019-01-30 20:57:44' WHERE `users`.`id` = 13
```

#### after

```
UPDATE `users` SET `image_data` = '{\"id\":\"4fcfc9acc407f06f265dfffece1bb918.jpeg\",\"storage\":\"cache\",\"metadata\":{\"filename\":\"cheng.jpeg\",\"size\":150411,\"mime_type\":\"image/jpeg\",\"width\":560,\"height\":826}}', `updated_at` = '2019-01-30 21:16:48' WHERE `users`.`id` = 13
```

디비에 데이터를 보존할때 `"width":560 "height":826`가 추가된걸 확인할 수 있다.

### plugin :determine_mime_type

request header에 MIME-TYPE설정을 해주는 플러그인 위 설정을 안해주고 파일 업로드시

```
The "mime_type" Shrine metadata field will be set from the "Content-Type" request header, which might not hold the actual MIME type of the file. It is recommended to load the determine_mime_type plugin which determines MIME type from file content.
```

이러한 경고성 에러가 나왔다. 일단 설정해주는게 무난할듯

### plugin :validation_helpers

업로드한 파일의 확장자를 제한한다든가 파일 사이즈를 제한할때 사용한다.
위 플러그인을 추가후

```
Attacher.validate do
  validate_max_size 15.megabytes, message: 'is too large (max is 15 MB)'
  validate_mime_type_inclusion ['image/jpeg', 'image/png', 'image/gif']
end
```

이렇게 설정하면
15MB이상의 이미지나 jpeg,png,gif등의 이미지파일 외에 업로드시 에러가 발생한다.

### plugin :pretty_location

#### before

```
 UPDATE `users` SET `image_data` = '{\"id\":\"24aa732e5eaccc160e142391ee16c128.jpg\",\"storage\":\"store\",\"metadata\":{\"filename\":\"twice-dahyun-3.jpg\",\"size\":39332,\"mime_type\":\"image/jpeg\"}}', `updated_at` = '2019-01-30 20:57:44' WHERE `users`.`id` = 13
```

#### after

```
UPDATE `users` SET `image_data` = '{\"id\":\"user/13/image/6e7e8e4a91c777e575f853414fee8ab0.jpg\",\"storage\":\"store\",\"metadata\":{\"filename\":\"2017mostbeautiful_twice_sana_07.jpg\",\"size\":77596,\"mime_type\":\"image/jpeg\",\"width\":600,\"height\":480}}' WHERE `users`.`id` = 13
```

The pretty_location plugin attempts to generate a nicer folder structure for uploaded files.

https://shrinerb.com/rdoc/classes/Shrine/Plugins/PrettyLocation.html

generate_location메소드를 이용해서 파일prefix를 바꿔주지 않고 pretty_location플러그인을 추가하는것만으로

```
user/13/image/6e7e8e4a91c777e575f853414fee8ab0.jpg
```

이하와 같은 패스에 데이터를 보관하는걸 알 수 있다.

prefix를 만드는 기준은 이하와 같다

```
:model/:id/:attachment/:version-:uid.:extension
```

쓸데가 있을지 모르겠지만 namespace을 이용해서 구분자를 바꿔줄 수 있는 듯하다.

#### use namespace "\_"

```
plugin :pretty_location, namespace: "_"
# "blog_user/.../493g82jf23.jpg"
```

#### use namespace "/"

```
plugin :pretty_location, namespace: "/"
# "blog/user/.../493g82jf23.jpg"
```

### plugin :processing

Allows you to define processing performed for a specific action.

https://shrinerb.com/rdoc/classes/Shrine/Plugins/Processing.html

업로드한 파일을 가공할때 유용한 플러그인

```
  process(:store) do |io, context|
    #binding.pry
  end
```

이런식으로 선언하면 파일 업로드시 이 메소드를 거치게 되고 여기서 ImageMagick등을 이용해 썸네일 이미지를 만들던지 동영상의 트렌스코더를 실행한다.
이 부분은 다른 포스트에서 다 소개할 예정

### plugin :delete_promoted

The delete_promoted plugin deletes files that have been promoted, after the record is saved. This means that cached files handled by the attacher will automatically get deleted once they're uploaded to store. This also applies to any other uploaded file passed to Attacher#promote.

https://shrinerb.com/rdoc/classes/Shrine/Plugins/DeletePromoted.html

파일 업로드시 store,cache디렉토리가 있는데 위 플러그인을 넣으면 cache디렉토리 없이 store 디렉토리 에서만 관리된다.

### plugin :cached_attachment_data

The cached_attachment_data plugin adds the ability to retain the cached file across form redisplays, which means the file doesn't have to be reuploaded in case of validation errors.

https://shrinerb.com/rdoc/classes/Shrine/Plugins/CachedAttachmentData.html

The plugin adds #cached\_<attachment>\_data to the model, which returns the cached file as JSON, and should be used to set the value of the hidden form field.

이하와 같이 cached파일의 정보에 접근이 가능해짐

```
@user.cached_avatar_data #=> '{"id":"38k25.jpg","storage":"cache","metadata":{...}}'
```

This method delegates to Attacher#read_cached:

```
attacher.read_cached #=> '{"id":"38k25.jpg","storage":"cache","metadata":{...}}'
```

### plugin :recache

https://shrinerb.com/rdoc/classes/Shrine/Plugins/Recache.html

```
process(:recache) do |io, context|
  #perform cheap processing
  #binding.pry
end
```

위 메소드를 추가해주면 validations체크가 끝난후의 타이밍을 접근가능
process(:store)보다 실행 타이밍이 빠름

"plugin :processing"과 같이 파일 가공시 사용가능할 듯

### plugin :remove_attachment

https://shrinerb.com/rdoc/classes/Shrine/Plugins/RemoveAttachment.html

여기 링크에 자세히 나온다.
위 플러그인을 추가한후 뷰에서

```
form.check_box :remove_avatar
```

이런식으로 기존 이미지를 삭제하는 checkbox를 추가할 수 있는듯.
Rails를 API만으로 사용하면 이 플러그인을 불필요

### plugin :versions

The versions plugin enables your uploader to deal with versions, by allowing you to return a Hash of files when processing.

https://shrinerb.com/rdoc/classes/Shrine/Plugins/Versions.html

음..파일의 버저닝을 할 수 있는거 같은데 쓰는법은 잘모르겠음

※추가 정보
이 플러그인이 없으면 파일 업로드시 Shrine::InvalidFile invalid IO object 에러가 발생함.
이유는 이하와 같음.

You most likely forgot to load the versions plugin in your uploader. Shrine by default doesn't know how to handle a hash of files, the versions plugin needs to be loaded for that.

https://github.com/shrinerb/shrine/issues/224

디폴트로는 hash파일 컨트롤이 안된다니 기본적으로 추가해줘야할 플러그인 인듯.

### plugin :delete_raw

The delete_raw plugin will automatically delete raw files that have been uploaded. This is especially useful when doing processing, to ensure that temporary files have been deleted after upload.

https://shrinerb.com/rdoc/classes/Shrine/Plugins/DeleteRaw.html

업로드한후 파일 삭제하는거 같은데 테스트 환경에서는 재현되지 않았음.

### Reference Link:

```
https://github.com/shrinerb/shrine
```
