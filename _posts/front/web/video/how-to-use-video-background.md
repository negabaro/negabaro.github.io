背景に動画を表示する方法
最後におまけで背景全体に動画を表示する方法を解説します。

親要素いっぱいに動画のサイズを広げて.textという文字の入ったdiv要素をabsoluteで浮かせて動画の上に載せるイメージです。背景に常に固定して動画を流す方法ではなく「このサイト」のようにページの背景の一部を動画にする場合に使用することができます。

html css

```html
<div class="wrap-video">
  
  <div class="text">
    <p>full screen video !</p>
    <p class="headline">背景に動画を表示してみる</p>
  </div>
  
  <video src="video.mp4" muted autoplay loop></video>

</div>
```

https://webliker.info/52510/
