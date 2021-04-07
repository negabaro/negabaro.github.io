## Observer
Observer	状態の変化を通知する
どんなパターンか
あるオブジェクトの状態に関心のあるオブジェクトに、都度通知を送る。

ニュースの発信源（Subject）とニュースの消費者（Observer）間に綺麗なインターフェイスを用意する。

Subject
あるニュースを配信するクラス

Observer
あるニュースを得ることに関心があるクラス

メリット
ニュースの発信者と受信者の間の依存関係を排除する。

問題のあるコード
従業員の給与の変化を経理部門に伝えるシステム

従業員クラス
class Employee
  attr_reader :salary
  attr_accessor :title, :name

  def initialize( name, title, salary, payroll)
    @name = name
    @title = title
    @salary = salary
    @payroll = payroll
  end

  def salary=(new_salary)
    @salary = new_salary
    @payroll.update(self)
  end

end


https://qiita.com/kidach1/items/ce18d2a926c558159689







옵저버패턴도 인터페이스와 관련이

Below is concrete example of the "Observer" pattern, using classes and interfaces to accomplish polymorphic behavior in a logger system:

https://stackoverflow.com/questions/5423125/polymorphism-and-interfaces-in-java-can-polymorphism-be-used-to-implement-inter