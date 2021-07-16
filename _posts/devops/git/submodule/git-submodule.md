## git submodule

우선 .gitmodules 파일이 만들어졌다. 이 파일은 서브디렉토리와 하위 프로젝트 URL의 매핑 정보를 담은 설정파일이다.

[submodule "DbConnector"]
    path = DbConnector
    url = https://github.com/chaconinc/DbConnector
서브모듈 개수만큼 이 항목이 생긴다. 이 파일도 .gitignore 파일처럼 버전을 관리한다. 다른 파일처럼 Push 하고 Pull 한다. 이 프로젝트를 Clone 하는 사람은 .gitmodules 파일을 보고 어떤 서브모듈 프로젝트가 있는지 알 수 있다.

노트
gitmodules 파일에 있는 URL은 조건에 맞는 사람이면 누구든지 Clone 하고 Fetch 할 수 있도록 접근할 수 있어야 한다.
예를 들어 다른 사람이 Pull을 하는 URL과 라이브러리의 작업을 Push 하는 URL이 서로 다른 상황이라면 Pull URL이 모든 사람에게 접근 가능한 URL이어야 한다. 이러면 서브모듈 URL 설정을 덮어쓰기 해서 사용할 수 있는데 git config submodule.DbConnector.url PRIVATE_URL 명령으로 다른 사람과는 다른 서브모듈 URL을 사용할 수 있다. URL을 상대경로로 적을 수 있으면 상대경로를 사용하는 것이 낫다.


DbConnector 디렉토리의 모드는 `160000`이다. Git에게 있어 160000 모드는 일반적인 파일이나 디렉토리가 아니라 특별하다는 의미다.

끝으로, Push 한다.

$ git push origin master
서브모듈 포함한 프로젝트 Clone
서브모듈을 포함하는 프로젝트를 Clone 하는 예제를 살펴본다. 이런 프로젝트를 Clone 하면 기본적으로 서브모듈 디렉토리는 빈 디렉토리이다.

분명히 DbConnector 디렉토리는 있지만 비어 있다. 서브모듈에 관련된 두 명령을 실행해야 완전히 Clone 과정이 끝난다. 먼저 git submodule init 명령을 실행하면 서브모듈 정보를 기반으로 로컬 환경설정 파일이 준비된다. 이후 git submodule update 명령으로 서브모듈의 리모트 저장소에서 데이터를 가져오고 서브모듈을 포함한 프로젝트의 현재 스냅샷에서 Checkout 해야 할 커밋 정보를 가져와서 서브모듈 프로젝트에 대한 Checkout을 한다.

DbConnector 디렉토리는 마지막으로 커밋을 했던 상태로 복원된다.

하지만, 같은 과정을 더 간단하게 실행하는 방법도 있다. 메인 프로젝트를 Clone 할 때 git clone 명령 뒤에 --recurse-submodules 옵션을 붙이면 서브모듈을 자동으로 초기화하고 업데이트한다.

---

リポジトリ内に別のリポジトリ
リポジトリ内で別のリポジトリを管理したいとき．特定のcommitを参照できます．

リポジトリにサブモジュールを追加する
git submodule add (リモートリポジトリのurl) (必要ならディレクトリ名)
.gitmodules にそのサブモジュールの情報が入ります．

別のローカルリポジトリで，追加済みのサブモジュールを追加する
git submodule update -i
リポジトリ内のサブモジュールを全てmergeする 大元のリポジトリでgit pullするとサブモジュールのリポジトリもfetchのみされるので，それを全て一括mergeしたい場合
git submodule foreach git merge
- サブモジュールを最新のブランチにする（全てgit pullする）
git submodule foreach git pull origin master
(参考)
-- https://qiita.com/sotarok/items/0d525e568a6088f6f6bb
-- https://qiita.com/kinpira/items/3309eb2e5a9a422199e9

submoduleで複数のリモートリポジトリ
同様にsubmoduleのリポジトリ内で

git remote set-url origin --add (2つめのリモートリポジトリのurl)
してやればよい．（大元のリポジトリの）.git/modules/hoge/configに.git/configと同様の情報がある．

---

https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88


https://sgc109.github.io/2020/07/16/git-submodule/#:~:text=Git%20%EC%9D%98%20%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88(Submodule)%20%EC%9D%B4%EB%9E%80%20%ED%95%98%EB%82%98%EC%9D%98%20%EC%A0%80%EC%9E%A5%EC%86%8C%20%EC%95%88%EC%97%90,%EB%AA%A8%EB%93%88%EB%A1%9C%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B2%8C%20%EB%90%9C%EB%8B%A4.
https://qiita.com/momomo_rimoto/items/30a95e457724746521c2