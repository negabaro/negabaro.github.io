## aasm callback

before_all_events
名前が示すように定義されているすべてのイベントの実行前に呼ばれます。

before
before_all_eventsの後に実行されます。
ここでは、checkイベントに記載します。

after
after_all_eventsの前に実行されます。
ここでは、checkイベントに記載します。

after_all_events
名前が示すように定義されているすべてのイベントの実行後に呼ばれます。
※ここでは、エラー処理に関しては考慮しません。

  

```ruby
class Project < ApplicationRecord
  include AASM

  # 状態の説明
  # 未承認(unapproved)
  # 承認中(pending)
  # 承認済(approved)
  # 却下(rejection)
  aasm :column => 'status' do
    state :unapproved, :initial => true
    state :pending, :approved, :rejection

    before_all_events :log_event_start
    after_all_events :log_event_end
    
    # 未承認＝＞承認中
    event :check do
      before do
        before_anything
      end
      after do
        after_anything
      end
      transitions :from => :unapproved, :to => :pending
    end

    # 承認中＝＞承認済
    event :approve do
      transitions :from => :pending, :to => :approved
    end

    # 承認中＝＞未承認
    event :remand do
      transitions :from => :pending, :to => :unapproved
    end

    # 承認中＝＞却下
    event :reject do
      transitions :from => :pending, :to => :rejection
    end
  end

  def log_event_start
    puts "before_all_events changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end

  def before_anything
    puts "checkのbefore処理"
  end

  def after_anything
    puts "checkのafter処理"
  end

  def log_event_end
    puts "after_all_events changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end
end
```


使用できるコールバックと呼び出される順序は下の通りです。

  event:before
    previous_state:before_exit
      new_state:before_enter
        ...update state...
      previous_state:after_exit
    new_state:after_enter
  event:after

---

[aasmの使い方]: https://chietech.com/2019/02/02/rails-aasm/

