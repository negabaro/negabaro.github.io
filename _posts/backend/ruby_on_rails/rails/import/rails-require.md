---
layout: post
title: "rails에서 모듈 읽어오는 방식"
author: negabaro kim
categories: rails
tags: rails
---

Rails には、require 関連で興味深い機能があります。

まず、自分で定義した Model や Controller などの Class は、Rails が自動的に require 対象としてくれます。いちいち require を書く必要がありません。

その上で、上記以外で何らかの機能を Rails アプリに追加したい場合、Rails 4 までは以下のようにするのが定石でした。

まずに以下の記述を追加し、lib フォルダを autoload 対象に追加します。

# config/application.rb

config.autoload_paths += %W(#{config.root}/lib)
この設定をしたうえで、lib フォルダ内に Rails の規約に沿ったファイル名で任意の処理を実装すれば、Rails によってオートロード対象になります。

5.6 Autoloading is Disabled After Booting in the Production Environment
Autoloading is now disabled after booting in the production environment by default.

Eager loading the application is part of the boot process, so top-level constants are fine and are still autoloaded, no need to require their files.

Constants in deeper places only executed at runtime, like regular method bodies, are also fine because the file defining them will have been eager loaded while booting.

For the vast majority of applications this change needs no action. But in the very rare event that your application needs autoloading while running in production mode, set Rails.application.config.enable_dependency_loading to true.

#### Reference Link:

```
http://system.blog.uuum.jp/entry/2016/08/10/110000
https://qiita.com/IKEA_dless/items/357d0234d3548a9ccb09
http://banker0507.blogspot.com/2013/09/railsmodulecontroller.html
https://qiita.com/joooee0000/items/3ab0f3d791e0d0beb639
```
