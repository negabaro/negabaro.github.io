## clean

untracked 파일 삭제하기
git clean 명령은 추적 중이지 않은 파일만 지우는 게 기본 동작이다. 즉, .gitignore 에 명시하여 무시되는 파일은 지우지 않는다.

$ git clean -f // 디렉터리를 제외한 파일들만 삭제
$ git clean -f -d // 디렉터리까지 삭제
$ git clean -f -d -x // 무시된 파일까지 삭제
TIP option
-d 옵션
디렉터리까지 지우는 것
-x 옵션
무시된 파일(.DS_Store나 .gitignore에 등록한 확장자 파일들)까지 모두 지우는 것
Ex) .o 파일 같은 빌드 파일까지도 지울 수 있다.
-n 옵션
가상으로 실행해보고 어떤 파일들이 지워질지 알려주는 것
https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html