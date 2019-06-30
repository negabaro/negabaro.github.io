```
Pet.first.image
D, [2019-02-18T12:24:53.502790 #148] DEBUG -- :   Pet Load (0.6ms)  SELECT  `pets`.* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1
=> #<ImageUploader:0x0000000005524388
 @cache_id=nil,
 @file=
  #<CarrierWave::Storage::Fog::File:0x0000000010853ad0
   @base=#<CarrierWave::Storage::Fog:0x0000000010853eb8 @uploader=#<ImageUploader:0x0000000005524388 ...>>,
   @content_type=nil,
   @path="images/kim/pet/image/3/8131332c-8275-4bc7-ab36-e50701121b7d.jpg",
   @uploader=#<ImageUploader:0x0000000005524388 ...>>,
 @filename=nil,
 @format=nil,
 @model=
  #<Pet:0x00000000055258c8
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
    "{\"original\":{\"storage\":\"store\",\"id\":\"images/kim/pet/image/3/8131332c-8275-4bc7-ab36-e50701121b7d.jpg\",\"metadata\":{\"filename\":\"8131332c-8275-4bc7-ab36-e50701121b7d.jpg\"}},\"thumb\":{\"storage\":\"store\",\"id\":\"images/kim/pet/image/3/thumb_8131332c-8275-4bc7-ab36-e50701121b7d.jpg\",\"metadata\":{\"filename\":\"8131332c-8275-4bc7-ab36-e50701121b7d.jpg\"}}}">,
 @mounted_as=:image,
 @storage=#<CarrierWave::Storage::Fog:0x0000000010853eb8 @uploader=#<ImageUploader:0x0000000005524388 ...>>,
 @versions=
  {:thumb=>
    #<ImageUploader::Uploader56583960:0x0000000010853a58
     @cache_id=nil,
     @file=
      #<CarrierWave::Storage::Fog::File:0x0000000010853468
       @base=#<CarrierWave::Storage::Fog:0x00000000108538a0 @uploader=#<ImageUploader::Uploader56583960:0x0000000010853a58 ...>>,
       @content_type=nil,
       @path="images/kim/pet/image/3/thumb_8131332c-8275-4bc7-ab36-e50701121b7d.jpg",
```
