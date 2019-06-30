render json시에는 header에 `Content-Type": "application/json` 이 자동으로 붙는 듯

근데 view로 넘겨서 jbuilder로 보낼때 리퀘스트 요청하는 쪽에서

`Content-Type": "application/json`이 설정안하면 에러나니까 주의

레일즈에서 이러한 에러남

ActionController::UnknownFormat (Api::ItemsController#index is missing a template for this request format and variant.

request.formats: ["text/html"]
request.variant: []):
