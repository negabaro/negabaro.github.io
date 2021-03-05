---
layout: post
title: "rails incompatible character encodings: Windows-31J and UTF-8에러"
author: negabaro kim
categories: rails
tags: rails
---

DB데이터를 csv파일로 export하는 데일리 배치가 아래와 같은 에러를 뿌리며 동작이 되지 않았다.

에러명은 `incompatible character encodings: Windows-31J and UTF-8`

---

## 원인

`é`와 같은 linux,mac에서 읽을 수 없는 문자(Windows-31J)가 들어오면서 csv export시 에러가 발생했다.

필자의 경우 사용자가 `白鷗大学`라는 한자를 입력했는데 `鷗`한자가 Windows-31J 였던것.

아래 코드로 간단히 재현이 가능했다.

```ruby
CSV.open(File.join('/var/tmp/test.csv'), 'w', encoding: 'Windows-31J') do |csv|
  csv << %w( d é f )
end
#error: Encoding::UndefinedConversionError: U+00E9 from UTF-8 to Windows-31J
```



## 대응

invalid, undef옵션을 이용해 처리할 수 없는 문자를 `?`로 변경하도록 했다.

아래는 해당 코드이다.

```ruby
CSV.open(TEMP_CSV_FILE_PATH,'w', force_quotes: true, encoding:Encoding::SJIS, invalid: :replace, undef: :replace) do |csv|
end
```

---

## 삽질한 부분

### 삽질1. CSV.generate에서는 invalid,undef옵션이 없음

CSV.generate를 사용했는데 여기서는 invalid,undef옵션사용이 불가능했다.(버전업해도)

### 삽질2. csv버전이 3.1.6미만일 경우 invalid,undef옵션 사용이 불가능

Gemfile을 `gem 'csv', "~> 3.1.6"`로 수정하고 

`bundle update csv`해서 csv버전을 3.1.9로 올리니 사용할 수 있었다.



## 메모

### 메모1.

첫행을 아래와 같이 기술해서 해결한 사람도 있는듯

```ruby
# coding: Windows-31J
```

필자의 경우 고객의 요구로 `SJIS`형태로 export해야되어서 채용하지 않음


### 메모2.

CSV.generate로 파일 오브젝트를 통째로 넘겨줘서 s3에 업로드 하는 방식이었는데  generate에 undef,invalid옵션이 없는 관계로 아래와 같이 변경

```ruby
TEMP_CSV_FILE_PATH = '/tmp/temp_csv.csv'
CSV.open(TEMP_CSV_FILE_PATH,'w', force_quotes: true, encoding:Encoding::SJIS, invalid: :replace, undef: :replace) do |csv|
  ...
end

client = Aws::S3::Client.new(region: Settings.aws.region, credentials: Aws::ECSCredentials.new)
#client = Aws::S3::Client.new(region: Settings.aws.region)
...
client.put_object(bucket: Settings.aws.delivery_bucket, key: key, body: File.read(TEMP_CSV_FILE_PATH))
```




## 도움이 된 기사

[Shift_JIS와 Windows-31J 차이]

[Solution1]

[Solution2]
---

[Solution1]: https://colabmix.co.jp/tech-blog/rails-sjis-error/
[Solution2]: https://qiita.com/kano-e/items/19df487e163c606bd652
[Shift_JIS와 Windows-31J 차이]: https://weblabo.oscasierra.net/shift_jis-windows31j/
