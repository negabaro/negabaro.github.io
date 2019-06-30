```ruby
ActionController::UnknownFormat (Api::ItemsController#index is missing a template for this request format and variant.

request.formats: ["text/html"]
request.variant: []):
```

controller.rb

```ruby
render 'index', formats: 'json', handlers: 'jbuilder'
```

이렇게 하니 해결

이게 없어도 postman에서는 왜 에러가 안난거지..ㅅㅂ
