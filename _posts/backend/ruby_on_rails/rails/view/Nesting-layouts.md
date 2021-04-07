
 feel the view system is lacking simple a system to just create a “sub layout”. Intuitively its pretty simple, but the guide for it is a bit rough i find: Layouts and Rendering in Rails — Ruby on Rails Guides

I mean, lets say i want an “administration” layout. It would be like application, but have an extra menu within the yield of the “application” layout.

In my mind, this is what I would want to do:

<%= extends :application do %>
  # Put my menu here
  = yield
<% end %>
The guide currently suggests using content_for?(:content) ? yield(:content) : yield in the application layout, and then using content_for and <%= render template: "layouts/application" %> in the sub layout. But the extends approach seems much more intuitive to me.

The big advantage of extends above is that parent layout wouldn’t have to care / be modified.

A gem exists which does this. It seems to still work in Rails 6, but it hasn’t been changed since 2016. The code for the feature is 7 lines: nestive/layout_helper.rb at master · rwz/nestive · GitHub

With this feature, think of how simple the guide for nested layouts would be. Layouts and Rendering in Rails — Ruby on Rails Guides It would should an example of extend and then mention that if modifications to the content of the application layout are needed, they should look at the content_for method.

Any thoughts? I’d be happy to look into making a PR if feedback is positive

2



created
5d
last reply
3d
4
replies
83
views
4
users
3
likes


Eric Anderson
Eric_Anderson1
4d
What about using the block form of render with the layout option. So:

<%= render layout: 'administration' do %>
  My admin content
<% end %>
Then in administration.html.erb:

# Put my menu here
yield
This is documented on the render helper. This seems to be existing functionality that accomplishes what you want.

I wonder if the Guides should be updated to suggest this approach rather than the content_for approach?

1



Maxime Handfield Lapointe
Maxime_Handfield_Lap
4d
Interesting, I was not aware of that feature.

I will need to try to it be sure, but my initial understanding of the doc (which oddly is not on render, but on _layout_for ) is that using this approach would break the interaction of yield / content_for. So if the “application” layout does yield :side_bar, that would just call the block passed by the “administration” with the argument :side_bar, which without specific handling in that block, would just print “My admin content” again…

I will try it out tomorrow when I’m at work.




Jonathan Allard
joallard
4d
Actually, thats the one thing I’ve always thought Middleman got better than Rails: instead of eg, calling ‘render :admin’ in the general layout, you would ‘wrap_layout :application’ inside the specific (admin) one. It’s much more ergonomic this way.




akaspick
3d
I just use the partial and layout options together…

render partial: 'list', layout: 'list_layout'








https://discuss.rubyonrails.org/t/nesting-layouts/75756