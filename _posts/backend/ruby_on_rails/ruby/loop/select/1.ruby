#偶数なものを返す。
pp [*1..10].select{|n| n % 2 == 0}
#=> [2, 4, 6, 8, 10]

#15で割り切れるものがないので、空の配列が返る。
pp [*1..10].select{|n| n % 15 == 0}
#=> []