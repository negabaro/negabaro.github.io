require "base64url"

val = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ii0xMTg5OTgxMTQwIiwidHlwIjoiSldUIn0.eyJhdWQiOiJBSjBVNWdBQUFXX1ctYmV6IiwiZXhwIjoxNTk2NDUwMjEzLCJpYXQiOjE1OTQ2MzU4MTMsImlzcyI6Imh0dHBzOi8vb2EuY29ubmVjdC5hdW9uZS5qcC9uZXQvaWQvaG55X29pZGNfcnRfbmV0LyIsInN1YiI6Imh0dHBzOi8vY29ubmVjdC5hdW9uZS5qcC9uZXQvaWQvaG55X3J0X25ldC9jY2EvYS9rZGRpX3FyZDF5d3RtM3UyNDc1am1tZTU4YWhwa2k0MSJ9.L6ZJgk4M3oLnI4HLFWrQWLkDz4vYsbc0EK2Bqdg8rPsI8ZMyxHVqEWcXozpmUIQNh-09E4sBSYb4tJ1ElaGXRwfly-WZfHCdQrlS14pck1kJAx4OIWk5dvPcl_x-Rr6vIwBPS5oFXT405wN0s1iEc7ID2Bc33z3CVOz3XE2F84lEUi1ZEiBrUUZSgFhDRHyXiO_pdpUqzLwwTsghwe5GDVyLjVOaN9-d4-1iBnp0yhHn1zMQpqjf7PdJPmDTxC7Dr_1Nv0moSoh0Kjw_lWolxM0r6MH4lM3GqFG5w9oQAGHfpQAI-jc2-vWRucAY1MdjTAOguZJ1lUPB5iJgrKBFUw"

#plain = Base64URL.decode(val)
                    # -> "Send reinforcements"

enc   = Base64URL.encode('Send reinforcements')
# -> "U2VuZCByZWluZm9yY2VtZW50cw"
plain = Base64URL.decode(enc)
                    # -> "Send reinforcements"

