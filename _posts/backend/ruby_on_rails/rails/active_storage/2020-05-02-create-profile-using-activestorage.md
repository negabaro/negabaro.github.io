---
layout: post
title:  "Rails active storage란"
author: negabaro kim
categories: rails
tags:	rails devise
---

# active storage란

rails5.2부터 추가된 파일 업로드를 간단히 실행해주는 기능
유사gem으로 paperclib,carrierwave 등이 있다.


# 설정방법


```ruby
rails active_storage:install
rails db:migrate
```


# 모델설정

```ruby
class User < ApplicationRecord  
  has_one_attached :avatar
end
```

기본적으로 사용하기 위해서는 위 설정만 해주면 동작한다.

avatar라는 컬럼을 따로 추가할 필요가 없고 모델에 `has_one_attached`를 추가해주기만 하면
사용가능. :avatar말고 다른 이름으로 해도 됨.


# 컨트롤러 설정

```ruby
  def update
    current_user.update(user_params)
    redirect_to request.referrer
  end

  private
  def user_params
    params.require(:user).permit(:avatar)
  end
```

컨트롤러에서는 param으로 받아주기만 하면됨

# 뷰설정

```ruby
= form_with(model: current_user, url: my_profiles_path, method: 'put') do |f|
    = image_tag(current_user.avatar.variant(resize:'200x200')) if current_user.avatar.present?
    = f.file_field :avatar, lang: 'en'
    = f.submit 'update'
```

`file_field`에 `has_one_attached`에서 지정한 이름을 똑같이 적어주자
active storage를 이용시 variant를 이용해서 사이즈를 줄여준다든지 imagemagick의 커맨드를 실행해 줄 수 있다.



# 메모1(vs paperclip,carrierwave)

paperclip,carrierwave와 비교하면 
rails default로 들어가 있어서 추가gem을 넣을 필요없음(도입이 간단)
cache나varidation기능이 없음.

# 메모2

`rails active_storage:install`실행시

`active_storage_blobs`와`active_storage_attachments`라는 2개의 테이블이 생김
각각 Blob와Attachment라는 2개의 모델을 사용하는데
Blob에는 파일명,파일종류,바이트수,오류검출등을 메타데이터는 저장하는 역할이고
Attachment모델은 Blob와Active Record간의 중간테이블 역할이다.

특별한 일이없는한 다이렉트로 Blob,Attachment모델을 건드릴 일은 없음.(알아서 돌아감)


# 메모3

위에서 잠깐 언급했듯이 variant를 이용해서 imagemagick의 커맨드를 실행할 수 있음


### 흑백이미지

![image](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F39570%2Fc68ceffc-e636-3c15-2798-f77ab15c8946.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ac2ef3f1f8beffdece7f8be4956e1d21)

```ruby
current_user.avatar.variant(resize:'200x200',type: :grayscale).processed
```

### 반전

![image](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F39570%2F0430cea7-78e5-2b17-689d-940f76ea7b36.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=86f9f452804ec9da8151e25b5124d659)

```ruby
current_user.avatar.variant(resize:'200x200',flop:true).processed
```

### blur효과

![image](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F39570%2F3d23b01b-397e-bb32-2422-895e6d2310c4.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=0e36e0df82ebf3cacd2e70c200fdc117)



```ruby
current_user.avatar.variant(resize:'200x200',blur:50).processed
```

### 회전효과

![image](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F39570%2F2d45fe6e-4abf-af8f-3753-83707c02efe8.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ff7ec2ad16cea18a54c267e431d8bb44)

```ruby
current_user.avatar.variant(resize:'200x200',rotate:30).processed
```

### 보더설정

![image](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F39570%2Fb0097dca-843b-f439-dc84-f4970520bcf1.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=a1158c814571960439bd4a1613ebab69)


```ruby
current_user.avatar.variant(combine_options:{resize:'200x200',border:'5',bordercolor:'red'}).processed
```

### reference:


```
https://qiita.com/hmmrjn/items/7cc5e5348755c517458a
```