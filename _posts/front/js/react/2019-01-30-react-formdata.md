---
layout: post
title: "react"
author: negabaro kim
categories: react
tags: react js
---

capitalize메소드는 제일 앞의 string값을 대문자로 바꿔주는 메소드

### 사용예)

![image](https://user-images.githubusercontent.com/4640346/51920682-3d2b0780-2429-11e9-82fe-03519c76a121.png)

![image](https://user-images.githubusercontent.com/4640346/51920772-62b81100-2429-11e9-80a8-d3996e872e5f.png)

React를 사용하다보면, 컴포넌트의 메소드에서 컴포넌트의 태그에 직접 접근하고 싶을 때가 있습니다. 그럴 때 사용하는 게 ref 속성입니다. 위의 컴포넌트에서 숨기기 버튼을 보면 ref 속성이 ref={(ref) => { this.hide = ref; }} 로 설정되어있습니다. 여기서 ref는 해당 태그 자신을 가리킵니다. this는 컴포넌트를 가리키고요. this.hide 속성에 자기를 대입하는 거죠

여기서 ref는 해당 태그 자신을 가리킵니다. this는 컴포넌트를 가리키고요. this.hide 속성에 자기를 대입하는 거죠.

{% highlight js %}
class ImageUpload extends React.Component {
state = {
file: "",
imagePreviewUrl: ""
};

\_handleSubmit = e => {
e.preventDefault();
// TODO: do something with -> this.state.file
const token = cookie.load("jwt");
//upateProfileImage(this.papa.files[0], token);
upateProfileImage(this.state.file, token);
console.log("\_handleSubmit e", e);
};

\_handleImageChange = e => {
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
            //ref={papa => (this.papa = papa)}
            onChange={this._handleImageChange}
          />
          <button type="submit" onClick={this._handleSubmit}>
            Upload Image22
          </button>
        </form>
        {!$imagePreview && <img src={imagePreviewUrl} />}

</div>
);
}
}
{% endhighlight %}

xxx
