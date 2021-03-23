

문자열 끝에 있는 개행 코드를 제외해줄때 사용 

문자열 끝이 아니면 정상동작 안함

self の末尾から rs で指定する改行コードを取り除いた文字列を生成して返します。ただし、rs が "\n" ($/ のデフォルト値) のときは、実行環境によらず "\r", "\r\n", "\n" のすべてを改行コードとみなして取り除きます。

rs に nil を指定した場合、このメソッドは何もしません。

rs に空文字列 ("") を指定した場合は「パラグラフモード」になり、実行環境によらず末尾の連続する改行コード("\r\n", "\n")をすべて取り除きます。

例

p "foo\n".chomp             # => "foo"
p "foo\n".chomp("\n")       # => "foo"
p "foo\r\n".chomp("\r\n")   # => "foo"

$/ = "\n"   # デフォルト値と同じ
p "foo\r".chomp    # => "foo"
p "foo\r\n".chomp  # => "foo"
p "foo\n".chomp    # => "foo"
p "foo\n\r".chomp  # => "foo\n"

p "string\n".chomp(nil)  # => "string\n"

p "foo\r\n\n".chomp("")  # => "foo"
p "foo\n\r\n".chomp("")  # => "foo"
p "foo\n\r\r".chomp("")  # => "foo\n\r\r"

---

[chomp]: https://docs.ruby-lang.org/ja/latest/method/String/i/chomp.html
[rubyでメタータグが存在すれば削除する方法]: https://teratail.com/questions/159089