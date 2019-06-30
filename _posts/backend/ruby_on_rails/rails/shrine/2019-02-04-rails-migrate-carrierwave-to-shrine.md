---
layout: post
title: "Rails5.2 carrieerwave에서Shrine으로 마이그레이트 하는 방법"
author: negabaro kim
categories: rails
tags: rails gem
---

carrierWave를 사용한 기존 프로젝트에서 shrine으로 이동하기 위해서
데이터를 마이그레이트할 필요가 있다.

다행히 [공식페이지]에서 자세히 설명해주고 있다.

### 1. CarrierwaveShrineSynchronization모듈 작성

이하와 같은 파일을 추가해준다.

lib/carrierwave_shrine_synchronization.rb

```
module CarrierwaveShrineSynchronization
    def self.included(model)
      model.before_save do
        self.class.uploaders.each_key do |name|
          write_shrine_data(name) if changes.key?(name)
        end
      end
    end

    def write_shrine_data(name)
      uploader = send(name)

      if read_attribute(name).present?
        data = uploader_to_shrine_data(uploader)

        if uploader.versions.any?
          data = {original: data}
          uploader.versions.each do |name, version|
            data[name] = uploader_to_shrine_data(version)
          end
        end

        # Remove the `.to_json` if you're using a JSON column, otherwise the JSON
        # object will be saved as an escaped string.
        write_attribute(:"#{name}_data", data.to_json)
      else
        write_attribute(:"#{name}_data", nil)
      end
    end

    private

    # If you'll be using `:prefix` on your Shrine storage, make sure to
    # subtract it from the path assigned as `:id`.
    def uploader_to_shrine_data(uploader)
      filename = read_attribute(uploader.mounted_as)
      path     = uploader.store_path(filename)

      {
        storage: :store,
        id: path,
        metadata: { filename: filename }
      }
    end
  end
```

### 2. migration대상 파일에 add column xx_data

CarrierWave에서 사용한 Pet테이블의 image컬럼과 MovieTmp의 movie컬럼 뒤에 `_data`가 추가된 컬럼을 만들어준다.
이하 커맨드를 실행해서 migrate용 데이터를 생성했다.

```
rails g migration add_movie_data_to_movie_tmp movie_data:text
rails g migration add_image_data_to_pets image_data:text
bundle exec rake db:migrate
```

#### ※ 주의사항

기존의 컬럼과 관계 없는 컬럼명으로 마이그레이트는 안되는것 같다

예를 들어 `video_data`라는 컬럼을 만들어서 movie -> video_data에 마이그레이트는 실행불가(공식 사이트에서 제공해준 스크립트로는)

### 3. 모델에 CarrierwaveShrineSynchronization을 include

각 테이블에 컬럼 추가가 끝나면 1번에서 작성한 CarrierwaveShrineSynchronization을 마이그레이트 해줄 모델에 include하자
여기서 주의할점은 mount_uploader뒤에 include할것

#### app/models/pet.rb

```
mount_uploader :image, ImageUploader
  include CarrierwaveShrineSynchronization
```

#### app/models/movie_tmp.rb

```
mount_uploader :image, ImageUploader
  include CarrierwaveShrineSynchronization
```

### 4. 마이그레이트용 커맨드 실행

이하 커맨드를 실행하면 기존에 carrierWave에 의해서 만들어진 컬럼이 Shrine용 컬럼으로 마이그레이트를 실행하게 된다.

```
pry(main)> MovieTmp.find_each{|k|  MovieTmp.uploaders.each_key { |name| k.write_shrine_data(name) }; k.save! }
```

```
pry(main)> Pet.find_each{|k|  Pet.uploaders.each_key { |name| k.write_shrine_data(name) }; k.save! }
```

실행후 해당 테이블의 컬럼을 확인하면 이하와 같이 xx_data컬럼에 새로운 정보가 추가되있는걸 알 수 있다.

![image](https://user-images.githubusercontent.com/4640346/52271010-dc01b780-2985-11e9-96b4-f453c26c281f.png)

### 5. metadata..??

Shrine.plugin :refresh_metadata

```
pry(main)> Pet.find_each{|k|  attachment = ImageUploader.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
```

Photo.find_each do |photo|
attachment = ImageUploader.uploaded_file(photo.image, &:refresh_metadata!)
photo.update(image_data: attachment.to_json)
end

Pet.find*each {|k| Pet.uploaders.each_key { |name| k.write_shrine_data(name) }; k.save!}
D, [2019-02-05T12:44:36.441714 #182] DEBUG -- : Pet Load (0.5ms) SELECT `pets`.* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000
D, [2019-02-05T12:44:36.457919 #182] DEBUG -- : (0.5ms) BEGIN
D, [2019-02-05T12:44:36.471748 #182] DEBUG -- : Owner Load (0.9ms) SELECT `owners`.\_ FROM `owners` WHERE `owners`.`id` = 1 LIMIT 1
D, [2019-02-05T12:44:36.534295 #182] DEBUG -- : PetType Load (0.9ms) SELECT `pet_types`.\* FROM `pet_types` WHERE `pet_types`.`id` = 2 LIMIT 1
D, [2019-02-05T12:44:36.555409 #182] DEBUG -- : (0.6ms) ROLLBACK
Shrine::Error: {"original"=>{"storage"=>"store", "id"=>"images/kim/pet/image/1/62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg", "metadata"=>{"filename"=>"62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg"}}, "thumb"=>{"storage"=>"store", "id"=>"images/kim/pet/image/1/thumb_62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg", "metadata"=>{"filename"=>"62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg"}}} isn't valid uploaded file data
from /shared/vendor/bundle/ruby/2.3.0/gems/shrine-2.14.0/lib/shrine/uploaded_file.rb:31:in `initialize'

```
Shrine.plugin :refresh_metadata
=> Shrine::Plugins::RefreshMetadata
[132] pry(main)> Pet.find_each{|k|  attachment = ImageUploader.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
D, [2019-02-18T12:29:39.108372 #148] DEBUG -- :   Pet Load (0.5ms)  SELECT  `pets`.* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000
NoMethodError: undefined method `uploaded_file' for ImageUploader:Class
from (pry):33:in `block in <main>'
```

Shrine.plugin :refresh_metadata

### Reference Link:

```
https://github.com/shrinerb/shrine/blob/master/doc/carrierwave.md
```

[공식페이지]: https://github.com/shrinerb/shrine/blob/master/doc/carrierwave.md

I am considering the following fromcarrierwave to shrine.

Shrine.plugin :refresh_metadata

=> Shrine::Plugins::RefreshMetadata

[132] pry(main)> Pet.find_each{|k| attachment = ImageUploader.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }

D, [2019-02-18T12:29:39.108372 #148] DEBUG -- : Pet Load (0.5ms) SELECT `pets`.\* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000

NoMethodError: undefined method `uploaded_file' for ImageUploader:Class

from (pry):33:in `block in <main>'

i'm considering the following from carrierwave to shrine.

https://github.com/shrinerb/shrine/blob/master/doc/carrierwave.md

So I executed the command with reference to above url, but the following error occurred

command:

```
Shrine.plugin :refresh_metadata
Pet.find_each{|k|  attachment = ImageUploader.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
```

result:

```
NoMethodError: undefined method `uploaded_file' for ImageUploader:Class
```

How can I resolve this error?

https://groups.google.com/forum/#!forum/ruby-shrine

質問なげたよん

↓

ImageUploader は CarrierWave そのままではなかったんだね、、

Thank you for your advice.
ImageUploader.rb (carrierWave) is used by another model.
So i created file ImageUploader3.rb

After correcting, I executed the following command, but I got another error.

command:

```
Shrine.plugin :refresh_metadata
Pet.find_each{|k|  attachment = ImageUploader3.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
```

error:

```
Pet.find_each{|k|  attachment = ImageUploader.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
D, [2019-02-20T12:59:24.819186 #1675] DEBUG -- :   Pet Load (0.6ms)  SELECT  `pets`.* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000
Shrine::Error: storage :cache isn't registered on ImageUploader3
from /shared/vendor/bundle/ruby/2.3.0/gems/shrine-2.14.0/lib/shrine.rb:97:in `find_storage'

```

I searched ":cache isn't registered on xx" on google and found this link as follow

https://stackoverflow.com/questions/43263779/ruby-rails-shrineerror-storage-cache-isnt-registered-on-pdfuploaders

but i could'not what is the problem.

My configuration about shrine is as follows.
Please Let me know if there is a way to solve it.

```
app/uploaders/ImageUploader3.rb
class ImageUploader3 < Shrine
end

```

model:

```
app/models/pet.rb
  #mount_uploader :image, ImageUploader
  include ImageUploader3::Attachment.new(:mime_types)
```

config/init/shrine.rb:

```
require "shrine"
require "shrine/storage/s3"
Aws.config[:region] = Global.aws.region

s3_options = {
  access_key_id:     Global.aws.aws_access_key_id,
  secret_access_key: Global.aws.aws_secret_access_key,
  region:            Global.aws.region,
  bucket:            Global.aws.bucket_name,
}

if Rails.production? || Rails.staging?

  Shrine.storages[:store] = Shrine::Storage::S3.new(
    bucket:            Global.aws.bucket_name,
    region:            Global.aws.region,
  )

elsif Rails.development?
  Shrine.storages[:store] = Shrine::Storage::S3.new(
    bucket:            Global.aws.bucket_name,
    access_key_id:     Global.aws.aws_access_key_id,
    secret_access_key: Global.aws.aws_secret_access_key,
    region:            Global.aws.region,
  )
else
  CarrierWave.configure do |config|
    config.storage = :file
    config.cache_storage = :file
  end
end

require "shrine/storage/file_system"
Shrine.storages = {
  cache: Shrine::Storage::S3.new(prefix: "cache", **s3_options),
  store: Shrine::Storage::S3.new(**s3_options),
}

Shrine.plugin :activerecord # if you're using ActiveRecord
```

Currently existing data:

```
[12] pry(main)> Pet.first
D, [2019-02-20T13:05:03.818161 #1675] DEBUG -- :   Pet Load (0.6ms)  SELECT  `pets`.* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1
=> #<Pet:0x000000000ce867d0
 id: 3,
 owner_id: 1,
 pet_type_id: 1,
 pet_name: "rara",
 status: "alive",
 gender: "male",
 bloodline: "mix",
 breed1: "",
 breed2: "",
 image: "8131332c-8275-4bc7-ab36-e50701121b7d.jpg",
 birthday: Mon, 04 Feb 2019 00:00:00 JST +09:00,
 created_at: Mon, 18 Feb 2019 21:21:33 JST +09:00,
 updated_at: Mon, 18 Feb 2019 21:23:38 JST +09:00,
 image_data:
  "{\"original\":{\"storage\":\"store\",\"id\":\"images/kim/pet/image/3/8131332c-8275-4bc7-ab36-e50701121b7d.jpg\",\"metadata\":{\"filename\":\"8131332c-8275-4bc7-ab36-e50701121b7d.jpg\"}},\"thumb\":{\"storage\":\"store\",\"id\":\"images/kim/pet/image/3/thumb_8131332c-8275-4bc7-ab36-e50701121b7d.jpg\",\"metadata\":{\"filename\":\"8131332c-8275-4bc7-ab36-e50701121b7d.jpg\"}}}">
```

---

```
Pet.find_each{|k|  attachment = ImageUploader3.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
D, [2019-02-25T07:20:09.239748 #2822] DEBUG -- :   Pet Load (1.1ms)  SELECT  `pets`.* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000
JSON::ParserError: 765: unexpected token at 'c-8275-4bc7-ab36-e50701121b7d.jpg'
from /shared/vendor/bundle/ruby/2.3.0/gems/json-2.1.0/lib/json/common.rb:156:in `parse'
```

Pet.find_each{|k| attachment = ImageUploader3.uploaded_file(k.image, &:refresh_metadata!); puts attachment }

Pet.find_each{|k| attachment = ImageUploader3.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
D, [2019-02-26T06:10:24.056128 #2739] DEBUG -- : Pet Load (0.3ms) SELECT `pets`.\* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000
JSON::ParserError: 765: unexpected token at 'c-8275-4bc7-ab36-e50701121b7d.jpg'
from /shared/vendor/bundle/ruby/2.3.0/gems/json-2.1.0/lib/json/common.rb:156:in `parse'

```
app/model/pet.rb

  mount_uploader :image, ImageUploader
  include ImageUploader3::Attachment.new(:mime_types)
```

```
Pet.find_each{|k|  attachment = ImageUploader3.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
D, [2019-02-26T06:06:46.941539 #2739] DEBUG -- :   Pet Load (0.7ms)  SELECT  `pets`.* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000
Shrine::Error: cannot convert #<ImageUploader:0x000000000e37c0b8 @model=#<Pet id: 3, owner_id: 1, pet_type_id: 1, pet_name: "rara", status: "alive", gender: "male", bloodline: "mix", breed1: "", breed2: "", image: "8131332c-8275-4bc7-ab36-e50701121b7d.jpg", birthday: "2019-02-03 15:00:00", created_at: "2019-02-18 12:21:33", updated_at: "2019-02-18 12:23:38", image_data: "{\"original\":{\"storage\":\"store\",\"id\":\"images/kim/pe...">, @mounted_as=:image, @file=#<CarrierWave::Storage::Fog::File:0x000000000c83e1c0 @uploader=#<ImageUploader:0x000000000e37c0b8 ...>, @base=#<CarrierWave::Storage::Fog:0x000000000c83f908 @uploader=#<ImageUploader:0x000000000e37c0b8 ...>>, @path="images/kim/pet/image/3/8131332c-8275-4bc7-ab36-e50701121b7d.jpg", @content_type=nil>, @filename=nil, @cache_id=nil, @versions={:thumb=>#<ImageUploader::Uploader95520880:0x000000000c83d9c8 @model=#<Pet id: 3, owner_id: 1, pet_type_id: 1, pet_name: "rara", status: "alive", gender: "male", bloodline: "mix", breed1: "", breed2: "", image: "8131332c-8275-4bc7-ab36-e50701121b7d.jpg", birthday: "2019-02-03 15:00:00", created_at: "2019-02-18 12:21:33", updated_at: "2019-02-18 12:23:38", image_data: "{\"original\":{\"storage\":\"store\",\"id\":\"images/kim/pe...">, @mounted_as=:image, @file=#<CarrierWave::Storage::Fog::File:0x000000000e38bd10 @uploader=#<ImageUploader::Uploader95520880:0x000000000c83d9c8 ...>, @base=#<CarrierWave::Storage::Fog:0x000000000c83cc80 @uploader=#<ImageUploader::Uploader95520880:0x000000000c83d9c8 ...>>, @path="images/kim/pet/image/3/thumb_8131332c-8275-4bc7-ab36-e50701121b7d.jpg", @content_type=nil>, @filename=nil, @cache_id=nil, @versions={}, @format=nil, @parent_version=#<ImageUploader:0x000000000e37c0b8 ...>, @storage=#<CarrierWave::Storage::Fog:0x000000000c83cc80 @uploader=#<ImageUploader::Uploader95520880:0x000000000c83d9c8 ...>>>}, @format=nil, @storage=#<CarrierWave::Storage::Fog:0x000000000c83f908 @uploader=#<ImageUploader:0x000000000e37c0b8 ...>>> to a ImageUploader3::UploadedFile
from /shared/vendor/bundle/ruby/2.3.0/gems/shrine-2.14.0/lib/shrine.rb:125:in `uploaded_file'
```

---

Thnaks for your advice.
I was able to solve the problem you asked before by reading your adivce.
But I encounter another error as follows.

```
Pet.find_each{|k| attachment = ImageUploader3.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
D, [2019-02-26T06:10:24.056128 #2739] DEBUG -- : Pet Load (0.3ms) SELECT `pets`.\* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000
JSON::ParserError: 765: unexpected token at 'c-8275-4bc7-ab36-e50701121b7d.jpg'
from /shared/vendor/bundle/ruby/2.3.0/gems/json-2.1.0/lib/json/common.rb:156:in `parse'
```

When i encounter this error, configuration of app/model/pet.rb is as follows.

```
 include ImageUploader3::Attachment.new(:mime_types)
```

Another error encountered When changing the setting as follows.

```
  mount_uploader :image, ImageUploader #<--CarrierWave
  include ImageUploader3::Attachment.new(:mime_types) #<--Shrine
```

error:

```
Pet.find_each{|k|  attachment = ImageUploader3.uploaded_file(k.image, &:refresh_metadata!); k.update(image_data: attachment.to_json) }
D, [2019-02-26T06:06:46.941539 #2739] DEBUG -- :   Pet Load (0.7ms)  SELECT  `pets`.* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1000
Shrine::Error: cannot convert #<ImageUploader:0x000000000e37c0b8 @model=#<Pet id: 3, owner_id: 1, pet_type_id: 1, pet_name: "rara", status: "alive", gender: "male", bloodline: "mix", breed1: "", breed2: "", image: "8131332c-8275-4bc7-ab36-e50701121b7d.jpg", birthday: "2019-02-03 15:00:00", created_at: "2019-02-18 12:21:33", updated_at: "2019-02-18 12:23:38", image_data: "{\"original\":{\"storage\":\"store\",\"id\":\"images/kim/pe...">, @mounted_as=:image, @file=#<CarrierWave::Storage::Fog::File:0x000000000c83e1c0 @uploader=#<ImageUploader:0x000000000e37c0b8 ...>, @base=#<CarrierWave::Storage::Fog:0x000000000c83f908 @uploader=#<ImageUploader:0x000000000e37c0b8 ...>>, @path="images/kim/pet/image/3/8131332c-8275-4bc7-ab36-e50701121b7d.jpg", @content_type=nil>, @filename=nil, @cache_id=nil, @versions={:thumb=>#<ImageUploader::Uploader95520880:0x000000000c83d9c8 @model=#<Pet id: 3, owner_id: 1, pet_type_id: 1, pet_name: "rara", status: "alive", gender: "male", bloodline: "mix", breed1: "", breed2: "", image: "8131332c-8275-4bc7-ab36-e50701121b7d.jpg", birthday: "2019-02-03 15:00:00", created_at: "2019-02-18 12:21:33", updated_at: "2019-02-18 12:23:38", image_data: "{\"original\":{\"storage\":\"store\",\"id\":\"images/kim/pe...">, @mounted_as=:image, @file=#<CarrierWave::Storage::Fog::File:0x000000000e38bd10 @uploader=#<ImageUploader::Uploader95520880:0x000000000c83d9c8 ...>, @base=#<CarrierWave::Storage::Fog:0x000000000c83cc80 @uploader=#<ImageUploader::Uploader95520880:0x000000000c83d9c8 ...>>, @path="images/kim/pet/image/3/thumb_8131332c-8275-4bc7-ab36-e50701121b7d.jpg", @content_type=nil>, @filename=nil, @cache_id=nil, @versions={}, @format=nil, @parent_version=#<ImageUploader:0x000000000e37c0b8 ...>, @storage=#<CarrierWave::Storage::Fog:0x000000000c83cc80 @uploader=#<ImageUploader::Uploader95520880:0x000000000c83d9c8 ...>>>}, @format=nil, @storage=#<CarrierWave::Storage::Fog:0x000000000c83f908 @uploader=#<ImageUploader:0x000000000e37c0b8 ...>>> to a ImageUploader3::UploadedFile
from /shared/vendor/bundle/ruby/2.3.0/gems/shrine-2.14.0/lib/shrine.rb:125:in `uploaded_file'
```

is there a way to avoid or solve this error?
If you know this way, please let me know.

In addition, I'm curious whether the refresh_metadata plugin is essential when migrating from CarrierWave to Shrine.
