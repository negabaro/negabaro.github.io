---
layout: post
title: "rails require_dependency이란"
author: negabaro kim
categories: rails
tags: rails
---

https://blog.toshimaru.net/rails-find_each/
ありました！
cach_classes の値を見て require / load を設定していました。

```
config.cache_classes = true
```

require_dependency란 rails에서 production환경에서는 `require`하고
development환경에서는`Kernel.load`가 실행되도록 해주는 메소드
레일즈에서만 존재하는 메소드이다.

autoload만으로 충분할거 같지만 autload_paths에 포함되지 않은 파일을 require할때 쓸수 있을거 같다.

require_dependency is useful in an engine when you want to re-open a class which is not defined in your engine (for example in another engine or Rails app) and have it reloaded. In which case something like this works:

# app/controllers/my_engine/documents_controller.rb

require_dependency MyEngine::Engine.root.join('app', 'controllers', 'my_engine', 'documents_controller').to_s

module MyEngine
class DocumentsController
def show
render :text => 'different'
end
end
end

## require vs require_dependency

require_dependency은 development모드에서는 load를 이용해서 파일을 읽고
production모드에서는 require로 파일을 읽음.

### require

루비의 메소드
한번 읽은 파일을 다시require하면 실행하지 않음
キャッシュ済みの場合はそちらを読み込む

### require_dependency

rails의 독자 메소드
한번 읽은 파일도 다시
キャッシュ済みであっても再読み込み（load)

Reference Link:

```
https://stackoverflow.com/questions/1457241/how-are-require-require-dependency-and-constants-reloading-related-in-railsss
https://railsguides.jp/autoloading_and_reloading_constants.html#require-dependency
http://d.hatena.ne.jp/sai-ou89/20081218/1208940536
https://stackoverflow.com/questions/1457241/how-are-require-require-dependency-and-constants-reloading-related-in-rails
http://www.cl9.info/entry/2015/03/10/233640
http://rochefort.hatenablog.com/entry/2016/10/29/134237
```
