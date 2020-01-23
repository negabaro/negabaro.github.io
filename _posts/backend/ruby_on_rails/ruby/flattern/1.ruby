# flatten이라는 영어뜻이 무언가를 납작하게 하다라는 의미를 갖고 있듯
# hash값을 납작하게 해서 배열로 만들어준다.
# 단 2deps이하에 있는 값들까지는 납작하게 못해주고 바로 자식deps까지만 해줌

pp [ [1, 2], [3, 4], [5, 6] ].flatten
# [1, 2, 3, 4, 5, 6]

hoge = { "apple" => 3, "grape" => 2, "peach" => 5 }.flatten
pp hoge # ["apple", 3, "grape", 2, "peach", 5]

# 2계단 이하에 있는 해쉬는 변환안해줌
hoge2 =  { "red" => { "apple" => 3 }, "purple" => { "grape" => 2 } }.flatten
pp hoge2 # ["red", {"apple"=>3}, "purple", {"grape"=>2}]

# https://doruby.jp/users/kodama/entries/flatten