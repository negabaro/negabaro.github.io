hmac_secret = 'my$ecretK3y'

token = JWT.encode payload, hmac_secret, 'HS256'

# eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoidGVzdCJ9.pNIWIL34Jo13LViZAJACzK6Yf0qnvT_BuwOxiMCPE-Y
puts token

decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }

# Array
# [
#   {"data"=>"test"}, # payload
#   {"alg"=>"HS256"} # header
# ]
puts decoded_token

# Without secret key
token = JWT.encode payload, nil, 'HS256'

# eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoidGVzdCJ9.pVzcY2dX8JNM3LzIYeP2B1e1Wcpt1K3TWVvIYSF4x-o
puts token

decoded_token = JWT.decode token, nil, true, { algorithm: 'HS256' }

# Array
# [
#   {"data"=>"test"}, # payload
#   {"alg"=>"HS256"} # header
# ]
puts decoded_token