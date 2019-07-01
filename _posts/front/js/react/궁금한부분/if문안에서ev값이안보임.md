```
  this.changeVideoId2 = async ev => {
      console.log("changeVideoId2 ev.target.value ", ev.target.value);
      const video_id = ev.target.value;
      //J2JsfqBXnk0
      const result = await checkValidationVideoId(ev.target.value);

      if (result) {
        //result.then
        //regrex
        //result status.code == 200
        //setState{()};
        //isPreViewVideo
        console.log("success isPreViewVideo ev.target.value", video_id);
        this.setState({ isPreViewVideo: true, video_id: video_id });
      } else {
        this.setState({ isPreViewVideo: false });
      }
    };
```

const video_id = ev.target.value;

이렇게 하면 괜찮은데 ev.target.value그대로 if문안에서 사용이안됨

```
if (result) {
  console.log("success isPreViewVideo ev.target.value", ev.target.value);  << 안나옴
  console.log("success isPreViewVideo video_id", video_id); << 정상
}
```

뭔가 착각한건가??
