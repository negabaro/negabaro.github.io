---
layout: post
title: "slack에서 markdown table 그리는 방법"
author: negabaro kim
tags: slack
---

slack에서 markdown기능을 서포트하지 않아서 우리가 아는 markdown table을 그릴 수 없다.

이 포스트에서는 slack에서 markdown table과 비슷한 table을 구현하는 방법에 대해 알아보자.


## 방법1

테이블을 캡쳐해서 파일로 업로드한다.(귀찮으므로 피하고 싶다.)

## 방법2

슬랙에서 제공하는 [fileds]를 이용해 구현하는 방법이 있다.

fileds를 사용하면 border가 없고 `2 column테이블` 밖에 만들 수 없다는 문제가 있다. (그 이상 만들면 레이아웃이 깨짐)


## 방법3

[sample]과 같이 문자(monospace font)로 테이블을 만들어 본다.

markdown table과 가장 근접한 효과를 얻을 수 있다.



## 방법3이 가장 근접한 솔루션인데

방법3이 가장 근접한 솔루션인데 일일이 테이블 텍스트를 만드는게 귀찮다.

먼저 변수를 넣으려면

```js
monthly_numbers_str = f"```"
monthly_numbers_str += f"{"Month".ljust(7)}{"Users".ljust(7)}\n"

monthly_numbers_str += f"{"Jan".ljust(7)}{"15".ljust(7)}\n"
monthly_numbers_str += f"{"Feb".ljust(7)}{"19".ljust(7)}\n"
monthly_numbers_str += f"{"Mar".ljust(7)}{"30".ljust(7)}\n"
monthly_numbers_str += f"```"
```

이런식으로 해야한다. 행이나 열이 늘어갈때 유연하게 대응하기 어렵다. 

monospace font를 자동으로 생성해주는 javaascript OSS는 없을까?

있었다. [console-table] 과[markdown-table]가 있었는데 
markdown-table이 조금더 옵션이 많고 테이블과 비슷했기에 markdown-table을 사용했다.

## markdown-table

```npm i markdown-table```으로 설치후


아래와 같이 간단히 사용이 가능했다.

```js
import table from "markdown-table";

const t = table([
  ["Stock", "Price", "Change", "latest date"],
  [sym, price, changePer, date]
]);

const t2 = "```" + t + "```";
```

t2를 slack메시지 전송시 blocks에 담아주기만 하면 된다.

![image](https://user-images.githubusercontent.com/4640346/107134765-6647d200-6938-11eb-911b-98585e2d9a1f.png)







---
[fileds]: https://api.slack.com/messaging/composing/layouts#block-basics

[How to render tables in Slack
]: https://stackoverflow.com/questions/59006831/how-to-render-tables-in-slack
[Does Slack support Markdown tables]: https://stackoverflow.com/questions/55816333/does-slack-support-markdown-tables
[sample]: https://app.slack.com/block-kit-builder/T5LLAJ415#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22%60%60%60%20------------%20------------%20-----------%20%5Cn%7C%20Header%201%20%20%20%7C%20Header%202%20%20%20%7C%20Header%203%20%20%7C%5Cn%20============%20============%20===========%20%5Cn%7C%20body%20row%201%20%7C%20column%202%20%20%20%7C%20column%203%20%20%7C%5Cn%20------------%20------------%20-----------%20%60%60%60%22%7D%7D%5D%7D
[markdown-table]: https://github.com/wooorm/markdown-table

[Slack webhook html table
]:https://stackoverflow.com/questions/37080635/slack-webhook-html-table
[console-table]: https://github.com/bahmutov/console.table
