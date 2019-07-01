```
class Slider extends React.Component<Props> {
  //const is_first_time=true;
  is_first_time: boolean = true;
  componentDidMount() {
    console.log("@@@@@@@@@@@@@@@@componentDidMount", this.is_first_time);
    this.is_first_time = false;
  }
}
```

class밑에 const못쓰는 이유는??
