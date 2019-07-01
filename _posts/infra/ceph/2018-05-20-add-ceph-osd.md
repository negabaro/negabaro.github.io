---
layout: post
title:  "ceph scalable한 디스크 추가/삭제 방법"
author: negabaro kim
categories: ceph
tags:	ceph
---

ceph는 scalable하게 무정지로 디스크 용량을 추가,삭제가 가능하다고 한다.
실제로 그런지 테스트 해봤다.


### 테스트 환경


{% highlight bash %}
ceph -v
ceph version 10.2.9
{% endhighlight %}

기존의 ceph는 AWS위에  2대 클러스터로 구성(ceph1 ceph2)
각각 30GB씩 osd추가한 상태


{% highlight bash %}
/dev/xvdb(30GB)
/dev/xvdb(30GB)
{% endhighlight %}

#### df -Th 결과 

{% highlight bash %}
df -Th
Filesystem              Type      Size  Used Avail Use% Mounted on
10.1.10.66,10.1.30.71:/ ceph       20G   80M   20G   1% /blue
{% endhighlight %}


#### ceph-deploy osd list ceph1 and ceph2

{% highlight bash %}
ceph-deploy osd list ceph1
[ceph1][INFO  ] ----------------------------------------
[ceph1][INFO  ] ceph-0
[ceph1][INFO  ] ----------------------------------------
[ceph1][INFO  ] Path           /var/lib/ceph/osd/ceph-0
[ceph1][INFO  ] ID             0
[ceph1][INFO  ] Name           osd.0
[ceph1][INFO  ] Status         up
[ceph1][INFO  ] Reweight       1.0
[ceph1][INFO  ] Magic          ceph osd volume v026
[ceph1][INFO  ] Journal_uuid   02c636de-37f5-44dc-b7b1-85b0d0cee998
[ceph1][INFO  ] Active         ok
[ceph1][INFO  ] Device         /dev/xvdb1
[ceph1][INFO  ] Whoami         0
[ceph1][INFO  ] Journal path   /dev/xvdb2
[ceph1][INFO  ] ----------------------------------------
{% endhighlight %}


{% highlight bash %}
ceph-deploy osd list ceph2
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] ceph-1
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] Path           /var/lib/ceph/osd/ceph-1
[ceph2][INFO  ] ID             1
[ceph2][INFO  ] Name           osd.1
[ceph2][INFO  ] Status         up
[ceph2][INFO  ] Reweight       1.0
[ceph2][INFO  ] Magic          ceph osd volume v026
[ceph2][INFO  ] Journal_uuid   3f3a64c6-2ae7-4f65-8a66-6f71d8155dc8
[ceph2][INFO  ] Active         ok
[ceph2][INFO  ] Device         /dev/xvdb1
[ceph2][INFO  ] Whoami         1
[ceph2][INFO  ] Journal path   /dev/xvdb2
[ceph2][INFO  ] ----------------------------------------
{% endhighlight %}


기존에 추가한 디바이스가 있는것을 확인


### osd 추가해주기

AWS콘솔에서 이하 볼륨을 생성해서 ceph1,ceph2인스턴스에 attach해줌

{% highlight bash %}
/dev/xvdf(30GB)  << ceph1
/dev/xvdf(30GB)  << ceph2
{% endhighlight %}

이하 커맨드 실행

{% highlight bash %}
ceph-deploy osd create ceph1:/dev/xvdf
{% endhighlight %}


#### df -Th결과 

{% highlight bash %}
df -Th
Filesystem              Type      Size  Used Avail Use% Mounted on
10.1.10.66,10.1.30.71:/ ceph       45G  108M   45G   1% /blue
{% endhighlight %}

추가하자마자 바로 용량이 늘어남!
위 결과는 ceph cluster를 마운트한 어느 서버에서도 같은 결과를 확인할 수 있었다.


#### osd list 

{% highlight bash %}
ceph-deploy osd list ceph1
[ceph1][INFO  ] ----------------------------------------
[ceph1][INFO  ] ceph-2
[ceph1][INFO  ] ----------------------------------------
[ceph1][INFO  ] Path           /var/lib/ceph/osd/ceph-2
[ceph1][INFO  ] ID             2
[ceph1][INFO  ] Name           osd.2
[ceph1][INFO  ] Status         up
[ceph1][INFO  ] Reweight       1.0
[ceph1][INFO  ] Magic          ceph osd volume v026
[ceph1][INFO  ] Journal_uuid   d3b7be98-9f15-4c38-87ba-3785f49c9f42
[ceph1][INFO  ] Active         ok
[ceph1][INFO  ] Device         /dev/xvdf1
[ceph1][INFO  ] Whoami         2
[ceph1][INFO  ] Journal path   /dev/xvdf2
[ceph1][INFO  ] ----------------------------------------
[ceph1][INFO  ] ----------------------------------------
[ceph1][INFO  ] ceph-0
[ceph1][INFO  ] ----------------------------------------
[ceph1][INFO  ] Path           /var/lib/ceph/osd/ceph-0
[ceph1][INFO  ] ID             0
[ceph1][INFO  ] Name           osd.0
[ceph1][INFO  ] Status         up
[ceph1][INFO  ] Reweight       1.0
[ceph1][INFO  ] Magic          ceph osd volume v026
[ceph1][INFO  ] Journal_uuid   02c636de-37f5-44dc-b7b1-85b0d0cee998
[ceph1][INFO  ] Active         ok
[ceph1][INFO  ] Device         /dev/xvdb1
[ceph1][INFO  ] Whoami         0
[ceph1][INFO  ] Journal path   /dev/xvdb2
[ceph1][INFO  ] ----------------------------------------
{% endhighlight %}


ID2의 /dev/xvdf가 생긴걸 확인

#### ceph2도 추가해보자

{% highlight bash %}
ceph-deploy osd create ceph2:/dev/xvdf
{% endhighlight %}


{% highlight bash %}
ceph-deploy osd list ceph2
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] ceph-1
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] Path           /var/lib/ceph/osd/ceph-1
[ceph2][INFO  ] ID             1
[ceph2][INFO  ] Name           osd.1
[ceph2][INFO  ] Status         up
[ceph2][INFO  ] Reweight       1.0
[ceph2][INFO  ] Magic          ceph osd volume v026
[ceph2][INFO  ] Journal_uuid   3f3a64c6-2ae7-4f65-8a66-6f71d8155dc8
[ceph2][INFO  ] Active         ok
[ceph2][INFO  ] Device         /dev/xvdb1
[ceph2][INFO  ] Whoami         1
[ceph2][INFO  ] Journal path   /dev/xvdb2
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] ceph-3
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] Path           /var/lib/ceph/osd/ceph-3
[ceph2][INFO  ] ID             3
[ceph2][INFO  ] Name           osd.3
[ceph2][INFO  ] Status         up
[ceph2][INFO  ] Reweight       1.0
[ceph2][INFO  ] Magic          ceph osd volume v026
[ceph2][INFO  ] Journal_uuid   482fa951-688a-4402-b15a-19dad42e9141
[ceph2][INFO  ] Active         ok
[ceph2][INFO  ] Device         /dev/xvdf1
[ceph2][INFO  ] Whoami         3
[ceph2][INFO  ] Journal path   /dev/xvdf2
[ceph2][INFO  ] ----------------------------------------
{% endhighlight %}


ID 3의 /dev/xvdf가 추가된걸 확인


#### df -Th결과 

{% highlight bash %}
df -Th
Filesystem              Type      Size  Used Avail Use% Mounted on
10.1.10.66,10.1.30.71:/ ceph       70G  140M   70G   1% /blue
{% endhighlight %}


추가한만큼 바로 용량이 늘어남을 확인



#### ceph -w 를 통해서도 확인가능

{% highlight bash %}
ceph -w
    cluster a284013b-68d0-4570-9956-6706442d066e
     health HEALTH_OK
     monmap e1: 2 mons at {ceph1=10.1.10.66:6789/0,ceph2=10.1.30.71:6789/0}
            election epoch 4, quorum 0,1 ceph1,ceph2
      fsmap e5: 1/1/1 up {0=ceph1=up:active}, 1 up:standby
     osdmap e23: 4 osds: 4 up, 4 in
            flags sortbitwise,require_jewel_osds
      pgmap v1611: 192 pgs, 3 pools, 3349 bytes data, 20 objects
            142 MB used, 71488 MB / 71630 MB avail
                 192 active+clean

2018-05-21 15:51:38.225587 mon.0 [INF] pgmap v1611: 192 pgs: 192 active+clean; 3349 bytes data, 142 MB used, 71488 MB / 71630 MB avail
{% endhighlight %}




### 추가한 osd를 삭제하는 방법

서두에 ceph에서는 자유롭게 디스크의 추가/삭제가 가능하다고 했는데
삭제를 해본결과 추가에 비해서 그렇게 자유롭지는 않다.



#### 삭제 대상의ID,NAME확보

삭제할 대상의 id,name을 먼저 확인해준다.
ceph2의 /dev/xvdf 디바이스를 삭제한다고 하면

{% highlight bash %}
ceph-deploy osd list ceph2
[ceph1][INFO  ] ID             3
[ceph1][INFO  ] Name           osd.3
{% endhighlight %}

ID와 Name부분이다.
ID와Name은 primary키로 중복된 값은 존재하지 않는다.


#### 삭제한osd가 있는 서버로 이동

여기서 부터는 ceph-deploy가 설치된 서버가 아닌 해당 디스크가 있는 서버로 이동해서 작업해야 한다.

{% highlight bash %}
ssh 해당서버(ceph2)
{% endhighlight %}


#### 해당osd 프로세스정지

{% highlight bash %}
ssh 해당서버(ceph2)
sudo systemctl stop ceph-osd@{osd-num}.service
#for example
sudo systemctl stop ceph-osd@3.service
{% endhighlight %}


#### 클러스터상에서 해당 디스크를 제외

{% highlight bash %}
ceph osd out {osd-ID}
#for example
ceph osd out 3
-> result: marked out osd.3.
{% endhighlight %}


#### CRUSH map삭제

{% highlight bash %}
ceph osd crush remove {name}
#for example
ceph osd crush remove osd.3
{% endhighlight %}


#### authentication key삭제

{% highlight bash %}
ceph auth del osd.{osd-num}
#for example
ceph auth del osd.3
{% endhighlight %}


#### 최종osd삭제 커맨드

{% highlight bash %}
ceph osd rm {osd-num}
#for example
ceph osd rm 3
-> result: ceph osd crush remove osd.3
{% endhighlight %}

까지 끝나면 삭제완료

#### ceph list다시 확인


{% highlight bash %}
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] ceph-3
[ceph2][INFO  ] ----------------------------------------
[ceph2][INFO  ] Path           /var/lib/ceph/osd/ceph-3
[ceph2][INFO  ] ID             None
[ceph2][INFO  ] Name           None
[ceph2][INFO  ] Status         None
[ceph2][INFO  ] Reweight       None
[ceph2][INFO  ] Magic          ceph osd volume v026
[ceph2][INFO  ] Journal_uuid   482fa951-688a-4402-b15a-19dad42e9141
[ceph2][INFO  ] Active         ok
[ceph2][INFO  ] Device         /dev/xvdf1
[ceph2][INFO  ] Whoami         3
[ceph2][INFO  ] Journal path   /dev/xvdf2
[ceph2][INFO  ] ----------------------------------------
{% endhighlight %}

ID,Name이None으로 바뀌어있는걸 확인


### 정리&느낀점

ceph는 master,standby 관계가 아니므로 서버별로 디스크 용량을 따로 추가가 가능
해보지 않았지만 각자 다른 용량을 추가해도 문제없을듯

볼륨 추가만해주면 ceph-deploy커맨드로 간단히 용량추가가 가능하다.
삭제는 조금 귀찮은 작업이 필요하다.


### 그외 기존의 볼륨을 추가하려면?

위에서는 새로운 볼륨을 추가해서 osd에 더해줬는데
기존의 볼륨 디스크 크기를 늘려주는 방법은 있을까?


찾아본 결과 디폴트로는 없는거 같고,ceph lvm을 도입하면 가능할듯하다.(미검증)


### 관련 도큐멘트

http://docs.ceph.com/docs/master/rados/deployment/ceph-deploy-osd/
http://docs.ceph.com/docs/master/rados/operations/add-or-rm-osds/#removing-osds-manual