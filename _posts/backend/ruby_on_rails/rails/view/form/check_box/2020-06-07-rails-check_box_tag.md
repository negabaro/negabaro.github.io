




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