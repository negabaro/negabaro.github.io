JWT가 사과라면 OAuth는 사과 상자라고 볼 수 있는데, 다시말해 JWT는 Token의 한 형식이고, OAuth는 하나의 Framework이다.

여기서 framework라는 이유는
토큰을 요청하는 데 사용할 수 있어야하는 요청 및 응답의 순서와 형식만 있다.
각기 다른 시나리오에서 어떤 방식으로 권한 부여 유형을 얘기할지를 정한다.
그리고 JWT는 이러한 framework에서 발생하는 산출물로 볼 수 있다.
하지만 사람들이 비교하는 이유에 대해서 좀 더 살펴보면 auth framework을 통해 나온 산출물, 즉 OAuth Bearer token(이하 OAuth token)과 단순한 JWT는 분명한 차이가 있다.

---

https://dailyscat.gitbook.io/twis/network/jwt-oauth#:~:text=JWT%EA%B0%80%20%EC%82%AC%EA%B3%BC%EB%9D%BC%EB%A9%B4%20OAuth,%EB%8A%94%20%ED%95%98%EB%82%98%EC%9D%98%20Framework%EC%9D%B4%EB%8B%A4.&text=%ED%86%A0%ED%81%B0%EC%9D%84%20%EC%9A%94%EC%B2%AD%ED%95%98%EB%8A%94%20%EB%8D%B0,%EC%88%9C%EC%84%9C%EC%99%80%20%ED%98%95%EC%8B%9D%EB%A7%8C%20%EC%9E%88%EB%8B%A4.