



- 改行を<br />タグに変更
- http or https://から始まる文字列をa linkで囲む
- エスケープしない


上記要件をクリアするため、以下の


```slim
- sj = safe_join(@notice.content.split("\n"),tag(:br))    
- txt = Rinku.auto_link(sj)
= txt.html_safe
```