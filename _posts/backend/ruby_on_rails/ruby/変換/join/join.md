

p ['foo', 'bar', 'buz'].join #=> "foobarbuz"
Array#joinには引数でセパレータを指定することができる。例えばCSV風に配列を文字列化するには以下のようにする。

p ['foo', 'bar', 'buz'].join(',') #=> "foo,bar,buz"


### reference:

```
http://rubytips86.hatenablog.com/entry/2014/03/25/141326
```