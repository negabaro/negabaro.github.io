---
layout: post
title:  "vscode에서 작업중인 파일을 커맨드로 크롬 브라우저에서 열기"
author: negabaro kim
categories: vscode
tags:	vscode
---

`cmmand+shift+P`  -> `Configure Task`입력 -> others선택해서 `tasks.json`을 열기

-> `tasks.json`을 이하내용으로 수정하고 저장

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "open",
            "type": "shell",
            "command": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            "args": [
                "${file}"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```


-> 브라우저에서 열고 싶은 파일을 탭에서 선택하고 `cmd+shift+B`
-> 해당 파일이 브라우저에서 열리면 성공!



### 참고:

http://it-engineer.hateblo.jp/entry/2018/12/24/172324
