따로 프로세스 안띄어된다함

public/packs/ 다지우고

억세스하니까 컴파일해서 파일 만들어주는거 확인

pets에서 처음에 느리던게 이 컴파일 만드는거 때문이었구나!!!!!!!!!!

정리하면 webpacker3 이후부터는 컴파일 알아서 해줌ㅋ

# rails에서 webpacker를 쓰는 이유!(webpack이 아니고 webpacker임)

従来の sprockets のみで ES6 や TypeScript などを使用した開発では、別に webpack などで build したファイルを sprockets に通して~という２段階構成を自前で用意しなければなりませんでした。

rails/webpacker を使うと rails <=>webpack のブリッジ部分を綺麗にやってくれるので、そういった煩わしさがなくなります。

## ホットリロード

これは webpacker デフォルトでできます。
webpack-dev-server を使ったホットリロードが可能です。
鬼のように開発が早くなって便利です。

もちろん、頑張ればこれらは sprockets でもできることではあるのですが、
Rails がデフォルトでサポートしたということは大きな事だと思います。

https://medium.com/@jiraffestaff/webpacker%E3%81%A7%E8%87%AA%E7%94%B1%E3%81%AB%E3%81%AA%E3%82%8C%E3%82%8B-ruby-on-rails-5-1-%E3%81%AE%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E6%A7%8B%E6%88%90-36277ef9874f
