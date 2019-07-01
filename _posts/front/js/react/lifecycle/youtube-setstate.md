```
class PlayYouTube extends React.Component<Props, State> {
  state = {
    player: null,
    duration: null,
    videoReady: null
  };

  onPlayerStateChange = (YT, evt) => {
    const { player } = this.state;
    if (evt.data == YT.PlayerState.ENDED) {
      console.log("YT.PlayerState.ENDE");
      console.log(this.state.player);
      player.loadVideoById({
        videoId: this.props.video_id,
        startSeconds: this.props.start_time || 0,
        endSeconds: this.props.end_time || player.getDuration()
      });
    }
  };

  playClipYoutube = () => {
    let YouTubeIframeLoader = require("youtube-iframe");
    YouTubeIframeLoader.load(YT => {
      const player = new YT.Player("player", {
        videoId: this.props.video_id,
        events: {
          onStateChange: e => {
            this.onPlayerStateChange(YT, e);
          },
          onReady: () => {
            player.loadVideoById({
              videoId: this.props.video_id,
              startSeconds: this.props.start_time || 0,
              endSeconds: this.props.end_time || player.getDuration()
            });
            this.setState({
              videoReady: true,
              player: player
            });
            this.props.setVideoReady({ video_ready: true });
          }
        }
      });

      this.props.setPlayer({ player: player });
    });
  };

  async getDuration3() {
    const res = await getDuration2(this.props.video_id);
    this.props.setDuration({ duration: res });
    this.setState({ duration: res });
    return res;
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getDuration3();
    this.playClipYoutube();
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
  }*/

  render() {
    console.log("render()");
    const is_player_open = this.props.video_id;
    return (
      <React.Fragment>{is_player_open && <div id="player" />}</React.Fragment>
    );
  }
}
```

setState하면 현재 컴퍼넌트가 리렌더링한다고 하는데

```
componentDidMount -> playClipYoutube -> event -> onReady -> setState(player)했는데
                                     -> event -> onStateChange -> onPlayerStateChange(YT, e) -> state.player사용
```

render()밑에 console.log가 표시되지않는다

```
  shouldComponentUpdate(nextProps, nextState) {
    Log("shouldComponentUpdate");
    //return true;
    return false;
  }
```

```
  shouldComponentUpdate(nextProps, nextState) {
    Log("shouldComponentUpdate");
    //return true;
    return true;
  }
```

어느쪽도 shouldComponentUpdate로그도 안나오는 상황

여기까지 동작을 보면
setState에 의한 렌더링 보다 event onStateChange가 우선되는 상황이라고 봐야하는건가??

onPlayerStateChange이걸 지워봐도 재생만 안되지 렌더링은 없음...뭐지....??

render 에 버튼을 만들고 해당 버튼 클릭시 setState를 하면 shouldComponentUpdate로그도 가 불려지는거 확인

즉..?componentDidMount -> setState 안불려짐

render -> setState 하면 shouldComponentUpdate 불려진다는 결론이 나옴
