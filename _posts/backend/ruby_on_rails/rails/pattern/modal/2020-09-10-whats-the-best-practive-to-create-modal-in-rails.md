---
layout: post
title:  "Rails에서 modal띄우는 방법"
author: negabaro kim
tags:	rails/tip
---

# 개요

이 포스트에서는 SPA프레임워크(vue,react)를 사용하지 않고 rails에서 모달을 띄우는 방법에 대해 알아보자.


# 기본정보

베이스 디자인은 bulma를 사용했다.

최대한 변수를 넘기지말고 link_to에 있는 정보를 활용


# 코드해설


show view와 modal view로 나눴다.

show view에 버튼(link_to)이 있고 해당 버튼 클릭시 modal view를 띄어준다.

그러므로 show view의 버튼id인 custom-modal-link를 modal view에 넘겨줬다.

modal view에서는 custom-modal-link를 가진 돔의 속성에서 data에 정의되어 있는 부분에서
각각 필요한 정보들을 추출해서 모달에 표시할 정보들을 정한다.



코드는 아래와 같다.


# view부분

```ruby
#app/views/member/show.slim
main
  = link_to "#", id: "custom-modal-link", data: { title: "xx", message: "#{member&.decorate&.v_full_name}멤버를 삭제하시겠습니까?", commit: '삭제', cancel: '캔슬', pmethod: 'put', href: update_member_status_path(organization_user: {user_approve_status: member.entity_id, update_approve_status: 3} ) }
    .button.is-danger.is-fullwidth.is-outlined
      span  멤버를 삭제
      span.icon.is-small
        i.fas.fa-times
= render partial: 'shared/custom_modal', locals: { button_id: 'custom-modal-link', modal_status: nil }
```

# 모달 부분

```ruby
#app/views/shared/_custom_modal.slim
.modal#custom-modal
  .modal-background
  .modal-card
    header.modal-card-head
      p.modal-card-title
      //  = title
    section.modal-card-body#custom-body
    //  = message
    footer.modal-card-foot
      .buttons.is-centered
        a.button.is-primary#commit-button
        button.button.is-primary.is-outlined#modal-cancel
javascript:
  const cml = document.getElementById('custom-modal-link');
  const status = false
  const modal = document.getElementById("custom-modal");
  if(!!status){
    modal.classList.toggle('is-active');
  }
  //title message-------------------------------------------------------
  //필요하면 추가
  //message-------------------------------------------------------------
  //cml.dataset.message
  const body = document.getElementById('custom-body');
  if(!!body){
    const message = document.createTextNode(cml.dataset.message);
    body.appendChild(message);
  }

  //target button-------------------------------------------------------
  const button = document.getElementById("#{escape_javascript(button_id)}");
  button.addEventListener('click', e => {
      event.preventDefault();
      modal.classList.toggle('is-active');
  });

  //cancel button-------------------------------------------------------
  const cancel = document.getElementById('modal-cancel');
  const cancelText = document.createTextNode(cml.dataset.cancel);
  cancel.appendChild(cancelText);
  cancel.addEventListener('click', e => {
      modal.classList.remove('is-active');
  });

  //commit button-------------------------------------------------------
  const commit = document.getElementById("commit-button");
  commit.href = cml.dataset.href;
  commit.dataset.method = cml.dataset.pmethod;
  const commitText = document.createTextNode(cml.dataset.commit);
  commit.appendChild(commitText);
```

# modal css

```css
.modal-card-body
  font-size: 12px
  h2
    margin: 20px 0
  ol
    margin: 20px 0 0 20px
    li
      ol
        margin: 10px 0
        li
          margin-left: 15px
```


# 메모

## 메모1

dom안의 data속성을 활용했는데 confirm이라는 속성을 사용하면 브라우저에서 사용하는 기본 모달(alert)가 표시되므로
사용하지 않도록 해야한다.

## 메모2

link_to를 클릭시 모달을 띄어줘야하므로 href부분은 #를 넣어줘 동작하지 않도록했다.

## 메모3

link_to 속성안이면 첫번째 인자가 아니더라도 routing_path가 가공(?)된다는걸 알았다.
data속성에 `href: update_member_status_path(organization_user: {user_approve_status: member.entity_id, update_approve_status: 3} )`를 지정하면 server side에서 href를 가공해
js에 넘겨준다.

그걸 받아서 모달의 commit액션에 추가해주기만 하면된다.
