
```ruby
- UnivasUser.roles.reject{|k, _| _ == :Fan}.each_with_index do | b, i|
  label
    //- binding.pry
    //= current_user.role_list(@organization).pluck(:name).include?(b[0].to_s)
    = check_box_tag 'add_roles[]', b[1], curr dent_user.role_list(@organiza.pluck(:name).include?(b[1].to_s), id: "add_roles_#{i}"
    = b[0]
end
```

```ruby
def role_list(org)
  self.roles.where(resource_id: org.id)&.select {|f| !f.name.match(/^Permit/) }
end
```

check_box_tag 'accept'
# => <input id="accept" name="accept" type="checkbox" value="1" />

check_box_tag 'rock', 'rock music'
# => <input id="rock" name="rock" type="checkbox" value="rock music" />

check_box_tag 'receive_email', 'yes', true
# => <input checked="checked" id="receive_email" name="receive_email" type="checkbox" value="yes" />

check_box_tag 'tos', 'yes', false, class: 'accept_tos'
# => <input class="accept_tos" id="tos" name="tos" type="checkbox" value="yes" />

check_box_tag 'eula', 'accepted', false, disabled: true
# => <input disabled="disabled" id="eula" name="eula" type="checkbox" value="accepted" />


# check_box_tagヘルパーの使いどころ
check_boxヘルパーがモデルに基づかないチェックボックスに対応したことによって、実態としてモデルに基づくかどうかは関係なく、すべて「モデルに基づくチェックボックス」の書き方に統一されたということです。

このことによって、プログラムコードのかき分けが不要になるため、コードをシンプルにすることができ、「同じようなコードを書く必要がない」というメリットがあります。

しかし、その分、「モデルに基づかない」ことが分かりにくくなってしまっていますので、ミクロな意味での可読性は、下がってしまっています。

そのため、モデルに基づくチェックボックスとモデルに基づかないチェックボックスが混在している場合などは、敢えてcheck_box_tagヘルパーを使う方が良い場合もあるでしょう。


# disabled

<%= check_box_tag 'view_accounts', 'true', false, :disabled => true  %>


### reference:

https://apidock.com/rails/ActionView/Helpers/FormTagHelper/check_box_tag