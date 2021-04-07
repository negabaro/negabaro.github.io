

이미지 와쿠만 만들고 싶을때 개유용할듯

「記事の最後に、それを一発でやれるgem↓が紹介されてます」

リポジトリ: arkency/image_placeholder
# 同リポジトリより
# config/environments/development.rb

Rails.application.configure do
  config.middleware.use ImagePlaceholder::Middleware, size_pattern: {
    %r{/uploads/.*/s_[0-9]+\.[a-z]{3}$}  => 200,  # /uploads/product/cover/42/s_9781467775687.jpg
    %r{/uploads/.*/xl_[0-9]+\.[a-z]{3}$} => 750,  # /uploads/product/cover/42/xl_9781467775687.jpg
    %r{.*} => 1024,                               # /uploads/random/spanish_inquisition.png
  }
end
「外部のplaceholderサービスを使うとリファラとかが飛んでしまうので、扱っているサイトがとても機密な場合やURLそのものに機密な内容が含まれる場合には注意が必要ですね（readable slugとか使ってて /articles/増資しちゃうぞ★みたいなURLが事前におもらしすると事故）」「あー🤭、developer環境に限るのがよさそうですね」「dev環境でもプロジェクト名自体が機密だったり機能名が機密な可能性もありますので」「あ、そうか💦」

「こういう外部系サービスは便利ですが、どれくらい信用してもいいのかは気をつけておかないと危ないので、今ならCSSとかSVGとかでライブラリでローカル生成するほうが気持ちとしては安心できる気がする🧐」

https://github.com/arkency/image_placeholder

https://placeholder.com/
https://blog.arkency.com/image-placeholder-for-your-development-environment/
