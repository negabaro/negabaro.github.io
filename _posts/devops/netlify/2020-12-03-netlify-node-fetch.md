---
layout: post
title: "Netlify에서 node-fetch 사용시 주의사항"
author: negabaro kim
tags: devops/netlify
---

# 선 결론

Netlify에서 node-fetch사용시 `npm i encoding` 해주자


---

# 에러(Cannot find module 'encoding')

`netlify-lambda`를 이용해 Netlify Functions로직을 작성할때 
로컬에서는 node-fetch가 문제없이 동작하는데 디플로이시 아래와 같은 에러가 발생했다.

※ netlify-lambda에 대해 알고싶다면 [Netlify Functions에 대해 알아보자]를 참고

```
────────────────────────────────────────────────────────────────
10:17:36 AM:   Dependencies installation error                               
10:17:36 AM: ────────────────────────────────────────────────────────────────
10:17:36 AM: 
10:17:36 AM:   Error message
10:17:36 AM:   A Netlify Function failed to require one of its dependencies.
10:17:36 AM:   If the dependency is a Node module, please make sure it is present in the site's top-level "package.json".
  If it is a local file instead, please make sure the file exists and its filename is correctly spelled.
10:17:36 AM: 
10:17:36 AM:   In file "/opt/build/repo/dist/functions/index.js"
10:17:36 AM:   Cannot find module 'encoding'
10:17:36 AM:   Require stack:
10:17:36 AM:   - /opt/buildhome/.netlify-build-
```

# 원인

`Cannot find module 'encoding'` 포인트는 이 메시지인데 
이 에러의 원인은 아래와 같다.

```
A module my project depends on conditionally imports the encoding module, and also does not include encoding in it's own package.json. This resulted in my build (with netlify-lambda build) to succeed, but the zip (with @netlify/zip-it-and-ship-it) to not include encoding, so the import would fail.
One annoying thing is that I had to add encoding to my top-level package, which is my frontend app. Adding encoding only to the package.json in my functions folder still fails, probably because that's not where zip-it-and-ship-it is looking? Not sure 😕 I'll probably end up giving node-fetch the boot and use a different request client that hopefully doesn't necessitate this workaround!
```


node-fetch package자체에는 encoding패키지에 대한 디펜더시 설정이 되어있는데 
netlify상에서 디플로이시 동작하는 `@netlify/zip-it-and-ship-it`패키지에 encoding이 포함되어 있지 않아 동작하지 않는다고 한다.

그래서 로컬에서는 정상동작하고 netlify상에서 동작을 안했던거구나~

자세한 내용은 [Link]를 참조

# 해결방법

실제로 안쓰여도 netlify상에서 정상작동하게 하기위해 encoding을 추가해주자

```
npm i encoding
```

---

[Link]: https://github.com/netlify/netlify-lambda/issues/201#issuecomment-569453218

[Netlify Functions에 대해 알아보자]: https://negabaro.github.io/archive/netlify-functions