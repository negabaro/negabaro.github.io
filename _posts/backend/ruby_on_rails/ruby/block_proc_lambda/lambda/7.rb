def lambda_method
  #lambda1 = lambda { return p "lambda"}
  lambda1 = lambda { return "lambda" } 
  lambda1.call
  p "lambda method"
end

lambda_method #=> "lambda"
              #=> "lambda method"