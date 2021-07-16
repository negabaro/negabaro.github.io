## git add,commit,push 취소하기

### git add취소 하는방법

이때, git reset HEAD [file] 명령어를 통해 git add를 취소할 수 있다.

뒤에 파일명이 없으면 add한 파일 전체를 취소한다.
CONTRIBUTING.md 파일을 Unstaged 상태로 변경해보자.
// CONTRIBUTING.md 파일을 Unstage로 변경한다.
$ git reset HEAD CONTRIBUTING.md
Unstaged changes after reset:
M	CONTRIBUTING.md
https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html



### git commit취소 하는방법

어떤 파일을 빼먹고 commit한 경우 이때, git reset HEAD^ 명령어를 통해 git commit을 취소할 수 있다.
// commit 목록 확인
$ git log
// [방법 1] commit을 취소하고 해당 파일들은 staged 상태로 워킹 디렉터리에 보존
$ git reset --soft HEAD^
// [방법 2] commit을 취소하고 해당 파일들은 unstaged 상태로 워킹 디렉터리에 보존
$ git reset --mixed HEAD^ // 기본 옵션
$ git reset HEAD^ // 위와 동일
$ git reset HEAD~2 // 마지막 2개의 commit을 취소
// [방법 3] commit을 취소하고 해당 파일들은 unstaged 상태로 워킹 디렉터리에서 삭제
$ git reset --hard HEAD^
https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html

### git push취소 하는방법

이 명령을 사용하면 자신의 local의 내용을 remote에 강제로 덮어쓰기를 하는 것이기 때문에 주의해야 한다.
되돌아간 commit 이후의 모든 commit 정보가 사라지기 때문에 주의해야 한다.
특히, 협업 프로젝트에서는 동기화 문제가 발생할 수 있으므로 팀원과 상의 후 진행하는 것이 좋다.
워킹 디렉터리에서 commit 되돌린다.
가장 최근의 commit을 취소하고 워킹 디렉터리를 되돌린다.
// 가장 최근의 commit을 취소 (기본 옵션: --mixed)
$ git reset HEAD^
원하는 시점으로 워킹 디렉터리를 되돌린다.
// Reflog(브랜치와 HEAD가 지난 몇 달 동안에 가리켰었던 커밋) 목록 확인
$ git reflog 또는 $ git log -g
// 원하는 시점으로 워킹 디렉터리를 되돌린다.
$ git reset HEAD@{number} 또는 $ git reset [commit id]
되돌려진 상태에서 다시 commit을 한다.
$ git commit -m "Write commit messages"
원격 저장소에 강제로 push 한다.
$ git push origin [branch name] -f
또는
$ git push origin +[branch name]
// Ex) master branch를 원격 저장소(origin)에 강제로 push
$ git push origin +master
https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html

---

[git add 취소하기, git commit 취소하기, git push 취소하기]: https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html