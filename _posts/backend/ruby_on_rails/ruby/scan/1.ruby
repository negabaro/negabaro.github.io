s = '{ ABCDEFG }xcxc'
#=> "{ ABCDEFG }xcxc"
s.scan(/{.*}/)
#=> ["{ ABCDEFG }"]



s2 = '{"alg":"RS256","sub":"https://test.connect.auone.jp/net/id/hny_rt_net/cca/a/kddi_b9gqdxwjbzdyj20150513120152\"}xcxc'