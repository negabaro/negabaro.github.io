---
layout: post
title:  "ruby aws-sdk-s3를 이용해 S3 Presgined URL발행하는 방법에 대해 알아보자"
author: negabaro kim
tags:	rails
---

크게 `기존파일에 S3 Presigned URL을 발행하는 방법`과 `파일을 추가하고 S3 Presinged URL을 발행`하는 2가지 패턴이 있다.

간단하게 전자를 get 후자를 put이라고 축약해서 설명해본다.


## put

### 선언방법

```ruby
bucket = Aws::S3::Resource.new.bucket(ENV['BUCKETEER_BUCKET_NAME'])
obj = bucket.object("#{dir}/#{file_name}")
```

### put(업로드)

```ruby
obj.presigned_url(:put)
```

위 커맨드를 실행하면 아래 두가지 액션이 실행된다.


#### 실제 해당 S3상에 0byte의 파일이 생성됨

bucket명 xxx에 `images/xx.mp4` 라는 path였다면 해당 path의 S3에 0byte의 파일이 만들어진다.

#### presigned_url 발행

아래와 같은 presigned url이 발행된다. 해당 URL은 디폴트 유효기간이 15분이고(최대 7일까지 가능) 그 시간이 지나면 사용이 불가능하다.

```
https://xxx.s3.amazonaws.com/images/xx.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVZH4SBSY4EO3QIWS%2F20210428%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210428T112140Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=20e494910e73bde0404aa4ccaf6b10a8690a3ceff16489e2e72a82b879a4d39f
```

## get

### 선언방법

두가지 차이에 대해서는 잘모르겠다. 둘다 잘 돌아감

```ruby
s3 = Aws::S3::Client.new
signer = Aws::S3::Presigner.new(client: s3)
```

or

```ruby
signer = Aws::S3::Presigner.new
```


## 

필자가 가장 많이 쓰는 방법

#### 기존의 파일에 대한 S3 Presgined URL발행

```ruby
signer.presigned_url(:get_object, 
                     bucket: 'your-bucket',
                     key: 'path/to/object')
```

#### expires_in설정

아래 예제에서는 URL의 유효기간을 30초로 설정해 발행

```ruby
signer.presigned_url(:get_object, 
                     bucket: 'your-bucket',
                     key: 'path/to/object', 
                     expires_in: 30)
```

#### HTTPS

HTTPS를 강제할때 `secure: true` 지정한다고 한다.

근데 s3는 `https`디폴트 아닌가..?;;

```ruby
signer.presigned_url(:get_object, 
                     bucket: 'your-bucket',
                     key: 'path/to/object', 
                     secure: true)
```

#### Content-Type추가

예를들어 S3파일을 직접 브라우저에서 여는게 아니고 다운로드 하게하고 싶을때 `application/force-download`를 추가해주는데

이때 `response_content_type`를 이용해 지정해줌

```ruby
signer.presigned_url(:get_object, 
                     bucket: 'your-bucket',
                     key: 'path/to/object', 
                     response_content_type: 'application/force-download')
```

#### Content-Disposition

※Content-Disposition: 다운로드 파일명 지정할때 사용

위 예제와 동일하게 response_content_dispositio 지정도 가능


```ruby
signer.presigned_url(:get_object, 
                     bucket: 'your-bucket',
                     key: 'path/to/object', 
                     response_content_disposition: 'attachment; filename=Downloadfile.pdf')
```

---

[Link1]: https://qiita.com/takeyuweb/items/b32dd7487d724faac1fe
[Class: Aws::S3::Presigner도큐멘트]: https://docs.aws.amazon.com/sdk-for-ruby/v2/api/Aws/S3/Presigner.html
[공식 도큐멘트]: https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/S3/Presigner.html#presigned_url-instance_method