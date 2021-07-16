## git revert와 reset의 차이

차이점은 reset은 시간을 과거의 특정 사건으로 되돌린다고 생각하고 revert는 현재에 있으면서 과거 특정 사건들만을 없던 일로 만드는 거라고 생각하면 이해하기 쉽습니다

정리
다른 사람과 공유하는 브랜치에서 커밋 내역을 수정해야할 경우 git revert를 사용하자.

나 혼자 작업하는 브랜치에서는 git reset을 사용해도 문제 없다.

https://youngest-programming.tistory.com/220#:~:text=%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%80%20reset%EC%9D%80%20%EC%8B%9C%EA%B0%84,%EC%83%9D%EA%B0%81%ED%95%98%EB%A9%B4%20%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0%20%EC%89%BD%EC%8A%B5%EB%8B%88%EB%8B%A4.&text=reset%EC%9D%80%20%ED%8A%B9%EC%A0%95%20%EC%82%AC%EA%B1%B4%EC%9C%BC%EB%A1%9C,%EC%82%AC%EA%B1%B4%EB%93%A4%EC%9D%80%20%EB%AA%A8%EB%91%90%20%EC%82%AC%EB%9D%BC%EC%A7%91%EB%8B%88%EB%8B%A4.


https://velog.io/@sonypark/git-reset-vs-git-revert-%EC%B0%A8%EC%9D%B4