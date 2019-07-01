초기화를 안하고 redux의 item을 컴퍼넌트에서 쓰려하면 undefined이기때문에 쓸수없다

```
item: { keke: null }
```

이런식으로 적당한거 넣어서 초기화를 추가해줘서 해결

undefined은 안되기때문에 해결

```

//item: { keke: null } 가없으면 초기에 리덕스 item을 받아도  item이 undefined 라서 안에서 값을 못읽는다.
const initialState = { is_modal_open: false, item: { keke: null } };
export default (state = initialState, action) => {
  console.log("reducer app", action.player);
  switch (action.type) {
    case IS_MODAL_OPEN:
      return { ...state, is_modal_open: action.is_modal_open };
    case SET_ITEM_TO_RDX:
      //return { ...state, item: action.item };
      /*
      console.log(
        "!!!!!!!!!!!!!!!!!!! SET_ITEM_TO_RDX action.item",
        action.item
      );
    */

      return { ...state, item: { ...state.item, ...action.item } };
    //return { ...state, item: action.item  };
    case SET_VIDEO_READY:
      return { ...state, video_ready: action.vi };
    case SET_DURATION:
      return { ...state, duration: action.sd };
    case SET_PLAYER:
      console.log("BBBBBBBBBBBBBBBBB SET_PLAYER action.player", action.player);

      return { ...state, player: action.player };
    default:
      return state;
  }
};

```
