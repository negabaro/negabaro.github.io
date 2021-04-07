

## 불 대수란?

하나의 명제가 참 또는 거짓인가를 판단하는 데 이용되는 수학적인 방법
영국의 수학자 불(G. Boole)에 의해 개발되었다.
논리회로를 간략화하여 표현할 때 불 대수가 사용된다.

논리설계를 위한 기본 수학! 1은 True, 0은 False 로 상징적인 의미입니다

## 목적

부울대수란, 디지털 시스템에서 논리설계를 할 때 필요한 기본적인 수학입니다. 주 목적은 논리게이트를 단순화 시키고 간략화 시키는데 있습니다. 논리설계를 위한 기본 수학! 1은 True, 0은 False 로 상징적인 의미입니다.

## 부울식

## 진리표


## 논리연산자(Logical Operators)
Name Symbol Meaning
 Negation(부정) ~ 혹은  Not
 Conjunction(논리곱) ∧ And
 Disjunction(논리합) ∨ Or
 Exclusive OR
(배타적논리합)
Exclusive OR
 Condition(조건) → If … then
 Bicondition(쌍방조건) ↔ If and only if( iff )

## 불 대수의 기본 공식

교환 법칙: A+B = B+A, AxB=BxA
결합 법칙: A + (B+C) = (A+B) + C, Ax(BxC) = (AxB)xC
분배 법칙: Ax(B+C) = AxB + AxC, A+BxC = (A+B)x(A+C)
멱등 법칙: A + A = A, AxA = A
보수 법칙: A+A' = 1, AxA' = 0
항등 법칙: A+0 = A, A+1 = 1, Ax0 = 0, Ax1 = A
콘센서스: AB + BC + CA' = AB + CA', (A+B)(B+C)(C+A') = (A+B)(C+A')
드모르강: (A+B)' = A'xB', (AxB)' = A'+B'
복원 법칙: (A')' = A

## 논리식의 간소화

불 대수의 기본 공식 이용하기
합의 곱 표현을 곱의 합 표현으로 변환한다.
공통 인수를 뽑아 묶는다.
멱등법칙, 보수법칙, 항등법칙 등의 기본 공식 형태로 유도하여 줄여나간다.

---
https://m.blog.naver.com/coolchacha/20041989915
https://m.blog.naver.com/PostView.nhn?blogId=tb_elec_engineer&logNo=220977936208&proxyReferer=https:%2F%2Fwww.google.com%2F
https://m.blog.naver.com/PostView.nhn?blogId=leeyunghuk1&logNo=220954771600&proxyReferer=https:%2F%2Fwww.google.com%2F
https://velog.io/@yewon-july/%EB%85%BC%EB%A6%AC%ED%9A%8C%EB%A1%9C%EB%B6%88-%EB%8C%80%EC%88%98