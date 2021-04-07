Snowflakeは一般的なMPP(Massively Parallel Processing=超並列処理)と比較して以下の点で優れている。
【性能上のメリット】
・コンピュートリソースとストレージリソースを分離しており、複数のワークロードを競合なく、同時に処理できる
・停止しなくても瞬時にスケールアップ・スケールアウト可能
・重い処理はスペックを倍にすれば単純に2分の1の時間で済む
・特に同時実行性能は他のDWH（BigQuery, Redshift, Azure Datawarehouse）を大きく凌駕している
（他にもたくさんあるが、ここでは割愛）
【価格上のメリット】
・他のDWH（BigQuery, Redshift, Azure Datawarehouse）に比較して価格性能比が最も高い
・秒単位で課金され、設定により使用しないときは自動的に停止させ、費用を削減できる

※性能面での検証結果はFivetran社のベンチマークを参考されたい。
https://fivetran.com/blog/warehouse-benchmark
# 가격



# 세큐리티

今回は Snowflake へのアクセス元 IP アドレス制限を試してみます。Snowflake のアカウント作成後はデフォルトでインターネット経由でどこからでもアクセス出来る（パスワード認証のみ）状態ですが、アクセス元 IP アドレスを制限することで、手軽にセキュリティ向上をすることが出来ます。

https://blog.serverworks.co.jp/snowflake-restrict-source-ip-via-network-policy


private link만드는 방법도

このトピックでは、 AWS PrivateLink を構成して、Snowflakeアカウントを1つ以上の AWS VPCs に直接接続する方法について説明します。

AWS PrivateLink は、Snowflakeが提供するサービスでは ありません。PrivateLinkは、SnowflakeがSnowflakeアカウントでの使用をサポートしている AWS のサービスです。

Business Critical（またはそれ以上）を使用していて、アカウントで AWS PrivateLink を使用する場合は、 Snowflakeサポート に連絡して有効化をリクエストしてください。

https://docs.snowflake.com/ja/user-guide/admin-security-privatelink.html


QuickSight から Snowflake に接続してダッシュボードを作成しました。今回はSQLを書きましたが、テーブルを選択してGUI操作での可視化も出来るのでSQLが書けなくても利用できるのが良いですね！
https://blog.serverworks.co.jp/https%3A//blog_serverworks_co_jp/covid-19-visualization-via-quicksight-snowflake


s3 -> 일괄로드

https://docs.snowflake.com/ja/user-guide/data-load-s3.html

アカウント/ユーザー認証
ユーザー認証はデフォルトでユーザー・パスワードでの認証ですが、以下の方法で強化することができます。

MFA (Multi Factor Authentication)
認証時にユーザー・パスワードに加えて以下のどちらかで追加の認証を行うことが出来ます。

Duo Security
SMS
Duo Security って初めて知りました。。Google Authenticator や Authy などの二段階認証時に使用するトークンソフトウェアの一種の様です。

参考）多要素認証 (MFA)

SSO (Single Sign On)
OneLogin や Okta などの シングルサインオンサービスと連携して認証をすることも出来ます。

参考）フェデレーション認証と SSO

OAuth
OAuth にも対応しています。


Redash -> s3 -> snowflake


# snowflake란

2012年の創業のSnowflake Inc.が提供すフルマネージドのDWHサービスだ。資金調達総額は既に1,000億円以上、評価額は約4,200億円で、2018年には米国最初のユニコーン企業となった。
収益、アクティブ顧客数、従業員数とも前年比3倍以上とその成長性は、まさに飛ぶ鳥を落とす勢いだ。
既にGartner, ForesterのDWH領域での評価は既にLeaderとして位置づけられている。
ではなぜ、国内での知名度が低いのかー
それはやはり日本リージョンでのインフラがないためだろうが、Snowflake社はこの1年で20ヵ国以上でSnowflakeを利用できるようにする計画で、東京リージョンも来春までにはサポートされる予定と聞く（2019年11月現在）。



あれ？まだSuspend状態だ。
SnowflakeはResult Cacheを持っており、約24時間、クエリの実行結果をキャッシュに保持しているため、Warehouseを起動することなく、キャッシュから取得しているようだ。またSnowflakeのLocal Disk Cacheは、クエリ実行時にスキャン対象データをWarehouse内のディスクにキャッシュしており、ストレージのデータと比較して差分をストレージから取得するようだ。

스노우플레이크란?
스노우플레이크는 기본적으로 ACID(Atomicity, Consistency, Isolation, Durability)를 준수하는 MPP(Massively Parallel Processing) 분석 관계형 데이터베이스다. 배리언트(variant) 사용자 정의 데이터 형태를 이용해 SQL뿐만 아니라 반구조화된 데이터를 JSON 등의 형식으로 처리한다. 오늘날 기업 환경에는 기계가 생성한 반구조화된 데이터가 넘쳐나고 있으므로, 이처럼 SQL과 반구조화된 데이터를 함께 처리하는 기술이 필수적이다.

독특한 3-계층 아키텍처를 가진 스노우플레이크는 수 페타바이트(Petabyte)의 데이터에 대해 수 백 개의 동시 쿼리를 실행할 수 있다. 사용자는 클라우드의 비용 효율성과 탄력성 혜택을 누릴 수 있어 필요에 따라 가상 웨어하우스를 만들고 없앨 수 있다. 심지어 신용카드 한 장으로 셀프 프로비저닝(Self-provisioning)이 가능하면서도 AWS EC2 인스턴스를 구성하는 정도의 작업만 하면 된다

원문보기:
http://www.ciokorea.com/news/37098#csidx4a6ba2b27d9ee1b9dd5c7f6eb66eed0 

---------







스노우플레이크의 CEO 밥 머글리아에 따르면, SOD(Snowflake on Demand) 셀프 서비스 옵션은 중소기업에 매력적이지만, 클라우드로 이행하는 은행 등의 대기업에도 적합하다. 머글리아는 2014년 스노우플레이크에 합류하기 전까지 마이크로소프트에서 20년 이상 근무했고 주니퍼(Juniper)에서도 2년 동안 근무했다.

그는 "데이터 웨어하우스는 기업 IT 인프라의 중심점 중 하나다. 데이터 웨어하우스가 계속 온프레미스로 운영되면 이 데이터 웨어하우스를 중심으로 하는 엄청난 수의 시스템까지 지속적으로 온프레미스로 운영해야 한다. 따라서 미리 클라우드로 이동하는 것이 좋다"라고 말했다.

클라우드의 비용 효율성은 자금 여력이 있는 은행 등 대기업에도 매력적이다. 머글리아는 "금융 시장 분석가가 수 천 개의 노드를 2시간 동안만 사용할 경우, 이를 지원하기 위한 시스템을 1년 365일 동안 운영하는 것보다는 임시로만 사용하는 것이 더 효율적이다"라고 말했다.


원문보기:
http://www.ciokorea.com/news/37098#csidxebb245c693ee65fbbd5b52e33b556bd 




https://sisense-knowledge.insight-lab.co.jp/data-modeling/sisense-snowflake-1/
https://dev.classmethod.jp/articles/event-report-bigdata-jaws-11/
https://dev.classmethod.jp/articles/event-report-bigdata-jaws-11/


대부분의 전통적인 데이터베이스뿐만 아니라 레드시프트와 여러 NoSQL 시스템은 비공유 아키텍처를 사용한다. 시스템의 모든 처리 노드에 데이터의 부분 집합을 분배하므로, 공유 디스크 시스템의 통신 병목이 없다. 대신 이런 시스템의 문제는 연산을 저장소에 상관 없이 확장할 수 없다. 그래서 많은 시스템에서 과도한 프로비저닝이 발생하고 있다는 것이 스노우플레이크의 주장이다.

"이뿐만이 아니다. 추가된 노드의 수에 상관 없이 이런 시스템에 사용하는 RAM 때문에 처리할 수 있는 동시 쿼리의 양이 제한된다. 그래서 오늘날 고객은 용량이 부족한 기존 시스템을 넘어 클라우드로 이행하고 이를 통해 기존의 한계를 타파하고 싶어한다"라고 말했다. 스노우플레이크는 3-계층 아키텍처를 사용해 이런 문제를 해결하도록 개발됐다.

- 테이블 데이터와 쿼리 결과를 보관하기 위해 아마존 S3를 사용하는 데이터 저장 계층
- 스노우플레이크가 가상 웨어하우스라고 말하는 탄력적인 가상머신 클러스터들 내에서 쿼리 실행을 처리하는 가상 웨어하우스 계층
- 트랜잭션(Transaction), 쿼리, 가상 웨어하우스, 데이터베이스 스키마(Scheme) 등의 메타데이터(Metadata), 액세스 제어를 관리하는 클라우드 서비스 계층

이 아키텍처를 통해 복수의 가상 웨어하우스가 동시에 같은 데이터로 작업할 수 있기 때문에 스노우플레이크는 비공유 경쟁사보다 동시 실행을 크게 확대할 수 있다. 단, 3-계층 아키텍처는 레이턴시(Latency) 문제로 이어질 가능성이 있다.

머글리아는 "시스템 성능을 유지하기 위해 SQL 쿼리의 프리디케이트(Predicate)를 스캔할 데이터를 판단하는 메타데이터와 함께 사용하는 서비스 계층에 쿼리 컴파일러(Compiler)를 확보했다. 가능한 작은 데이터를 스캔하는 것이 기술이다"라고 말했다.

현재의 스노우플레이크는 OLTP 데이터베이스가 아니다. 분석 특성을 가진 작업에서만 제한적으로 오라클 또는 SQL 서버와 경쟁한다. 하지만 스노우플레이크는 스스로 새로운 지평을 열고 있다. 머글리아는 "글로벌 기업을 운영하는 측면에서 글로벌 데이터베이스를 확보하는 것은 매우 중요하다. 우리가 나아가는 방향도 바로 그 쪽이다"라고 말했다

원문보기:
http://www.ciokorea.com/news/37098#csidx5775c280435590f88e4d8caed57aed8 

원문보기:
http://www.ciokorea.com/news/37098#csidx21cf9c3acf987048dfdfbcf6353f8cb 