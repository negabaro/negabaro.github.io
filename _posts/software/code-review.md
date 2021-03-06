---
layout: post
title:  "코드리뷰"
author: negabaro kim
categories: software
tags:	software
---


# 문화 만들기

그래서 코드 리뷰가 진행되기 위해서는 원칙과 문화를 먼저 만들어야 합니다. 중요한 건, 누구든 ‘이 코드가 잘못됐다’라는 식으로 말해선 안 됩니다. 상대방을 존중해야 해요. ‘이렇게 해보는 게 어떨까’, ‘이런 가능성도 있지 않을까?’라는 식으로 말을 주고받아야 해요. 그런 과정이 반복되면 코드 리뷰에 대한 문화가 생길 수 있죠.”


#1. 한 번에 하나씩 리뷰하고 고치자. 

리뷰를 하다가 갑자기 다른 버그가 보일 수 있고, 스타일이나 포맷을 고치고 싶은 마음이 들 수 있다.  일단 그것은 제쳐두고 원래 고치려고 했던 내용 하나만을 보고 리뷰하고 고치는 게 더 효율적이다.

# 2. 코드를 리뷰하는 사람(검토자)은 이슈 1개당 최소 2명을 두자.

# 4. ‘깃 블레임‘이라는 깃 명령어를 활용하라. 

이 명령어를 이용하면 각 코드마다 마지막으로 수정한 사람이 누구인지, 최종 커밋 시간은 언제였는지 확인할 수 있다. 팀 페터슨 개발자 프로바커터가 직접 만든 오픈소스 ‘깃 길트‘를 이용해도 된다. 깃 길트는 깃 블레임 내용을 요약하고 정리해주는 무료 커맨드라인 도구다.

# 5. 코드 리뷰를 하다보면 의견 차이가 생길 수 있다. 
당사자끼리 화를 내거나 온라인에 감정적인 논쟁이 길어질 때도 있다. 이런 논쟁이 발생했다면 바로 상사, 아키텍트, 다른 개발자들 등이 나서서 중재해야 한다. 특히 온라인에서 의견을 교환하는 것을 중단하고 당사자들끼리 얼굴을 맞대고 해결할 수 있도록 도와줘야 한다.


#6. 코드리뷰만을 위한 날을 만든다


코드 리뷰 도구를 이용하다보면 리뷰해야 할 코드가 무엇인지 모아 볼 수 있다. 그런데 시간이 지나면서 해야 할 코드 리뷰가 산더미처럼 쌓일 때가 있다. 따라서 ‘특정 요일에는 코드 리뷰할 과제를 모두 해결하자’는 식의 규칙을 만들면 좋다. 예를 들어 ‘매주 화요일에는 코드리뷰함에 있는 항목들을 다 해결하자’라는 내부 팀 규칙을 만드는 것이다.



# 8.  구체적인 이슈 주소를 만들게

개발자들은 소스코드를  작성하면서 “// TODO fix this later”같은 주석을 달곤한다. 나중에 다시 고치기 위해 일단 메모하는 것이다. 개발자는 가끔씩 이 주석을 잊고 수정을 안 한 채 코드를 제출하기도 한다. 만약 코드 검토자가 이러한 주석을 발견했다면 개발자에게 다시 알려주거나 구체적으로 이슈 주소를 만들어 주석에 추가하는게 좋다. 나중에 좀 더 쉽게 추적하기 위해서다.

# 9. 코드검토자는 코드 내용이 잘 이해 못 할 수도 있다. 

이럴 때 검토자는 코드를 작성한 사람에게 찾아가 코드에 대한 설명을 듣는다. 코드 검토자는 이 내용을 말로만 듣지 말고 코드에 기록하면 좋다. 특히 코드작성자에게 들을 내용을 주석 형태로 코드에 아예 삽입해 놓으면, 향후 유지보수를 하는 개발자에게 큰 도움이 된다. 코드를 작성한 사람이 이에 대한 설명을 스스로 코드 주석으로 적는 것도 좋다.

가끔 의견차이가 잘 좁혀 지지 않을 때나, 상대방의 말이 잘 이해가 안 될 때 만나서 얘기 하는 경우도 종종 있습니다. 글로 잘 대화가 안 되는 경우, 말로 하는 것이 훨씬 효율적이고 빠릅니다. 작성자이던 reviewer이던, 조금 이라도 막힌다는 느낌이 있으면 찾아 가서 직접 얘기하세요. 그게 훨씬 효율적입니다. 단 이 경우에도 반드시 리뷰 시스템에 "만나서 이렇게 합의를 봤고, 결론에 도달한 이유"를 간단히 적어 놓아야 합니다. 그래야 차후에 그 CL을 참조하는 사람이 왜 그렇게 했는지를 알 수 있으니까요.



# 10. 코드 리뷰에 대한 정책을 팀 단위로 정해놓자.

 풀 리퀘스트(Pull Request)를 언제 적용할지 팀이 회의해서 규칙을 만들어놔야 한다.


# 리뷰는 가능하면 빠르게

리뷰어는 가급적이면 CL을 받으면 최대한 자기일 보다는 리뷰를 먼저 해 주는 것이 좋습니다. CL 작성자의 입장에서는 리뷰를 얼마나 빨리 받는지에 따라 업무 효율이 많이 좌우 되니까요. 이건 CL을 처음으로 받았을 때도 그렇고 업데이트된 CL (보내준 review에 따라 수정한)을 받았을 때도 마찬가지 입니다.

보통 일반적인 규칙은 (처음이든 update한 버젼이든 상관 없이) CL을 받으면 24시간안에는 리뷰를 보내준다 입니다. 하지만 이건 hard deadline에 가깝고, 대개는 그날 받은 CL은 그날 리뷰해 주는 것이 좋습니다. (오후 늦게 받은 건 그 다음날 오전에 리뷰 해 줘도 괜찮습니다.)

reviewer가 어뗜 이유로 - 아주 급한 일이 있다던지, CL이 너무 크고 이해하기 어렵다든지 해서 - 24시간안에 리뷰를 못 보내줄 것 같으면, 이메일이나 offline으로 그 사정을 CL작성자에게 얘기를 미리 해 주는 것이 좋습니다. 예를 들어 "이런 저런 사정으로 x일까지 리뷰 해 줄 수 있는데 괜찮겠냐?"고.

# 리뷰에 대한 수정에 대한 기한은 

반대로 CL작성자가 리뷰를 받고 언제까지 수정 버젼을 보내줄 것인지에 대한 규칙은 없습니다. 이게 늦어지면 대체로 CL 작성자가 손해를 보는 쪽이니까요. 그래도 아주 극단적으로 늦어지는 경우 (1~2주?) reviewer가 문맥(context)를 잊어 버리니까, "늦게 보내서 미안하다" 정도는 적어 주는 것이 좋습니다.


# 리뷰의 강도

이 질문에 대한 답은 상황에 따라 많이 다릅니다. 예를 들어 이미 대규모로 서비스 되고 있거나 곧 서비스 될 경우, 또는 큰 과제여서 많은 사람들이 공동 작업하는 코드, 중요한 과제여서 코드가 향후 오랫동안 사용될 경우 등에는 code quality가 아주 중요합니다. 따라서 리뷰도 더 깐깐하게 해야 합니다. 또한 주요 로직에 대해서는 unit test가 다 있어야겠죠. 때문에 "이런 저런 테스트를 추가해 주세요"는 상당히 당연한 리뷰 comment 입니다.

반면, 실험적인 코드, 1~2명이 작업하는 코드, 향후 버려질 가능성이 높은 코드는 code quality 보다는 속도가 더 중요할 수 있습니다. 이 경우 리뷰를 너무 깐깐하게 하면 얻는 것보다 비용이 더 많이 들 수도 있습니다. 때문에 약간 리뷰를 느슨하게 하는 것도 괜찮습니다. 극단적인 경우 - 완전히 실험적인 코드 - 는 아예 리뷰를 안하는 경우도 있습니다. 단 이 경우는 repository 나 디렉토리를 완전히 분리하고, 거기에는 리뷰 안 한 코드가 들어있다는 것을 사전에 팀 전체가 공유 해야 합니다. (이런 코드는 리뷰를 하는 코드가 들어 있는 디렉토리에서 불러 써도 안되죠.)


위의 두 가지 경우의 리뷰 모두,  스타일 가이드는 기본적으로 따라야 합니다.  일단 lint 같은 툴로 대부분의 문제는 다 걸러 내고, lint로 안 잡히는 문제는 reviewer가 comment를 줍니다. 단 이 경우 너무 style guide를 바이블처럼 따를 필요도 없고, 그래서도 안됩니다. style guide를 100% 지킬려고 하다 보면 너무 많은 에너지가 들 수 있거든요. 하지만 reviewer는 style guide에 안 맞는 것이 보이면 comment를 달아 주는 것이 맞고, 작성자도 그런 comment는 다 따라 주는 것이 좋습니다. 왜냐 하면 보통 style guide 관련 comment들은 고치는데 별로 시간이 많이 안 걸리니까요.

불필요한 공백(extra whitespace)은 다 없애는게 맞습니다. 안 그러면 나중에 리뷰 시스템에서 diff로 볼 때 바뀌지 않은 라인이 바뀐걸로 나오니까요. editor에서 "저장할 때 extra whitespace 없애는" 옵션을 항상 켜두면 편합니다.

comment를 달 때, 반복적인 문제들에 대해 다 comment를 달 필요는 없고, "이 라인에 이런 문제가 있고 다른 곳에도 반복되니까 모두 고치세요" 라고 하면 됩니다.


# 변수명에 대한 리뷰

변수, 함수 이름은 코드를 이해하는데 중요하죠. 따라서 "지금 이름보다 이 이름이 더 명확할 것 같은데 어떠세요?"라고 충분히 얘기할 수 있습니다. 하지만 현재의 이름도 꽤 괜찮다면 너무 완벽하게 하기 위해서 고쳐 주세요 할 필요는 없습니다. 반면 외부에 공개 되는 API라던지, 외부에 공개 되지는 않지만 내부적으로 아주 많이 쓰일 것 같은 API는 조금이라도 더 좋아질 여지가 있으면 고치는 게 낫습니다.


# 리뷰 포인트

review를 할 때, 중요한 것 중 하나는 CL의 전체적인 디자인이 괜찮은지를 보는 것입니다. 더 단순한 디자인은 없는지, 이해하기 쉬한 구조인지, 확장성, 유연성은 좋은지, 테스트는 쉬운지 등을 잘 보셔야 합니다. 특히 테스트가 쉬운 구조인지 (Testability)는 특히 중요한 항목입니다. 설령 당장 unit test가 없더라도 중요합니다. 나중에 테스트를 추가할려고 할 때 쉽게 할 수 있어야 하니까요. 그리고 일반적으로 Testability 가 안 좋은 코드는 다른 문제도 많이 가지고 있으니까요.

리뷰시에는 나만의 스타일을 고집하면 안 됩니다. 스타일 가이드에 있는 것은 잘 따라야지만, 그 이외의 부분에 대해서는 사람마다 다 스타일이 다르기 때문에 스타일에 관한 comment는 하시면 안 됩니다. 내가 할려는 comment가 code quality를 향상 시키려는 것인지, 스타일 문제인지를 잘 생각해 보세요.

CL 작성자가 고집이 세서, 분명히 타당한 comment인데도 받아들이지 않는다면, 한두번 얘기해 보고 안 되면 포기 하세요. code quality는 떨어지겠지만, 그게 팀원들끼리 감정 상하는 것보다는 훨씬 낮습니다. 그리고 이런 일이 특정 작성자와 반복되면 직접 만나서 허쉼탄회하게 얘기를 해 보는 것도 괜찮습니다. 단 감정이 상하지 않게 잘 해야 합니다. 그리고 너무 기대를 마세요. 사람은 안 바뀌니까요.

# 칭찬

같은 말도 "아" 다르고 "어" 다르듯이, 상호 코멘트를 달 때 예의를 갖추고 해야 합니다. 그리고 상대가 잘한 부분에 대해서는 칭찬하는  comment를 많이 달아 주세요. 예를 들어 "이 CL 정말 대단한데요.", "이 CL 정말 있었으면 좋겠다고 항상 생각해 왔는데 이거 만들어 주셔서 정말 감사합니다.", "이 디자인은 ....해서 정말 훌륭하군요.", "이 테스트는 정말 coverage가 대단 하네요.", "제안해 주신 디자인은 .. 해서 훨씬 낫군요" 등등.

# 역지사지

역지사지 - 작성자편: reviewer가 쉽고 빨리 리뷰 할 수 있는 CL을 만들도록 노력하세요. 내 시간이 중요한 만큼 reviewer의 시간도 중요합니다. 한가지 방법은 CL을 가능한 작게 만들는 것입니다. CL 하나에는 하나의 기능만 담으세요. 그래야 리뷰가 쉽고 빨리 리뷰를 할 수 있습니다. 이렇게 하면 나중에 코드 history를 살펴볼때도 편하고 여러 가지로 좋습니다. 또 한 가지 방법은 CL 보내기 전에 자신이 리뷰어가 됐다고 생각하고 리뷰 시스템에서 한 번 훑터보고 보내는 것입니다. 자신의 에디터에서 볼 때 못 보았던 문제를 많이 발견하게 될 겁니다. 반면 가장 안 좋은 자세는 대강 CL을 만들어서 리뷰 보내고, reviewer가 comment를 보내면 그걸 고치면서 CL을 완성하겠다는 자세입니다. 내 시간이 중요한 만큼 reviewer의 시간도 중요합니다. 최대한 완성된 CL을 보내세요.

역지사지 - reviewer편: 리뷰시 해서 안되는 것 중에 하나는 CL의 범위가 아닌것을 이것 저것 고치라고 하는 겁니다. 예를 들어 현재 리뷰하는 CL 이전부터 기존에 갖고 있는 코드의 문제를 이번 CL에서 고치라고 하는 겁니다. 또 다른 해서는 안되는 것은 너무 무리한 것을 강요하는 것입니다. 예를 들어, "현재 CL에서 빠진 unit test가 있는데, 이걸 추가를 하면 좋지만 추가 하는데 너무 노력이 많이 든다"면, 일단 현재 CL에서는 TODO로 남기고 그 다음 CL에서 하는 것도 방법입니다. 작성자가 이렇게 하자고 하는데도, "unit test 추가 안 하면 approve 안 해 주겠다" 이런 것은 좋은 태도가 아닙니다. 반면, 비용이 많이 들지만 code quality가 중요한 과제이고, 제안하는 테스트가 중요한 것이라면, 이번 CL에서 하는 것이 맞는 경우도 분명 있습니다. 


# 첫인상

인간 관계에서도 첫인상이 중요하듯이 코드 리뷰 역시 첫인상이 중요합니다. 자신의 코드를 처음 리뷰하는 reviewer에게 CL을 보낼 경우 조금 더 신경을 쓰세요. 처음 보내는 CL quality가 낮아서 여러 가지 지적을 받게 되면, 그 reviewer가 작성자에 대해 잘못된 선입관을 가질 수 있고, 이후의 CL들에 대해서도 불필요하게 더 깐깐하게 리뷰할 수도 있습니다.


# 스타트업에서는

아직 제품이 시장에서 검증이 안 된 스타트업의 경우, 전략적으로 상당한 기술적 빚 (technical debt)를 안고 가는 것도 괜찮은 방법입니다. 이 경우 code quality는 어느 정도 포기하고, 코드 리뷰에 들어가는 노력을 작게 가져 갑니다. (린스타트업이란 책을 참고 바랍니다.)

https://qiita.com/teradonburi/items/2fa475c860d0fb16c0eb
https://shuuji3.github.io/eng-practices/
https://qiita.com/mima_ita/items/c3490ad1ccc12ad853f1
https://qiita.com/awakia/items/8344ba751426e386e0f5
http://sv-story.blogspot.com/2013/04/blog-post_28.html
http://www.bloter.net/archives/238819