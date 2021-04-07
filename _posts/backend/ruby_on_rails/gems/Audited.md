

# update_all사용시 audited 레코드가 추가안되는 문제

update_all은 Active Record callbacks을 거치지 않으므로 audited갱신 안되는게 당연함

Not sure if this is a bug or designed this way, but when I update an audited field on a active record relation using update_all, I am not getting audits created. Let me know if you need more info. I am using 4.2.

@domcleal
 
Collaborator
domcleal commented on 30 May 2017
I think this is reasonably documented in ActiveRecord: "It does not instantiate the involved models and it does not trigger Active Record callbacks". The audited gem is an AR extension so it does need the models and callbacks to work - performing an update directly against the database or with SQL-only methods like update_all won't create audits.

To get auditing support, you'll need to instantiate the models, i.e. relation.find_each { |model| m.update_attributes(..) }



https://qiita.com/yutaro50/items/96138a730a3eee812aa0
[update_all]: https://github.com/collectiveidea/audited/issues/352