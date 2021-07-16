## git stash


### git stash pop

돌리면 문제는 git add되버림..

----

1. stash 의미
넣어두다. 저장해두다는 의미로 이해하면 됩니다.

2. 언제 사용하면 되는가?
1번 상황 : A라는 브랜치에서 작업을 하는 중인데 B라는 브랜치에 문제가 생겨 브랜치 B로 이동해서 작업해야 한다.
작업 중일 때 커밋을 하지 않고 체크아웃을 하게 되면 오류가 난다. 그런데 A라는 브랜치를 커밋 하기 싫을 경우
2번 상황 : 개발 브랜치에서 작업을 해야 하는데 마스터 브랜치에 작업을 했을 경우

위와 같은 경우 stash를 사용하여 해결할 수 있습니다.
stash는 현재 작업하고 있는 내용을 백업, 저장을 한다고 보면 됩니다.

3. 어떻게 사용하는가?
1번 상황일 경우
브랜치 A에서 stash 명령어로 현재 작업 내역을 저장합니다.

git stash
1
git stash
Saved working~ 이라는 메세지가 뜨고 현재 HEAD의 위치를 말해준다.
혹시 모르니 저장이 잘 되었는지 확인을 해보겠습니다.

git stash list
1
git stash list
위 명령어를 입력하면 내가 저장했던 목록이 보입니다.

다음 브랜치 b로 체크아웃을 해서 문제를 해결 한 후 브랜치 a로 돌아와서 작업한 내역을 불러와 계속 작업을 하려고 합니다.
먼저 리스트를 출력해서 확인을 해보겠습니다.

git stash list
1
git stash list
작업한 내용이 있는지 확인을 하고 pop 명령어를 통해 가져와 보겠습니다.
pop 명령어를 사용하면 마지막으로 stash 한 것을 불러올 수 있습니다.

git stash pop
1
git stash pop
저장했던 내용이 다시 돌아왔습니다.
다시 리스트를 출력해 보면 방금 불러온 리스트는 삭제가 됩니다.

이제 다시 작업을 진행하면 되겠습니다!

작업 내역을 불러올 때 apply 명령어를 사용할 수도 있습니다.

git stash apply
1
git stash apply
pop과 차이점은 pop을 사용해서 불러오게 되면 리스트에서 불러온 내용이 삭제가 되고,
apply를 사용하면 리스트에서 삭제되지 않고 내용만 불러올 수 있습니다.

2번 상황일 경우
1번 상황과 동일하게 작업을 하면 됩니다. 마스터 브랜치에서 저장한 내용을 다른 브랜치에서 불러온다고 보면 됩니다.

마스터 브랜치에서 stash 합니다.

git stash
1
git stash
다른 브랜치나, 새로운 작업 브랜치를 생성을 합니다.

새로운 브랜치에서 리스트를 출력해보면 마스터에서 저장한 내용을 확인할 수 있습니다.
마스터에서 저장한 내용을 불러오겠습니다.

git stash pop
1
git stash pop
마스터에서 작업했던 내용을 불러왔습니다.
이제 새로운 브랜치에서 계속 작업을 하면 됩니다!

stash로 곤란했던 상황을 해결할 수 있습니다. 유용한 기능입니다.

4. 명령어 정리
현재 작업을 저장하고 브랜치를 head로 돌립니다. save는 생략이 가능합니다.

git stash (save)
1
git stash (save)
저장 목록을 출력합니다.

git stash list
1
git stash list
가장 최근에 저장한 내역을 불러오고 리스트에서 내역을 삭제합니다.(pop과 차이점)

git stash pop
1
git stash pop
가장 최근에 저장한 내역을 불러오고 리스트에 내역을 남겨둡니다.

git stash apply
1
git stash apply
가장 최근에 저장한 내역을 삭제합니다.

git stash drop
1
git stash drop
stash@{0} 내역을 삭제합니다.

git stash drop stash@{0}
1
git stash drop stash@{0}
전체 stash list를 삭제합니다.

git stash clear
1
git stash clear



http://megaton111.cafe24.com/2018/04/12/git-stash/?ckattempt=1