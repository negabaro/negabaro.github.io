---
layout: post
title:  "rails6 validation error시 raidio_button위에 field_with_errors class가 추가되는 문제"
author: negabaro kim
tags:	rails/view
---

# 문제

validation에러 발생시 `field_with_errors`의 div가 radio_button을 덮어버리는 문제

본디 field_with_errors class를 이용해서 아래와 같이 에러가 발생한 필드의 border를 강조하는 
목적으로 사용하기도 하고 굳이 그런걸 안해도 문제가 없다.

![image](https://user-images.githubusercontent.com/4640346/86940553-f09b3e00-c17d-11ea-8e11-760195e4f3e1.png)


그런데 radio_button에서 위 field_with_errors클래스가 덮어버리면 radio_button element가 깨져버린다.

![image](https://user-images.githubusercontent.com/4640346/86941075-76b78480-c17e-11ea-9306-db96f37d96f0.png)


# 해결방법

아래와 같이 monkey patch를 넣어주고 서버 재기동하면 해결

```ruby
#config/initializers/action_view_helpers.rb
module ActionView
  module Helpers
    module ActiveModelInstanceTag
      def tag_generate_errors?(options)
        (options['type'] != 'hidden' && options['type'] != 'radio')
      end
    end
  end
end
```

### reference: 

```
https://qiita.com/gessy0129/items/712835a76170ce0a58ed
```