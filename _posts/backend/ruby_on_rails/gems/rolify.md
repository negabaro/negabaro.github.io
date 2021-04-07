## rolify


# 특정조직의 유저 롤

self.add_role(:Leader, org)


# user.remove_role deletes the role from Role table
https://github.com/RolifyCommunity/rolify/issues/451

just found in source code:

```ruby
@@remove_role_if_empty = true
```

It is not mentioned in the readme.
You can have it in initializer:

```ruby
Rolify.configure do |config|
  config.remove_role_if_empty = false
end
```



# NG例

```ruby
org.univas_users.merge(OrganizationUnivasUser.approved).with_role([:PermitAdmin,:PermitEditor], org)
```

# OK例 with_roles사용

Forum.with_roles([:admin, :user], current_user)
Organization.with_role([:Univas,:Association])


직접 쿼리하기

```ruby
  def admin_editor_viewer_members
    UnivasUser
      .joins('INNER JOIN univas_users_roles ON univas_users_roles.univas_user_id = univas_users.id')
      .joins('INNER JOIN roles ON roles.id = univas_users_roles.role_id')
      .where(
        roles: {
          resource_type: 'Organization',
          resource_id: self.id,
          name: ['PermitAdmin', 'PermitEditor','PermitViewer'],
        }
      )
  end
```

[rolify github]: https://github.com/RolifyCommunity/rolify
