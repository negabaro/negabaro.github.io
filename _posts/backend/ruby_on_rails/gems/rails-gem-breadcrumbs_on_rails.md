



# Gemfile

```ruby
gem 'breadcrumbs_on_rails'
```


# app/views/layouts/application.html.slim

```ruby
main
  = render_breadcrumbs builder: ::CustomBreadcrumbsBuilder
  = yield
```


# config/application.rb

```ruby
class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.autoload_paths += %W(/lib).map { |path| File.join(config.root, path) } # <<이 부분 추가
end
```

# lib/custom_breadcrumbs_builder.rb

```ruby
class CustomBreadcrumbsBuilder < BreadcrumbsOnRails::Breadcrumbs::Builder
  def render
    @context.render "/partials/breadcrumbs", elements: @elements
  end
end
```

# app/views/partials/_breadcrumbs.html.slim

```ruby
section.section.has-background-white-bis
  .container
    .uni-breadcrumb
      nav.breadcrumb.has-succeeds-separator.is-small aria-label="breadcrumbs"
        - if elements.present?
          ul
            //- binding.pry
            - elements[0..-2].each do |element|
              //- is_root = element.name == 'Home'
              //- li_class = is_root ? '' : 'is-active'
              - if element.path.present?
                li
                  //= link_to element.path
                    = element.name
                  - if element.name == 'Home'
                    = link_to element.path
                      span.icon.is-small
                        i.fas.fa-home aria-hidden="true"
                  - else
                    //- binding.pry
                    = link_to element.path
                      = element.name
              - else
                = element.name
              //span.divider
                | >
            li.is-active
              = elements.last.name
```

# controller

```ruby
class Front::ActionController < BaseController
  
  add_breadcrumb 'Home', :root
  #add_breadcrumb 'アイテム詳細',  Proc.new{ item_path(id: 'ss') }
  #add_breadcrumb 'アイテム詳細', Proc.new{ item_path(item_id: 'yy', id: 'xx') }
  #add_breadcrumb "Edit series", Proc.new{ shelf_label_series_path((:series_id => params[:series_id], :shop_id => params[:shop_id], :shelf_id => params[:shelf_id])) }
  def new
    add_breadcrumb 'アクション追加', Proc.new{ new_item_action_path(id: 'xx') }
  end

  def create
  end

end
```


add_breadcrumb 'Home', 'http://www.example.com'



 def set_article
      @article = Article.find(params[:article_id])
    end
    
    def add_breadcrumbs
      add_breadcrumb 'Articles', articles_path
      add_breadcrumb @article.title, @article
      add_breadcrumb 'Comments', article_comments_path(@article)
    end

    http://blue-ham-cake1024.hatenablog.com/entry/2012/10/20/Rails%E3%81%A7Twitter_Bootstrap%E3%81%AE%E3%83%91%E3%83%B3%E3%81%8F%E3%81%9A%E3%83%AA%E3%82%B9%E3%83%88%E3%82%92%E4%BD%BF%E3%81%86


# 커스텀 사용하지 않는 방법

app/views/songs/show.haml

= render_breadcrumbs :separator => ' > '
とするだけで



# params넘기는 법

```ruby
add_breadcrumb 'アイテム詳細',  Proc.new{ item_path(id: 'ss') }
```

이렇게하면 된다는데..

`undefined method `to_model' for #<Proc:0x00007fe9e28ac040>`
에러남 여기서 멈춤..


이것도 안됨..

add_breadcrumb accepts a Proc. In your example, you can just do this in your controller action:

add_breadcrumb "Edit series", Proc.new{ shelf_label_series_path((:series_id => params[:series_id], :shop_id => params[:shop_id], :shelf_id => params[:shelf_id])) }

https://stackoverflow.com/questions/46339107/how-to-use-path-with-parameters-in-breadcrumbs-on-rails



# uninitialized constant CustomBreadcrumbsBuilder

ここで1時間彷徨いました（汗

このエラー、「定数CustomBreadcrumbsBuilderが初期化されてないよ」と読めます。このクラスは先程のサイト様を拝見して作ったのでここでエラーが出ちゃうとどうしようかな、という感じ。

あれこれ調べていたらlib配下に作った自作クラスは標準では読み込んでくれないらしいですね。

lib配下を読み込んでくれるように、config/application.rbに以下を追記しました。

1
config.autoload_paths += %W(#{config.root}/lib)


[breadcrumbs_on_rails github]: https://github.com/weppos/breadcrumbs_on_rails