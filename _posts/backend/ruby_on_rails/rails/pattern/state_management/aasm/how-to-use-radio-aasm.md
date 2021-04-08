
---
layout: post
title:  "Rails AASM로 상태 관리기능 만들기"
author: negabaro kim
categories: rails
tags:	css
cover:  "/assets/twice.jpg"
---


I would remove AASM::BASE#human_event_name(:event) but, for the moment, we could just use deprecate and delete it in version 5.0.0.


OrganizationNotice.human_attribute_name(:title)
=> "タイトル"

OrganizationNotice.aasm.states.map(&:name).map(&:to_s)
=> ["draft", "published", "limited_public"]
That's deprecated now. Use ClassName.aasm.states_for_select. 
 OrganizationNotice.aasm.states_for_select
=> [["Draft", "draft"], ["Published", "published"], ["Limited public", "limited_public"]]


f.input :text_sms, as: :radio, :label => "Receive sms",:collection => [ ['Yes','yes',{:checked => true}], ['No','no'] ]