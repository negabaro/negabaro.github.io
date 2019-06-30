Pet.first
D, [2019-02-18T11:51:08.897520 #148] DEBUG -- : (3.5ms) SET NAMES utf8mb4 COLLATE utf8mb4_general_ci, @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'), @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
D, [2019-02-18T11:51:08.921780 #148] DEBUG -- : Pet Load (0.3ms) SELECT `pets`.\* FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1
=> #<Pet:0x000000000c94edd0
id: 1,
owner_id: 1,
pet_type_id: 2,
pet_name: "sana",
status: "alive",
gender: "female",
bloodline: "pedigree",
breed1: "",
breed2: "",
image: "62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg",
birthday: Mon, 21 Jan 2019 00:00:00 JST +09:00,
created_at: Tue, 22 Jan 2019 17:57:32 JST +09:00,
updated_at: Tue, 05 Feb 2019 18:52:39 JST +09:00,
image_data:
"{\"original\":{\"storage\":\"store\",\"id\":\"images/kim/pet/image/1/62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg\",\"metadata\":{\"filename\":\"62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg\"}},\"thumb\":{\"storage\":\"store\",\"id\":\"images/kim/pet/image/1/thumb_62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg\",\"metadata\":{\"filename\":\"62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg\"}}}">

Pet.first.image_data
D, [2019-02-18T11:51:16.171698 #148] DEBUG -- : Pet Load (0.7ms) SELECT `pets`._ FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1
=> "{\"original\":{\"storage\":\"store\",\"id\":\"images/kim/pet/image/1/62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg\",\"metadata\":{\"filename\":\"62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg\"}},\"thumb\":{\"storage\":\"store\",\"id\":\"images/kim/pet/image/1/thumb_62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg\",\"metadata\":{\"filename\":\"62c4f9bd-925b-48c4-9352-8a592a2d55ab.jpg\"}}}"
[7] pry(main)> Pet.first.image
D, [2019-02-18T11:51:23.424008 #148] DEBUG -- : Pet Load (0.7ms) SELECT `pets`._ FROM `pets` ORDER BY `pets`.`id` ASC LIMIT 1
Shrine::Error: storage :cache isn't registered on ImageUploader3
from /shared/vendor/bundle/ruby/2.3.0/gems/shrine-2.14.0/lib/shrine.rb:97:in `find_storage'

---

MovieTmp.first
D, [2019-02-18T11:53:22.287241 #148] DEBUG -- : MovieTmp Load (0.8ms) SELECT `movie_tmps`.\* FROM `movie_tmps` ORDER BY `movie_tmps`.`id` ASC LIMIT 1
=> #<MovieTmp:0x000000000d421140
id: 1,
pet_id: 1,
consultation_id: nil,
health_id: nil,
movie: nil,

MovieTmp.first.movie
D, [2019-02-18T11:53:41.776189 #148] DEBUG -- : MovieTmp Load (0.6ms) SELECT `movie_tmps`.\* FROM `movie_tmps` ORDER BY `movie_tmps`.`id` ASC LIMIT 1
=> #<MovieUploader:0x000000000d4c2158
@cache_id=nil,
@file=nil,
@filename=nil,
@model=
#<MovieTmp:0x000000000d4c2dd8
id: 1,
pet_id: 1,
consultation_id: nil,
health_id: nil,
movie: nil,
transcode_status: "submitted",
created_at: Tue, 22 Jan 2019 17:57:32 JST +09:00,
updated_at: Tue, 22 Jan 2019 17:57:32 JST +09:00,
movie_type: "pet_normal",
training_id: nil,
training_post_id: nil,
consultation_post_id: nil,
health_post_id: nil,
food_id: nil,
food_post_id: nil,
consultation_answer_id: nil,
health_answer_id: nil,
training_answer_id: nil,
food_answer_id: nil,
movie_tmp: nil,
movie_processing: false,
check_flag: false,
video_data: nil,
movie_data: nil>,
@mounted_as=:movie,
@versions=nil>
