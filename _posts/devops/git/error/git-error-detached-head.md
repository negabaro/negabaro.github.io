## Detached HEAD에러란?


```
If you want to create a new branch to retain commits you create, you may do so (now or later) by using -c with the switch command. Example
```


보통 브랜치(branch)는 특정 커밋(commit)의 revision number를 가리키고 HEAD가 이 브랜치를 가리킨다. 이렇게 HEAD -> 브랜치 -> 특정 커밋 순서로 commit을 가리키는 상태를 ‘attached HEAD’ 상태(state)라고 한다. 그리고, Detached HEAD란 HEAD가 브랜치를 통해 간접적으로 commit을 가리키지 않고, 직접 커밋을 가리키는 것을 말한다.

깃에서 HEAD는 1개 뿐이고, 이 HEAD는 현재 체크아웃(checkout)한 커밋을 가리킨다. 추가적인 작업을 위해 다른 브랜치를(깃 책들에서 자주 언급되는 예제 브랜치인 hotfix나 issue53같은) 체크아웃하면 HEAD는 체크아웃한 브랜치로 이동하며, 이 때 이전에 HEAD가 브랜치가 아닌 커밋을 직접가리키는 detached HEAD였다면 커밋의 revision number을 모르면 그 전으로 (쉽게) 돌아갈 수 없고, (기본적으로) 그래프에도 표시되지 않는다.

이런 명령어를 사용하면 detached HEAD 상태가 된다.


### 해결방법

```ruby
>git checkout -b <new branch name>
```




Detached HEAD란?

보통 브랜치(branch)는 특정 커밋(commit)의 revision number를 가리키고 HEAD가 이 브랜치를 가리킨다. 이렇게 HEAD -> 브랜치 -> 특정 커밋 순서로 commit을 가리키는 상태를 ‘attached HEAD’ 상태(state)라고 한다. 그리고, Detached HEAD란 HEAD가 브랜치를 통해 간접적으로 commit을 가리키지 않고, 직접 커밋을 가리키는 것을 말한다.

깃에서 HEAD는 1개 뿐이고, 이 HEAD는 현재 체크아웃(checkout)한 커밋을 가리킨다. 추가적인 작업을 위해 다른 브랜치를(깃 책들에서 자주 언급되는 예제 브랜치인 hotfix나 issue53같은) 체크아웃하면 HEAD는 체크아웃한 브랜치로 이동하며, 이 때 이전에 HEAD가 브랜치가 아닌 커밋을 직접가리키는 detached HEAD였다면 커밋의 revision number을 모르면 그 전으로 (쉽게) 돌아갈 수 없고, (기본적으로) 그래프에도 표시되지 않는다.

이런 명령어를 사용하면 detached HEAD 상태가 된다.


1
2
3
4
5
git checkout master^
git checkout HEAD~2
git checkout origin/master
git checkout <tag name>
git checkout <revision number>
커밋을 잃어버린 것인가?

커밋이 사라진 것은 아니다. 쉽게 돌아갈 수 없을 뿐 아래와 같은 명령어를 사용하면 내 HEAD가 이동했던 히스토리를 통해 이전 commit

을 찾아 다시 가볼 수 있다.



1
>git reflog
그리고, 기본적인 커밋 그래프에서는 보이지 않지만, 명령어를 잘 만들면 그래프에서도 볼 수도 있다.



1
>git log --graph --decorate $(git rev-list -g --all)
(윈도우 사용자라면 git bash에서 실행하자.)

그럼 문제 없는 거 아닌가?

깃은 브랜치를 통해 커밋들을 관리한다. 그리고 Detached HEAD 커밋은 브랜치에 연결되어 있지 않아 관리가 불가능하다. 그래프에서도 보이지 않고, 브랜치를 이동하면 사라진다. 그저, 찾을 방법이 있다는 것이다. 무엇이 문제인지 이해가 되지 않는 이유는 다른 VCS(버전 컨트롤 시스템)과 깃의 차이점을 이해하지 못하는 것에서 발생하는 것 같다. 다른 VCS에서 HEAD는 시간의 순서에 따라 가장 마지막에 한 커밋을 가리키지만, 깃에서는 현재 체크아웃한 변경사항을 가리키기 때문에 브랜치를 통해 연결되어 있지 않은 커밋은 사용할 수 없다.

그럼 어떻게 해야 하지?

브랜치를 만들면 된다. 아래의 명령어 한 줄이면 브랜치를 만들고, 커밋을 살릴 수있다.


1
>git checkout -b <new branch name>
깃이 권장하는 방법이기도 하고 이를 위해 브랜치 만드는 비용(저장공간이나 컴퓨팅 파워)가 저렴하다. 커밋은 브랜치에 하고 혹시 모르는 사이에 detached HEAD가 된 커밋은 브랜치를 따로 만들거나 기존 브랜치에 변경사항을 이동하도록 하자.
---

http://sunphiz.me/wp/archives/2266

http://blog.naver.com/PostView.nhn?blogId=nawoo&logNo=221026063923&redirect=Dlog&widgetTypeCall=true&directAccess=false