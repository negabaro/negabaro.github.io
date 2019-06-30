https://teratail.com/questions/180394#reply-268458

簡易的には、as_json で include するという手があります。

@items = Item.includes(:user).page(params[:page] ||= 1).per(8).order('created_at DESC')
render json: @items.as_json(include: :user)
ただ、これでは User について全列が入ってしまうので、jbuilder などで必要な形の JSON を構築したほうがいいとは思います。

---

include안에서도 only 사용은 가능했다

```ruby
@items.as_json(only: [:id,:start_time, :end_time,  :created_at, :updated_at], include: { user: { only: [:id,:name, :nickname, :image] } })
```

근데 이미지를 가져오려면

current_user.image_url(:original)

이런식으로 가져와야하는데

include: { user: { only: [:id,:name, :nickname, :image] } })

여기서

include: { user: { only: [:id,:name, :nickname, :image_url(:original)] } })

하면 당연히 에러가남.. 어떻게 해야되징..

```ruby
SyntaxError: unexpected '(', expecting ']'
...d,:name, :nickname, :image_url(:original)] } })
...
```

이런 에러가남
