DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

he above error occurred in the <MyApp> component:
in MyApp (created by AppWithRedux)
in AppWithRedux

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://fb.me/react-error-boundaries to learn more about error boundaries.

Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

https://teratail.com/questions/58189

---

If state is true to play yotube video, and it is false i would like to delete youtube playing.
MY code is as follows.

```
{this.state.isPreViewVideo && <PlayYouTube video_id="ScSn235gQx0" />}
```

sandbox url:
https://codesandbox.io/s/xryoz10k6o

Reproduction method:

If 4-digit characters are included in input form, "isPreViewVideo: true" by setState and if it is less than false

It works fine when state is true,
but when state is false, I encounter this error as follows.

```
DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
```

is there a way to avoid or resolve this error?

https://stackoverflow.com/questions/54880669/react-domexception-failed-to-execute-removechild-on-node-the-node-to-be-re

In playYouTube.tsx line 78 replace <React.Fragment>...</React.Fragment> with <div>...</div>

Fragments let you group a list of children without adding extra nodes to the DOM.

This explains the error Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

More on fragments here https://reactjs.org/docs/fragments.html
