(2..100).each do |n|

  status = false
  
  (2..9).each do |ns|
    status = false
    if n % ns == 0 # 나누어서 값이 떨어지면 소수가 아님
      status = true if n == ns # 나누어서 값이 떨어졌지만 해당수가 자신인 경우 소수임
      break;
    else # 값이 떨어지지 않았다면 소수
      status = true
    end
  end

  print "#{n}," if status

end
#2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97
