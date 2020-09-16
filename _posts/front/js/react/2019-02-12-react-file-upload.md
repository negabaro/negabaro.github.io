---
layout: post
title: "react에서 파일업로드|image preview만들기|기존에 등록된 이미지 우선표시"
author: negabaro kim
categories: react
tags: react js
---

찾아본 결과 다음 2가지 패턴을 이용해서 파일업로드가 가능한듯 하다.

## 1. ref를 사용하는 방법

```js
import * as React from "react";
import { upateProfileImage } from "../../../../../../services/userApi";
import cookie from "react-cookies";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.upload22 = React.createRef();
  }

  _handleSubmit = e => {
    e.preventDefault();
    const token = cookie.load("jwt");
    upateProfileImage(this.upload22.current.files[0], token);
  };

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input type="file" ref={this.upload22} />
          <button type="submit">Upload Image22</button>
        </form>
      </div>
    );
  }
}
export default ImageUpload;
```

## 2. onChange와state를 이용하는 방법

```js
import * as React from "react";
import { upateProfileImage } from "../../../../../../services/userApi";
import cookie from "react-cookies";

class ImageUpload extends React.Component {

  state = {
    file: ""
  };

  _handleSubmit = e => {
    e.preventDefault();
    const token = cookie.load("jwt");
    upateProfileImage(this.state.file, token);
  };

  _handleImageChange = e => {
    e.preventDefault();

    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({ file: file });
    };
  };

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input
            type="file"
            onChange={this._handleImageChange}
          />
          <button type="submit">Upload Image22</button>
        </form>
      </div>
    );
  }
}
export default ImageUpload;
```

여기까지만 보면 어느 방법이라도 상관없어 보이는데 어떤 차이가 있는걸까..?
지인이 state에 file과 같은 형태의 오브젝트를 넣지 않는게 좋다면서 ref를 사용하는 패턴을 권했는데
Q/A사이트에 질문한 결과 state에 file오브젝트를 넣어도 문제 될 요소는 없다고 한다.

단,PureComponent사용시 state내 오브젝트가shallow comparison되기 때문에
리렌더링이 안될 가능성이 있다는것 정도? 하지만 PureComponent를 사용하지 않기에
상관 없을 듯하다.

## imagePreview 만들기

imagePreview도 onChange와state를 이용해서 구현가능하다.

```js
import * as React from "react";
import { upateProfileImage } from "../../../../../../services/userApi";
//https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513
import cookie from "react-cookies";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    file: "",
    imagePreviewUrl: ""
  };

  _handleSubmit = e => {
    e.preventDefault();
    const token = cookie.load("jwt");
    upateProfileImage(this.state.file, token);
  };

  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input
            type="file"
            onChange={this._handleImageChange}
          />
          <button type="submit">Upload Image22</button>
        </form>
        {!$imagePreview && <img src={imagePreviewUrl} />}
      </div>
    );
  }
}

export default ImageUpload;
```

FileReader 메소드의 onloadend,readAsDataURL을 이용해서 브라우저상에서 업로드한 data를 참조가능케 한다.

## 기존에 등록된 image가 있을경우 표시

한번 업로드한 이미지가 있다면 그이미지를 우선표시 해주고 싶을때는

업로드한 이미지가 있다(getImageUrl) && previewImage가 없다 조건에 만족하면 업로드된 image를 표시하는 조건으로 구현했다.

코드는 이하와 같다.

```js
{!$imagePreview && (
  <img src={getImageUrl && !imagePreviewUrl ? getImageUrl : imagePreviewUrl } />
)}
```

#### Reference Link:

```
https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

```
