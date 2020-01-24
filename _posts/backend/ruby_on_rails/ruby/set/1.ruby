require 'set'
p [30, 10, 20].to_set #<Set: {30, 10, 20}>

#https://qiita.com/namitop/items/238ebc4dfc1a367f87a8

pp Set.new([1,2]).add(3) #=> #<Set: {1, 2, 3}>

pp Set.new([1,2]).add?(3) #=> #<Set: {1, 2, 3}>

pp Set.new([1,2,3]).add(3) #=> #<Set: {1, 2, 3}>  ? 없는 add면 3이 있어도 별말없이 덮어써준다

pp Set.new([1,2,3]).add?(3) #=> nil  ?하면 3이 존재하므로 3을 더하지 않는다



pp Set.new([1,3,5]).merge([2,4,6]) # => #<Set: {1, 3, 5, 2, 4, 6}>
#https://permanent-til-me.ssl-netowl.jp/archives/1500


pp  [30, 10, 20].to_set(SortedSet) ##<SortedSet: {10, 20, 30}>

#그 외에도 교집합,여집합 


