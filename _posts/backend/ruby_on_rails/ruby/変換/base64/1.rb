require 'base64'

val = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ii0xMTg5OTgxMTQwIiwidHlwIjoiSldUIn0.eyJhdWQiOiJBSjBVNWdBQUFXX1ctYmV6IiwiZXhwIjoxNTk2NDUwMjEzLCJpYXQiOjE1OTQ2MzU4MTMsImlzcyI6Imh0dHBzOi8vb2EuY29ubmVjdC5hdW9uZS5qcC9uZXQvaWQvaG55X29pZGNfcnRfbmV0LyIsInN1YiI6Imh0dHBzOi8vY29ubmVjdC5hdW9uZS5qcC9uZXQvaWQvaG55X3J0X25ldC9jY2EvYS9rZGRpX3FyZDF5d3RtM3UyNDc1am1tZTU4YWhwa2k0MSJ9.L6ZJgk4M3oLnI4HLFWrQWLkDz4vYsbc0EK2Bqdg8rPsI8ZMyxHVqEWcXozpmUIQNh-09E4sBSYb4tJ1ElaGXRwfly-WZfHCdQrlS14pck1kJAx4OIWk5dvPcl_x-Rr6vIwBPS5oFXT405wN0s1iEc7ID2Bc33z3CVOz3XE2F84lEUi1ZEiBrUUZSgFhDRHyXiO_pdpUqzLwwTsghwe5GDVyLjVOaN9-d4-1iBnp0yhHn1zMQpqjf7PdJPmDTxC7Dr_1Nv0moSoh0Kjw_lWolxM0r6MH4lM3GqFG5w9oQAGHfpQAI-jc2-vWRucAY1MdjTAOguZJ1lUPB5iJgrKBFUw"


#Base64.urlsafe_decode64(val)




# File base64.rb, line 97
def urlsafe_decode642(str)
  # NOTE: RFC 4648 does say nothing about unpadded input, but says that
  # "the excess pad characters MAY also be ignored", so it is inferred that
  # unpadded input is also acceptable.
  str = str.tr("-_", "+/")
  if !str.end_with?("=") && str.length % 4 != 0
    str = str.ljust((str.length + 3) & ~3, "=")
  end
  Base64.strict_decode64(str)
end


#pp urlsafe_decode642(val)


#pp Base64.short_urlsafe_decode64(val)

#pp Base64.strict_decode64(val)
# `unpack1': invalid base64 (ArgumentError)

#cipher_token = val.tr('-_','+/').unpack('m')[0]
#pp cipher_token


#Base64.strict_decode64(cipher_token)


def base64_url_decode(str)
  str += '=' * (4 - str.length.modulo(4))
  Base64.decode64(str.tr('-_','+/'))
end

#pp base64_url_decode(val)


#val2 = val.tr('+/', '-_').unpack('m')[0]
#pp val2

val3 = val.tr('-_','+/')
#pp val3
#pp Base64.decode64(val3)


def decode64_url(str)
  # add '=' padding
  str = case str.length % 4
    when 2 then str + '=='
    when 3 then str + '='
    else
      str
  end

  Base64.decode64(str.tr('-_', '+/'))
end



val = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ii0xMTg5OTgxMTQwIiwidHlwIjoiSldUIn0.eyJhdWQiOiJBSjBVNWdBQUFXX1ctYmV6IiwiZXhwIjoxNTk2NDUwMjEzLCJpYXQiOjE1OTQ2MzU4MTMsImlzcyI6Imh0dHBzOi8vb2EuY29ubmVjdC5hdW9uZS5qcC9uZXQvaWQvaG55X29pZGNfcnRfbmV0LyIsInN1YiI6Imh0dHBzOi8vY29ubmVjdC5hdW9uZS5qcC9uZXQvaWQvaG55X3J0X25ldC9jY2EvYS9rZGRpX3FyZDF5d3RtM3UyNDc1am1tZTU4YWhwa2k0MSJ9.L6ZJgk4M3oLnI4HLFWrQWLkDz4vYsbc0EK2Bqdg8rPsI8ZMyxHVqEWcXozpmUIQNh-09E4sBSYb4tJ1ElaGXRwfly-WZfHCdQrlS14pck1kJAx4OIWk5dvPcl_x-Rr6vIwBPS5oFXT405wN0s1iEc7ID2Bc33z3CVOz3XE2F84lEUi1ZEiBrUUZSgFhDRHyXiO_pdpUqzLwwTsghwe5GDVyLjVOaN9-d4-1iBnp0yhHn1zMQpqjf7PdJPmDTxC7Dr_1Nv0moSoh0Kjw_lWolxM0r6MH4lM3GqFG5w9oQAGHfpQAI-jc2-vWRucAY1MdjTAOguZJ1lUPB5iJgrKBFUw"

var2 =  val.split(".")[1]
var3 =  Base64.decode64(var2)
#var2 = "eyJhdWQiOiJBSjBVNWdBQUFXX1ctYmV6IiwiZXhwIjoxNTk2NDUwMjEzLCJpYXQiOjE1OTQ2MzU4MTMsImlzcyI6Imh0dHBzOi8vb2EuY29ubmVjdC5hdW9uZS5qcC9uZXQvaWQvaG55X29pZGNfcnRfbmV0LyIsInN1YiI6Imh0dHBzOi8vY29ubmVjdC5hdW9uZS5qcC9uZXQvaWQvaG55X3J0X25ldC9jY2EvYS9rZGRpX3FyZDF5d3RtM3UyNDc1am1tZTU4YWhwa2k0MSJ9"
#pp Base64.decode64(var2)

#require 'cgi'
#pp CGI.unescape(var3)

require "json"
pp var3.to_json.html_safe
#pp var3.uninspect
#var3.scan(/test.connect.auone.jp\/net\/id\/hny_rt_net\/cca\/a\/(.*)\"}/)[0][0]



