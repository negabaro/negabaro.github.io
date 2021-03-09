---
layout: post
title:  "rails에서 첨부파일 구현시 생각해볼것들"
author: negabaro kim
categories: rails
tags:	rails/view
---


디폴트 첨부파일을 사용하지 않고 디자인을 커스텀해서 첨부파일 구현시 생각해볼것들을 정리해본다.


## 사양

bulma template을 이용해 첨부파일을 구현


### 첨부파일

1. 파일을 첨부하면 첨부된 파일명을 오른쪽에 텍스트로 표시(혹은 이미지 섬네일을 만들어준다던가 이 포스트에서는 파일명만 표시)
2. 첨부된 파일이 없을땐 파일명을 지워줌

### 첨부파일 삭제버튼

디폴트 첨부기능에는 없지만 첨부파일을 삭제하는 버튼이 필요한 경우

1. 파일첨부시 해당파일을 삭제할 버튼을 생성
2. 파일첨부가 없을때 삭제버튼을 hidden처리


---

간단한 부분이어서 vue나react를 사용하지 않고 순수 javascript로 구현해봤다.

코드는 아래와 같음.


```ruby
.file.has-name
  label.file-label
    input.file-input(type="file" name="upload_file")
    span.file-cta
      span.file-icon
        i.fas.fa-upload
      span.file-label
        | 파일 첨부
    span.file-name
    button.delete#del-button(type="button" style="display: none")
```


```js
document.querySelector('.file-input').addEventListener('change',function(e){
  var files = document.querySelector('.file-input').files;
  if (files.length > 0) {
    //1. 첨부한 파일명을 표시
    const fileName = document.querySelector('.file-name');
    fileName.innerText = files[0].name;

    //2. 파일명 오른쪽에 첨부파일 삭제하는 버튼을 표시
    const delButton = document.getElementById("del-button");
    delButton.style.display = "inline-block";
  }
});
```


```js
const delButton = document.getElementById('del-button');
delButton.addEventListener('click',function(e){

  //1. 버튼을 숨김
  delButton.style.display = "none";
  //2. 첨부한 파일 삭제
  document.querySelector('.file-input').value = "";
  //3. 첨부한 파일명 삭제
  const fileName = document.querySelector('.file-name');
  fileName.innerText = "";
});
```

## 완성된 화면

[![Image from Gyazo](https://i.gyazo.com/d2f1fa03ddf70b79c6e12736a8e3dbdd.gif)](https://gyazo.com/d2f1fa03ddf70b79c6e12736a8e3dbdd)

---

## 메모

### multipart: true

첨부파일이 있을땐 form_for의 옵션에 multipart: true를 설정해줘야 한다.

### 첨부파일이 존재하느냐 판별

`input type="file"`돔의 files의 크기가 0 보다 높다면 첨부파일이 존재하는걸로 판단


```js
var files = document.querySelector('.file-input').files;
if (files.length > 0){
  ...
}
```

### 첨부파일을 지울땐

value값에 ""을 넣어주면 된다.

```js
document.querySelector('.file-input').value = "";
```

### 버튼 표시 숨김

`display: none`옵션을 넣어주고 이벤트 발생시 해당 돔의 display에 `inline-block`을 넣어주는 방식을 사용했다.

block을 사용해도 되는 이번엔 같은행에 버튼을 표시하기 위해 inline-block을 사용

