
## tag.attributes
⚓ 新機能: ERBでHashをHTML属性に変換できるようにする
PR: Transform Hash into HTML atrributes for ERB interpolation by seanpdoyle · Pull Request #40657 · rails/rails
ERBで以下のようにHashをHTML属性に変換して展開可能にする。

<input <%= tag.attributes(type: :text, aria: { label: "Search" }) %>>
<%# => <input type="text" aria-label="Search"> %>
ActionView::Helpers::TagHelper#tag_optionsの実装を利用してERBと属性変換を組み合わることで、テンプレートでHTML文字列をtagやcontent_tagで置き換えなくてもやれるようにする。
同PRより大意

つっつきボイス:「attributesヘルパーメソッドが追加されたんですね↓」「上のようにハッシュをHTML属性として展開するのは前からできてたような気もしたけど、あれはSlimの書き方だったか」「ERBでもこれが使えるようになったのはいいですね👍」

# actionview/lib/action_view/helpers/tag_helper.rb#L56
+       def attributes(attributes)
+         tag_options(attributes.to_h).to_s.strip.html_safe
+       end


https://techracho.bpsinc.jp/hachi8833/2020_12_08/101364