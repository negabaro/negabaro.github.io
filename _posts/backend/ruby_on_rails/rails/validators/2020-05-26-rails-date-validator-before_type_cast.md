---
layout: post
title:  "rails6 before_type_cast를 이용해서 존재하지 않는 날짜를 입력시 validation error를 발생시켜보자"
author: negabaro kim
categories: rails
tags:	rails
---


# 존재하지 않는 날짜를 입력받았을시 어떻게 해야할까?

![image](https://user-images.githubusercontent.com/4640346/82998314-8b164680-a042-11ea-9768-0b81a8063c02.png)

2020/4/31은 실제로 존재하지 않는 날짜인데 해당 날짜를 선택해서 post하면 
어떻게 처리해줘야할까?

존재하지 않는날짜는 폼에서 배제해볼까도 생각했는데 배제해본들 브라우저에서 dom을 조작할 수 있다.
필자도 어느 항공사 사이트에서 표시되지않은 예약날짜를 developer모드에서 수정해서 예약을 시도한 기억이 있다.

그러므로 클라이언트쪽은 건드리지 않고 서버상에서 클라이언트에게 받은 정보를 validation check를 하기로 했다.


# 레일즈에서 존재하지 않는 날짜를 valdation처리 하려고하니 문제가 발생

문제가 발생했다.
클라이언트에서 2020/4/31을 넘겨줬음에도 서버에서 확인하니 nil인것.
원인이 무언고 찾아보니 ActiveRecord에 대입하기전에 각 컬럼의 데이터 형을 캐스팅한다는것을 알았다.

2020/4/31을 datetime으로 캐스팅하면 존재하지 않는 날짜라 nil을 리턴하는 것


# before_type_cast를 이용하면 캐스팅되기전의 값을 취득할 수 있음.

이러한 문제를 알고있는지 레일즈에서는 각 컬럼에 `컬럼명_before_type_cast` 라는 메소드가 존재해
캐스팅 되기전의 값을 확인할 수 있었다.

[실제코드 링크]: https://github.com/rails/rails/blob/d796193e2df505aa084698f2ed52418d6b1db2a4/activemodel/lib/active_model/validations/numericality.rb#L37


필자가 작성한 코드를 살펴보자.

## validators

```ruby
#app/validators/date_validator.rb
class DateValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)

    if value.present?
      if (/\A\d{4}[\-\/]{1}\d{2}[\-\/]{1}\d{2}/ =~ value.to_s).nil?
        record.errors[attribute] << (options[:message] || "が正しくありません。")
      end
    end


    date_value = record.public_send("#{attribute}_before_type_cast") # <<이 부분
    if date_value.present?
      begin
        Date.parse(date_value.to_s)
      rescue
        record.errors[attribute] << (options[:message] || "は存在しない日付です。")
      end
    end

  end
end
```


`record.public_send("#{attribute}_before_type_cast")` 이 부분인데
attribute는 validation할 대상 컬럼명이 들어온다 필자의 경우 birth_date를 체크하고 있으므로

`birth_date_before_type_cast`를 public_send로 호출해서 캐스팅 되기 전의 값을 얻는데 성공했다.

아래는 모델과 테스트 쪽 코드

## 모델쪽 

```ruby
 validates :birth_date, date: true
```


## 테스트

```ruby
require 'rails_helper'

RSpec.describe DateValidator, type: :model do
  let(:validator_options) { true }
  let(:model_class) do
    options = validator_options
    Struct.new(:date_column) do
      include ActiveModel::Validations
      def self.name
        "DummyModel"
      end

      def date_column_before_type_cast
        date_column
      end

      validates :date_column, date: options
    end
  end

  describe '#validate' do
    
    subject { model_class.new(date) }

    context 'when date is blank' do
      let(:date) { '' }
      it 'dose not validate (always valid) ' do
        is_expected.to be_valid(:date)
      end
    end

    context 'when valid date_value' do
      context do
        let(:date) { '2020/01/23' }
        it { is_expected.to be_valid(:date) }
      end

      context do
        let(:date) { '2020-01-23' }
        it { is_expected.to be_valid(:date) }
      end

      context do
        let(:date) { Time.zone.today }
        it { is_expected.to be_valid(:date) }
      end
    end

    context 'when invalid date_value' do
      context do
        let(:date) { '2020-15-30' }
        it { is_expected.not_to be_valid(:date) }
      end

      context do
        let(:date) { '2020-01-32' }
        it { is_expected.not_to be_valid(:date) }
      end

      context do
        let(:date) { '2020,01,23' }
        it { is_expected.not_to be_valid(:date) }
      end

      context do
        let(:date) { '202000/01/23' }
        it { is_expected.not_to be_valid(:date) }
      end

      context do
        let(:date) { '2020/012/23' }
        it { is_expected.not_to be_valid(:date) }
      end

      context do
        let(:date) { '2020/01/234' }
        it { is_expected.not_to be_valid(:date) }
      end

      context do
        let(:date) { '2020/04/31' }
        it { is_expected.not_to be_valid(:date) }
      end
    end
  end
end

```

# reference:

https://dora.bk.tsukuba.ac.jp/~takeuchi/?%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%2Frails%2Fvalidates%E3%81%A7before_type_cast
https://qiita.com/msky026/items/7a21203546eb50892c9f