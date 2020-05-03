---
layout: post
title:  "rails form_with에서 nested form구현(accepts_nested_attributes_for)"
author: negabaro kim
categories: rails
tags:	rails tip
---

# 목표

`post -> articles`관계의 모델을 갱신할 수 있는 nested form을 구현해보자


# 컨트롤러 설정(new)


```ruby
def new
    @post = current_user.posts.new
    @post.articles.build #이 부분이 포인트(없으면 fields_for :articles를 찾지못하고 아무것도 렌더링 안함)
end
```

# 뷰 설정

```ruby
= form_with(model: @post, url: articles_path) do |f|
  = f.fields_for :articles do |b| #<< form_with 밑에서 fields_for
    = b.rich_text_area :content
  = f.submit '등록'
```

# 모델 설정

부모 모델에서 `accepts_nested_attributes_for`를 추가하는게 포인트
(참고로 has_many가 아니어도 동작함 has_one이라든가)


### app/models/post.rb

```ruby
class Post < ApplicationRecord
  has_many :articles
  accepts_nested_attributes_for :articles # <<이 부분을 추가
end
```

### app/models/article.rb

```ruby
class Article < ApplicationRecord
  belongs_to :post
end
```


# 컨트롤러 설정(create)


```ruby
  def create
    article = current_user.posts.build(article_params)
    article.save
  end

  private
  def article_params
    params.require(:post).permit(articles_attributes: [:title, :content]) # 모델명_attributes라고 적어주는게 포인트
  end
```

위 설정이 문제없다면 nested한 폼 작성완료



# 메모1

브라우저에서 보면

```html
<textarea name="post[articles_attributes][0][content]" id="post_articles_attributes_0_content"></textarea>
```

이런식으로 렌더링됨


```= f.fields_for :articles do |b|```부분에서 :articles을 :test로 바꾸면 아래와 같이 렌더링 됨


```html
<textarea name="post[test][content]" id="post_article_content"></textarea>
```

궁금해서

`= f.fields_for 'articles_attributes[0]' do |b|`로 변경해서 브라우저에서 확인


```html
<textarea name="post[articles_attributes[0]][content]" id="post_articles_attributes_0__content"></textarea>
```

이렇게 기술해도 정상작동함
has_many의 모델명을 적어주면 알아서 네이밍까지 만들어주니 맞춰주도록 하자

# 메모2

컨트롤러 설정(new)부분에서 

`@post.articles.build` 부분이 없으면
`= f.fields_for :articles do |b|`가 정상작동하지 않으므로 주의
에러가 나는것도 아니고 아에 렌더링 자체가 안됨



### reference: 

```
https://ruby-rails.hatenadiary.com/entry/20141208/1418018874
```