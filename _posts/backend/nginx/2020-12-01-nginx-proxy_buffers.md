---
layout: post
title: "nginx upstream sent too big header while reading response header from upstream에러"
author: negabaro kim
tags: nginx
---


특정 데이터에 대한 정보를 cookie에 저장하고 있었는데

해당 데이터가 많은 유저가 로그인시 아래와 같은 에러가 nginx에서 발생했다.

```
upstream sent too big header while reading response header from upstream
```

nginx -> rails(puma) 구성이었는데 rails에서는 200를 리턴하고 nginx가 rails에서 전달받은 헤더의 버퍼사이즈 보고 
위와 같은 에러를 발생시킴

# 해결방법

nginx에서 아래 설정을 2배로 늘려주자



```
proxy_buffers 8 32K; # default 8 4k|8k
proxy_buffer_size 32k; # default 4k|8k
proxy_busy_buffers_size 64k; # default 8k|16k
```


---

# 메모

ちなみにproxy_buffersですが実際にどれだけのサイズを使っているか調べる方法があります。
현재 운영중인 nginx의 proxy_buffers가 어느정도 사용중인지 확인하는 방법은 아래링크를 참고

[Nginx FastCGI response buffer sizes]

---

[Nginx FastCGI response buffer sizes]: https://gist.github.com/magnetikonline/11312172#determine-fastcgi-response-sizes%E3%82%88%E3%82%8A