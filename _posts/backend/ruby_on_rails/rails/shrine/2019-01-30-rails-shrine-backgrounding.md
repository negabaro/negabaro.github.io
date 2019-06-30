---
layout: post
title: "Rails5.2 Shrine 파일업로드시 백그라운드에서 썸네일 이미지 생성"
author: negabaro kim
categories: rails
tags: rails gem
---

# 이전 포스트

#### [Rails5.2 Shrine을 이용한 로컬 파일 업로드]({% post_url 2019-01-30-rails-shrine-local %})

#### [Rails5.2 Shrine을 이용한 S3 파일 업로드]({% post_url 2019-01-30-rails-shrine-s3 %})

#### [Shrine에서 사용하는 플러그인을 알아보자]({% post_url 2019-01-30-rails-shrine-plugin %})

이전 포스트에 이어서 파일업로드시 백그라운드에서 썸네일 이미지를 생성하는 방법에 대해서 알아보자.

### 필요한 환경설정

실행하기에 앞서 이하 환경을 구축할 필요가 있다.

sidekiq <-- 비동기job 실행을 위해서
imagemagick <-- 이미지 파일을 가공하기 위해서

### 비동기로 썸네일 이미지를 생성해야 하는 이유

### background job추가

app/jobs/shrine_backgrounding/delete_job.rb

```
module ShrineBackgrounding
  class DeleteJob
    include Sidekiq::Worker

    def perform(data)
      Shrine::Attacher.delete(data)
    end
  end
end
```

app/jobs/shrine_backgrounding/promote_job.rb

```
module ShrineBackgrounding
  class PromoteJob
    include Sidekiq::Worker

    def perform(data)
      Shrine::Attacher.promote(data)
    end
  end
end
```

### config/initializers/shrine.rb에 백그라운드 설정 추가

```
Shrine.plugin :backgrounding
Shrine::Attacher.promote { |data| ShrineBackgrounding::PromoteJob.perform_async(data) }
Shrine::Attacher.delete { |data| ShrineBackgrounding::DeleteJob.perform_async(data) }
```

---

백그라운드가 진짜 움직이는 건지 모르겠음...

둘다 적용될려면

recache안에

```
  process(:recache) do |io|
    original = io.download
    pipeline = ImageProcessing::MiniMagick.source(original)

    {
      original: io,
      thumbnail: pipeline.resize_to_limit!(300, 300)
    }
  end
```

cached파일에 적용하기 싫으면 store에만

```
 process(:store) do |io|
    original = io[:original].download
    pipeline = ImageProcessing::MiniMagick.source(original)

    {
      # Original
      sm: pipeline.resize_to_limit!(350, 350),
      md: pipeline.resize_to_limit!(600, 600),
      lg: pipeline.resize_to_limit!(1200, 1200),

      # Squares
      sm_square: pipeline.resize_to_limit!(350, 350),
      md_square: pipeline.resize_to_limit!(600, 600),
      lg_square: pipeline.resize_to_limit!(1200, 1200),
    }
  end
```

Reference Link:

```
https://github.com/shrinerb/shrine
http://programming-beginner-memo.com/?p=664
https://codyeatworld.com/2017/04/18/rails-uploading-images-confidently-with-shrine-rb/
```
