---
layout: post
title: "[미국주식 REST API] ALPHA VANTAGE에 대해서"
author: negabaro kim
tags: openapi/alphavantage
---

# ALPHA VANTAGE란?

REST형식으로 미국주식 정보를 가져올 수 있다.

무료로 사용이 가능하다.(회원가입후 free api key를 받아서 사용가능)

![image](https://user-images.githubusercontent.com/4640346/101610638-de367080-3a4b-11eb-8936-cd87b5d55119.png)


# 장점

무료!!

REST API이므로 실행환경에 의존하지 않고 실행가능

[도큐멘트]가 읽기쉽다.(왜인지 모르겠지만 IBM주식을 예제로 apikey없이 간단히 레스폰스를 확인할 수 있어서 좋았다.)

단순 주가뿐만 아니라 기업정보(Fundamental Data)랑 기술적지표(Technical Indicators)도 확인할 수 있다.

# 단점

주가정보(Time Series Stock APIs) 같은 경우 실시간 데이터를 확인할 수 없다.(가장 치명적)
하루전 데이터만 볼 수 있음.

개장폐장 시간이 없는 `Foreign Exchange (FX)`나 `Digital & Crypto Currencies`는 실시간 정보를 확인할 수 있는것 같다.

```
This API returns the realtime exchange rate for any pair of digital currency (e.g., Bitcoin) or physical currency (e.g., USD).
```


---

# 메모

## 도큐멘트

[도큐멘트]를 보면 아래 5가지 레이어로 나누어져 있는데

```
1. Time Series Stock APIs
2. Fundamental Data
3. Foreign Exchange (FX)
4. Digital & Crypto Currencies
5. Technical Indicators
```

자주 사용되는 부분은 `High Uses`라고 표기되어 있어서 보기편함


## api key없어도 됨??(버그?)

api key에 `undefined`넣어도 실행됨 ㅋㅋ 뭐지


## 주의사항

예전 가격정책과 현재 정책이 바뀐듯하다.
그로인해 잘못된 정보들이 있었다. 예를들어 실시간으로 stock data확인이 가능하다는 등


[Best 5 free stock market APIs in 2020]를 보면 Alpha Vantage를 아래와 같이 소개하고 있다.

![image](https://user-images.githubusercontent.com/4640346/101610038-0bceea00-3a4b-11eb-8c67-40e739c6cedd.png)

```
Alpha Vantage Inc. is a leading provider of various free APIs. It provides APIs to gain access to historical and real-time stock data, FX-data, and cryptocurrency data.
With Alphavantage you can perform up to 5 API-requests per minute and 500 API requests per day. 30 API requests per minute with $29.9/month.
```

톱 페이지에서도 리얼타임을 언급하는걸 보면 예전에는 실시간 데이터도 확인이 가능했던것 같다.

현재 톱페이지는 아래와 같음(리얼타임 언급이 사라짐)

![image](https://user-images.githubusercontent.com/4640346/101610638-de367080-3a4b-11eb-8936-cd87b5d55119.png)

## symbol이 틀려도 apikey없다고 에러가나옴

symbol값 지정이 잘못되거나 파라메터가 틀려도 일률적으로 아래와 같은 메시지가 나오므로 주의가 필요

```
{
    "Error Message": "the parameter apikey is invalid or missing. Please claim your free API key on (https://www.alphavantage.co/support/#api-key). It should take less than 20 seconds."
}
```

## 실시간 데이터

도큐멘트에 실시간 데이터가 필요하다면 `Polygon.io`를 사용하라고 권하고 있다.

제휴관계에 있는듯?

```
If you are interested in realtime intraday data for US stocks and ETFs, we have partnered with Polygon.io, a leading provider of realtime market data that counts Google and Robinhood as its customers. Specifically, this Intraday Time Series API maps directly to Polygon's Aggregates API.

Alpha Vantage users will enjoy a lifetime 10% discount for their Polygon subscriptions. To unlock the discount, simply sign up for Polygon using your Alpha Vantage user email and enter the code ALPHAV on the subscription page.
```

---

[Best 5 free stock market APIs in 2020]를 참고

[도큐멘트]: https://www.alphavantage.co/documentation/

[Best 5 free stock market APIs in 2020]: https://towardsdatascience.com/best-5-free-stock-market-apis-in-2019-ad91dddec984
