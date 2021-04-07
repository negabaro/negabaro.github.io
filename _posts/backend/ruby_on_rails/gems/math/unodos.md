unodos: 数列を推測するgem
リポジトリ: tompng/unodos: Infinite number sequence generator — 数列を推測
つっつきボイス:「ruby-jpで見かけました」「なるほど、フィボナッチ的な数列を渡すと式を推測してくれると」「数学科出身のkazzさんにこのgemの話をしたら、そんなに大変じゃなく作れそうって言ってました」

# 同リポジトリより
require 'unodos'
Unodos[1,2].take(5) # => [1,2,3,4,5]
Unodos[1,2,4].take(5) # => [1,2,4,8,16]
Unodos[1,1,2,3,5].take(8) # => [1,1,2,3,5,8,13,21]
Unodos[1,1,2,4,3,9,4,16,5].take(10) # => [1,1,2,4,3,9,4,16,5,25]