```
   const updateFieldEvent = key => ev =>
      this.props.onUpdateField({key, ev.target.value});

     // this.props.onUpdateField(key, ev.target.value);
    this.changeVideoId = updateFieldEvent("video_id:");
    //this.changeStartTime = updateFieldEvent("start_time");
```

key라는 인자에 video_id: 를 넘겨서 그대로 쓸수있냐라는 질문
