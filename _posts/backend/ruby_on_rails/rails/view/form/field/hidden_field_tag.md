hidden_field_tagの場合
hidden_field_tag(要素名 [, 値, オプション])
例

<%= hidden_field_tag :name, "tsuchiya" %>
注)valueオプション不要

hidden_fieldの場合
hidden_field(オブジェクト名, プロパティ名 [, オプション])
例

<%= hidden_field :user, :username, value: "tsuchiya" %>