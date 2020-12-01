---
layout: post
title: "REST api를 정기적으로 실행 가능한 Sass형 스케줄러(cron)에 대해 조사"
author: negabaro kim
tags: sass
---

필자가 개발중인 주식관련 API를 정기적으로 실행시켜줄 sass형 스케줄러에 대해 조사해봤다.

# 필수 조건

특정시간에 정기적으로 실행되어야한다.

서버관리 코스트를 없애고 싶기때문에 sass형 서비스여야 할것


# 있으면 좋은 조건

무료 혹은 가격이 쌀수록 좋다.

스케줄러 감시

slack,mail통지


---

# 후보군

## cronhub

정기실행과 해당 프로세스의 감시 알림까지 되는듯
좋아 보이는데 무료가 아니다 start plan 5$
에 스케줄러는 1개 사용이 가능하다.

자세한 가격정책은 아래 링크를 참고

[cronhub pricing]

netlify와 cronhub을 조합해서 정기적 빌드 디플로이 구현하는 글은 아래링크를 참조

[cronhub-and-netlify-builds]


## GitLab

조사중

Or, if you use GitLab, you can run pipelines on specific schedules:
https://docs.gitlab.com/ce/user/project/pipelines/schedules.html 26 Potentially you could use a pipeline job to trigger a build via the Netlify build webhook.

## GCP Cloud Scheduler

조사중

## AWS Scheduler

조사중

---

[cronhub-and-netlify-builds]: https://blog.cronhub.io/cronhub-and-netlify-builds/
[cronhub pricing]: https://cronhub.io/#pricing

[netlify-functions-fear-and-greed-index]: https://github.com/strong-gemi/netlify-functions-fear-and-greed-index
