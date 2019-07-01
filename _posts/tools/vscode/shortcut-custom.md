---
layout: post
title: "vscode 디렉토리,파일 생성 단축키 커스텀"
author: negabaro kim
categories: vscode
tags: vscode
---

필자의 경우 디렉토리별로 다양한 카테고리의 파일을 생성하는데 마우스
vscode에서 새로운 파일을 생성하는 cmd + n은 어느 디렉토리에도 속하지 않고 저장할때 디렉토리를 지정해야 하는데
필자의 경우 디렉토리가 많아서 저장하는데 어려움이 있다.

추가하고 싶은 디렉토리를 선택하고 해당 디렉토리에 파일을 추가하려면 어떻게 해야할까?

cmd+shift+p type key and hit enter on Preferences: Open Keyboard Shortcuts File

후에 keybindings.json에 이하와 같이 추가해주면

추가하고 싶은 디렉토리 선택후 -> ctrl+n -> 해당 디렉토리에 파일 추가됨

추가하고 싶은 디렉토리 선택후 -> ctrl+shift+n -> 해당 디렉토리에 디렉토리 추가됨

```
// Place your key bindings in this file to overwrite the defaults
[
  {
    "key": "ctrl+n",
    "command": "explorer.newFile",
    "when": "explorerViewletFocus"
  },
  {
    "key": "ctrl+shift+n",
    "command": "explorer.newFolder",
    "when": "explorerViewletFocus"
  }
]
```

### Reference Link:

https://stackoverflow.com/questions/39599514/vs-code-add-a-new-file-under-the-selected-working-directory
